import type { IStorage, Student, InsertStudent } from "./storage-interface";

// Supabase MCP-based storage implementation
export class SupabaseStorage implements IStorage {
  async getStudents(): Promise<Student[]> {
    // This will be called from routes.ts using direct SQL execution
    throw new Error("Use direct MCP calls in routes");
  }

  async getStudent(id: number): Promise<Student | undefined> {
    throw new Error("Use direct MCP calls in routes");
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    throw new Error("Use direct MCP calls in routes");
  }
}

export const storage = new SupabaseStorage();
