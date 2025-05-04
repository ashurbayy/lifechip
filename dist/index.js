// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  medicalProfiles;
  contactMessages;
  userIdCounter;
  medicalProfileIdCounter;
  contactMessageIdCounter;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.medicalProfiles = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.userIdCounter = 1;
    this.medicalProfileIdCounter = 1;
    this.contactMessageIdCounter = 1;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const user = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  // Medical profile methods
  async getMedicalProfile(id) {
    return this.medicalProfiles.get(id);
  }
  async getMedicalProfileByUserId(userId) {
    return Array.from(this.medicalProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }
  async getMedicalProfileByChipId(chipId) {
    return Array.from(this.medicalProfiles.values()).find(
      (profile) => profile.chipId === chipId
    );
  }
  async createMedicalProfile(profile) {
    const id = this.medicalProfileIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const updatedAt = /* @__PURE__ */ new Date();
    const medicalProfile = { ...profile, id, createdAt, updatedAt };
    this.medicalProfiles.set(id, medicalProfile);
    return medicalProfile;
  }
  async updateMedicalProfile(id, profile) {
    const existingProfile = await this.getMedicalProfile(id);
    if (!existingProfile) {
      return void 0;
    }
    const updatedProfile = {
      ...existingProfile,
      ...profile,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.medicalProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  // Contact message methods
  async createContactMessage(message) {
    const id = this.contactMessageIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const contactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  async getContactMessages() {
    return Array.from(this.contactMessages.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var medicalProfiles = pgTable("medical_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  chipId: text("chip_id").notNull().unique(),
  bloodType: text("blood_type"),
  allergies: text("allergies").array(),
  medications: text("medications").array(),
  conditions: text("conditions").array(),
  emergencyContacts: json("emergency_contacts"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true
}).extend({
  confirmPassword: z.string()
});
var insertMedicalProfileSchema = createInsertSchema(medicalProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});
var loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// server/routes.ts
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
async function registerRoutes(app2) {
  const SessionStore = MemoryStore(session);
  app2.use(
    session({
      secret: process.env.SESSION_SECRET || "lifechip-secret",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 864e5
        // prune expired entries every 24h
      })
    })
  );
  app2.use(passport.initialize());
  app2.use(passport.session());
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
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      if (validatedData.password !== validatedData.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const { confirmPassword, ...userData } = validatedData;
      const newUser = await storage.createUser(userData);
      const { password, ...userResponse } = newUser;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.post("/api/auth/login", (req, res, next) => {
    try {
      loginSchema.parse(req.body);
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.login(user, (err2) => {
          if (err2) {
            return next(err2);
          }
          const { password, ...userResponse } = user;
          return res.status(200).json(userResponse);
        });
      })(req, res, next);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error during logout" });
      }
      req.session.destroy((err2) => {
        if (err2) {
          return res.status(500).json({ message: "Error destroying session" });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });
  app2.get("/api/auth/me", isAuthenticated, (req, res) => {
    const { password, ...user } = req.user;
    res.status(200).json(user);
  });
  app2.post("/api/medical-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const validatedData = insertMedicalProfileSchema.parse({ ...req.body, userId });
      const existingProfile = await storage.getMedicalProfileByUserId(userId);
      if (existingProfile) {
        return res.status(400).json({ message: "User already has a medical profile" });
      }
      const existingChipProfile = await storage.getMedicalProfileByChipId(validatedData.chipId);
      if (existingChipProfile) {
        return res.status(400).json({ message: "Chip ID is already registered" });
      }
      const newProfile = await storage.createMedicalProfile(validatedData);
      res.status(201).json(newProfile);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.get("/api/medical-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await storage.getMedicalProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.put("/api/medical-profile/:id", isAuthenticated, async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const userId = req.user.id;
      const existingProfile = await storage.getMedicalProfile(profileId);
      if (!existingProfile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
      if (existingProfile.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this profile" });
      }
      const updatedProfile = await storage.updateMedicalProfile(profileId, req.body);
      res.status(200).json(updatedProfile);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  app2.get("/api/emergency/:chipId", async (req, res) => {
    try {
      const { chipId } = req.params;
      const profile = await storage.getMedicalProfileByChipId(chipId);
      if (!profile) {
        return res.status(404).json({ message: "Medical profile not found" });
      }
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
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
