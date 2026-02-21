/*
  # Create students table

  1. New Tables
    - `students`
      - `id` (serial, primary key) - Auto-incrementing unique identifier
      - `name` (text, not null) - Student's full name
      - `father_name` (text, not null) - Father's full name
      - `email` (text, not null) - Student's email address
      - `grade` (text, not null) - Student's current grade/class
      - `created_at` (timestamp) - Record creation timestamp with default now()

  2. Security
    - Enable RLS on `students` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  email TEXT NOT NULL,
  grade TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON students
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON students
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON students
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON students
  FOR DELETE
  TO public
  USING (true);