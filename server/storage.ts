import { User, InsertUser, MedicalProfile, InsertMedicalProfile, ContactMessage, InsertContactMessage, EmergencyContact } from "../shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Medical profile methods
  getMedicalProfile(id: number): Promise<MedicalProfile | undefined>;
  getMedicalProfileByUserId(userId: number): Promise<MedicalProfile | undefined>;
  getMedicalProfileByChipId(chipId: string): Promise<MedicalProfile | undefined>;
  createMedicalProfile(profile: InsertMedicalProfile): Promise<MedicalProfile>;
  updateMedicalProfile(id: number, profile: Partial<InsertMedicalProfile>): Promise<MedicalProfile | undefined>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private medicalProfiles: Map<number, MedicalProfile>;
  private contactMessages: Map<number, ContactMessage>;
  private userIdCounter: number;
  private medicalProfileIdCounter: number;
  private contactMessageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.medicalProfiles = new Map();
    this.contactMessages = new Map();
    this.userIdCounter = 1;
    this.medicalProfileIdCounter = 1;
    this.contactMessageIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Medical profile methods
  async getMedicalProfile(id: number): Promise<MedicalProfile | undefined> {
    return this.medicalProfiles.get(id);
  }

  async getMedicalProfileByUserId(userId: number): Promise<MedicalProfile | undefined> {
    return Array.from(this.medicalProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async getMedicalProfileByChipId(chipId: string): Promise<MedicalProfile | undefined> {
    return Array.from(this.medicalProfiles.values()).find(
      (profile) => profile.chipId === chipId,
    );
  }

  async createMedicalProfile(profile: InsertMedicalProfile): Promise<MedicalProfile> {
    const id = this.medicalProfileIdCounter++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const medicalProfile: MedicalProfile = { ...profile, id, createdAt, updatedAt };
    this.medicalProfiles.set(id, medicalProfile);
    return medicalProfile;
  }

  async updateMedicalProfile(id: number, profile: Partial<InsertMedicalProfile>): Promise<MedicalProfile | undefined> {
    const existingProfile = await this.getMedicalProfile(id);
    if (!existingProfile) {
      return undefined;
    }
    
    const updatedProfile: MedicalProfile = {
      ...existingProfile,
      ...profile,
      updatedAt: new Date(),
    };
    
    this.medicalProfiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
