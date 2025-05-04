import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertMedicalProfileSchema, 
  insertContactMessageSchema, 
  loginSchema 
} from "../shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "lifechip-secret",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Set up passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport local strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (user.password !== password) {
            // In a real app, use bcrypt to compare passwords
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Auth middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Register routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if passwords match
      if (validatedData.password !== validatedData.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Create user (omit confirmPassword)
      const { confirmPassword, ...userData } = validatedData;
      const newUser = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userResponse } = newUser;
      
      res.status(201).json(userResponse);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Login route
  app.post("/api/auth/login", (req, res, next) => {
    try {
      // Validate input
      loginSchema.parse(req.body);
      
      passport.authenticate("local", (err: Error, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          
          // Remove password from response
          const { password, ...userResponse } = user;
          return res.status(200).json(userResponse);
        });
      })(req, res, next);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Logout route
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error during logout" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error destroying session" });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });

  // Get current user
  app.get("/api/auth/me", isAuthenticated, (req, res) => {
    const { password, ...user } = req.user as any;
    res.status(200).json(user);
  });

  // Medical profile routes
  app.post("/api/medical-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const validatedData = insertMedicalProfileSchema.parse({ ...req.body, userId });
      
      // Check if user already has a profile
      const existingProfile = await storage.getMedicalProfileByUserId(userId);
      if (existingProfile) {
        return res.status(400).json({ message: "User already has a medical profile" });
      }
      
      // Check if chip ID is already registered
      const existingChipProfile = await storage.getMedicalProfileByChipId(validatedData.chipId);
      if (existingChipProfile) {
        return res.status(400).json({ message: "Chip ID is already registered" });
      }
      
      const newProfile = await storage.createMedicalProfile(validatedData);
      res.status(201).json(newProfile);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get user's medical profile
  app.get("/api/medical-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const profile = await storage.getMedicalProfileByUserId(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
      
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Update medical profile
  app.put("/api/medical-profile/:id", isAuthenticated, async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      // Check if profile exists and belongs to the user
      const existingProfile = await storage.getMedicalProfile(profileId);
      if (!existingProfile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
      
      if (existingProfile.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this profile" });
      }
      
      // Update profile
      const updatedProfile = await storage.updateMedicalProfile(profileId, req.body);
      res.status(200).json(updatedProfile);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Public endpoint to get medical profile by chip ID (for emergency responders)
  app.get("/api/emergency/:chipId", async (req, res) => {
    try {
      const { chipId } = req.params;
      const profile = await storage.getMedicalProfileByChipId(chipId);
      
      if (!profile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
      
      // Return only the necessary medical information, not user details
      const emergencyInfo = {
        bloodType: profile.bloodType,
        allergies: profile.allergies,
        medications: profile.medications,
        conditions: profile.conditions,
        emergencyContacts: profile.emergencyContacts,
        notes: profile.notes
      };
      
      res.status(200).json(emergencyInfo);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
