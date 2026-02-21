import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.students.list.path, async (req, res) => {
    try {
      const allStudents = await storage.getStudents();
      res.status(200).json(allStudents);
    } catch (error) {
      console.error("Failed to list students:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.students.get.path, async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      if (isNaN(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
      }
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      console.error("Failed to get student:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.students.create.path, async (req, res) => {
    try {
      const input = api.students.create.input.parse(req.body);
      const student = await storage.createStudent(input);
      res.status(201).json(student);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Failed to create student:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed database if empty
  try {
    const existingStudents = await storage.getStudents();
    if (existingStudents.length === 0) {
      await storage.createStudent({ name: "Alice Johnson", fatherName: "John Johnson", motherName: "Mary Johnson", brotherName: "Jack Johnson", email: "alice@example.com", grade: "10th Grade" });
      await storage.createStudent({ name: "Bob Smith", fatherName: "Robert Smith", motherName: "Linda Smith", brotherName: "Billy Smith", email: "bob@example.com", grade: "9th Grade" });
      await storage.createStudent({ name: "Charlie Davis", fatherName: "Charles Davis", motherName: "Susan Davis", brotherName: "Chris Davis", email: "charlie@example.com", grade: "11th Grade" });
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  return httpServer;
}
