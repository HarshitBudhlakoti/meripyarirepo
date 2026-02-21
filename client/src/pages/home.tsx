import { useState } from "react";
import { useStudents } from "@/hooks/use-students";
import { StudentForm } from "@/components/student-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Search, GraduationCap, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: students, isLoading, error } = useStudents();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredStudents = students?.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
              Student Directory
            </h1>
            <p className="text-slate-500 text-lg">
              Manage your class roster and student details efficiently.
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 rounded-full px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student's details below to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <StudentForm onSuccess={() => setIsOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats / Quick View Cards (Optional enhancement for visual richness) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {isLoading ? "-" : students?.length}
              </h3>
            </div>
          </div>
          {/* Add more stats if real data available */}
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, email, or grade..."
            className="pl-10 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading students...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">
              <p>Failed to load students. Please try again later.</p>
            </div>
          ) : filteredStudents?.length === 0 ? (
            <div className="p-24 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No students found</h3>
              <p className="text-slate-500">
                {search ? "Try adjusting your search query." : "Get started by adding your first student."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Student Name</th>
                    <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Father's Name</th>
                    <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Grade</th>
                    <th className="py-5 px-6 font-semibold text-sm text-slate-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {filteredStudents?.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50/80 transition-colors duration-150 group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm mr-3">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-slate-600">{student.fatherName}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-slate-600">
                            <Mail className="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary transition-colors" />
                            {student.email}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {student.grade}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-sm">
                          {student.createdAt && format(new Date(student.createdAt), 'MMM d, yyyy')}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
