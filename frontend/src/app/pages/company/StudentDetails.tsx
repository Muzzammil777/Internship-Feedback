import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import SkillTag from "../../components/shared/SkillTag";
import StudentAvatar from "../../components/shared/StudentAvatar";
import {
  User,
  Building2,
  Briefcase,
  Code,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  Search,
  Users,
  Calendar,
  MapPin,
  Plus,
  X,
  Mail,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  supervisor: string;
  supervisorEmail: string;
  startDate: string;
  endDate: string;
  duration: string;
  tasks: Task[];
  skills: string[];
  status: "active" | "completed" | "pending";
}

export default function CompanyStudentDetails() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    university: "",
  });

  const students: Student[] = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      university: "State University",
      department: "Engineering - Frontend",
      supervisor: "Sarah Mitchell",
      supervisorEmail: "sarah.mitchell@techcorp.com",
      startDate: "January 15, 2026",
      endDate: "March 30, 2026",
      duration: "12 weeks",
      tasks: [
        {
          id: "1",
          title: "E-Commerce Platform Redesign",
          description: "Led the frontend development for a complete redesign of the company's e-commerce platform. Implemented modern React patterns, optimized performance, and created a responsive, accessible interface.",
        },
        {
          id: "2",
          title: "Performance Optimization",
          description: "Optimized application performance, reducing load times by 40% through code splitting, lazy loading, and efficient state management.",
        },
        {
          id: "3",
          title: "Component Library Development",
          description: "Built a reusable component library with comprehensive documentation, improving development efficiency across teams.",
        },
      ],
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      status: "completed",
    },
    {
      id: "2",
      name: "Emma Chen",
      email: "emma.chen@email.com",
      phone: "+1 (555) 234-5678",
      university: "Tech Institute",
      department: "Engineering - Backend",
      supervisor: "Michael Brown",
      supervisorEmail: "michael.brown@techcorp.com",
      startDate: "February 1, 2026",
      endDate: "April 15, 2026",
      duration: "10 weeks",
      tasks: [
        {
          id: "1",
          title: "API Gateway Migration",
          description: "Spearheaded the migration of legacy APIs to a modern microservices architecture. Designed and implemented RESTful services using Node.js and Express.",
        },
        {
          id: "2",
          title: "Redis Caching Implementation",
          description: "Integrated Redis caching layer to improve API response times and reduce database load.",
        },
      ],
      skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
      status: "active",
    },
    {
      id: "3",
      name: "Marcus Williams",
      email: "marcus.williams@email.com",
      phone: "+1 (555) 345-6789",
      university: "Engineering College",
      department: "Data Science",
      supervisor: "Lisa Anderson",
      supervisorEmail: "lisa.anderson@techcorp.com",
      startDate: "January 20, 2026",
      endDate: "April 5, 2026",
      duration: "11 weeks",
      tasks: [
        {
          id: "1",
          title: "Customer Analytics Dashboard",
          description: "Built an interactive analytics dashboard for customer behavior analysis using Python and React. Created real-time visualization components.",
        },
        {
          id: "2",
          title: "ML Model Development",
          description: "Implemented machine learning models for customer segmentation and churn prediction using scikit-learn.",
        },
      ],
      skills: ["Python", "Pandas", "Scikit-learn", "React", "D3.js"],
      status: "completed",
    },
    {
      id: "4",
      name: "Sophia Martinez",
      email: "sophia.martinez@email.com",
      phone: "+1 (555) 456-7890",
      university: "Design University",
      department: "Product Design",
      supervisor: "David Kim",
      supervisorEmail: "david.kim@techcorp.com",
      startDate: "February 10, 2026",
      endDate: "May 1, 2026",
      duration: "12 weeks",
      tasks: [
        {
          id: "1",
          title: "Mobile App Redesign",
          description: "Led the complete redesign of the company's mobile application, focusing on improving user experience and accessibility. Conducted user research and created wireframes.",
        },
        {
          id: "2",
          title: "Design System Creation",
          description: "Developed comprehensive design system and component library to ensure consistency across all product touchpoints.",
        },
      ],
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "UI/UX"],
      status: "active",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    active: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically make an API call to create the student
    console.log("Creating student:", newStudentForm);

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form and close modal after showing success
    setTimeout(() => {
      setIsAddModalOpen(false);
      setShowSuccess(false);
      setNewStudentForm({
        name: "",
        email: "",
        password: "",
        department: "",
        university: "",
      });
    }, 1500);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setShowSuccess(false);
    setNewStudentForm({
      name: "",
      email: "",
      password: "",
      department: "",
      university: "",
    });
  };

  const InfoSection = ({
    title,
    subtitle,
    icon: Icon,
    iconColor,
    children,
  }: {
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    iconColor: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-3 ${iconColor} rounded-xl shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  // Student List View
  if (!selectedStudent) {
    return (
      <div className="min-h-full bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Student Directory</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                    Student Directory
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Select a student to view details and provide feedback
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {students.length}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Total Interns
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 shadow-lg"
                    size="lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Student
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, department, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base shadow-md"
              />
            </div>
          </motion.div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredStudents.map((student, index) => {
                // Generate initials for avatar
                const initials = student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                // Assign different gradient colors based on index
                const avatarGradients = [
                  "from-indigo-500 to-purple-600",
                  "from-teal-500 to-cyan-600",
                  "from-pink-500 to-rose-600",
                  "from-amber-500 to-orange-600",
                ];
                const gradient = avatarGradients[index % avatarGradients.length];

                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => setSelectedStudent(student)}
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-5">
                      {/* LEFT - Profile Avatar */}
                      <div className="flex-shrink-0">
                        <StudentAvatar
                          name={student.name}
                          size="lg"
                          gradient={gradient}
                          withRing={true}
                        />
                      </div>

                      {/* RIGHT - Student Information */}
                      <div className="flex-1 min-w-0">
                        {/* Top Row - Name & Status */}
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground truncate">
                            {student.name}
                          </h3>
                          <span
                            className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-bold border ${
                              statusColors[student.status]
                            }`}
                          >
                            {student.status.charAt(0).toUpperCase() +
                              student.status.slice(1)}
                          </span>
                        </div>

                        {/* Department & University */}
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-foreground mb-1">
                            {student.department}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.university}
                          </p>
                        </div>

                        {/* Duration Info */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Duration: </span>
                            <span className="font-semibold text-foreground">
                              {student.duration}
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                              {student.startDate} - {student.endDate}
                            </span>
                          </div>

                          {/* View Details Action */}
                          <div className="flex items-center gap-1 text-primary flex-shrink-0">
                            <span className="text-sm font-bold group-hover:underline">
                              View Details
                            </span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredStudents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No students found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </motion.div>
          )}
        </div>

        {/* Add Student Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 px-6 py-5 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-md flex-shrink-0">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            Add New Student
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Create student login credentials
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="p-1.5 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
                        type="button"
                      >
                        <X className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
                    <form onSubmit={handleAddStudent} className="p-6 space-y-5">
                    {/* Success Message */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-emerald-900">
                              Student Created Successfully!
                            </h3>
                            <p className="text-sm text-emerald-700">
                              Login credentials have been generated.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Student Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Student Name
                        <span className="text-destructive">*</span>
                      </Label>
                        <Input
                          required
                          value={newStudentForm.name}
                          onChange={(e) =>
                            setNewStudentForm({ ...newStudentForm, name: e.target.value })
                          }
                          placeholder="e.g., Alex Johnson"
                          className="text-base"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Email Address
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          required
                          type="email"
                          value={newStudentForm.email}
                          onChange={(e) =>
                            setNewStudentForm({ ...newStudentForm, email: e.target.value })
                          }
                          placeholder="student@example.com"
                          className="text-base"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Password
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          required
                          type="password"
                          value={newStudentForm.password}
                          onChange={(e) =>
                            setNewStudentForm({ ...newStudentForm, password: e.target.value })
                          }
                          placeholder="Enter a secure password"
                          className="text-base"
                          disabled={isSubmitting}
                          minLength={6}
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 6 characters
                        </p>
                      </div>

                      {/* Department */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Department
                          <span className="text-xs text-muted-foreground font-normal ml-1">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          value={newStudentForm.department}
                          onChange={(e) =>
                            setNewStudentForm({
                              ...newStudentForm,
                              department: e.target.value,
                            })
                          }
                          placeholder="e.g., Engineering - Frontend"
                          className="text-base"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* University */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          University
                          <span className="text-xs text-muted-foreground font-normal ml-1">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          value={newStudentForm.university}
                          onChange={(e) =>
                            setNewStudentForm({
                              ...newStudentForm,
                              university: e.target.value,
                            })
                          }
                          placeholder="e.g., State University"
                          className="text-base"
                          disabled={isSubmitting}
                        />
                      </div>
                    </form>
                  </div>

                  {/* Modal Footer */}
                  <div className="px-6 py-4 bg-secondary/20 border-t border-border">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeModal}
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleAddStudent}
                        className="flex-1 flex items-center justify-center gap-2"
                        disabled={
                          isSubmitting ||
                          !newStudentForm.name ||
                          !newStudentForm.email ||
                          !newStudentForm.password
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Create Student
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Student Detail View
  const studentIndex = students.findIndex((s) => s.id === selectedStudent.id);
  const avatarGradients = [
    "from-indigo-500 to-purple-600",
    "from-teal-500 to-cyan-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
  ];
  const gradient = avatarGradients[studentIndex % avatarGradients.length];

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              variant="ghost"
              onClick={() => setSelectedStudent(null)}
              className="mb-6 -ml-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Student List
            </Button>

            {/* Profile Header Section */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* LEFT - Large Student Photo */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl flex items-center justify-center ring-4 ring-white`}>
                      <span className="text-5xl font-bold text-white">
                        {selectedStudent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    {/* Status badge on photo */}
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-white shadow-lg ${statusColors[selectedStudent.status]}`}>
                      {selectedStudent.status.charAt(0).toUpperCase() +
                        selectedStudent.status.slice(1)}
                    </div>
                  </div>
                </div>

                {/* RIGHT - Student Information */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
                    {selectedStudent.name}
                  </h1>

                  {/* Department */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedStudent.department}
                    </span>
                  </div>

                  {/* University */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-base text-muted-foreground font-medium">
                      {selectedStudent.university}
                    </span>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                          Duration
                        </div>
                        <div className="text-base font-bold text-foreground">
                          {selectedStudent.duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-purple-100 rounded-lg">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                          Tasks
                        </div>
                        <div className="text-base font-bold text-foreground">
                          {selectedStudent.tasks.length}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-100 rounded-lg">
                        <Code className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                          Skills
                        </div>
                        <div className="text-base font-bold text-foreground">
                          {selectedStudent.skills.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <div className="space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <InfoSection
              title="Personal Information"
              subtitle="Student contact details"
              icon={User}
              iconColor="bg-gradient-to-br from-primary to-purple-600 shadow-primary/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Full Name
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Email Address
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Phone Number
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    University
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.university}
                  </div>
                </div>
              </div>
            </InfoSection>
          </motion.div>

          {/* Internship Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <InfoSection
              title="Internship Details"
              subtitle="Work period and supervision"
              icon={Building2}
              iconColor="bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Department
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.department}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Supervisor
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.supervisor}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Supervisor Email
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.supervisorEmail}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Duration
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.duration}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Internship Period
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.startDate} - {selectedStudent.endDate}
                  </div>
                </div>
              </div>
            </InfoSection>
          </motion.div>

          {/* Tasks & Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <InfoSection
              title="Tasks & Responsibilities"
              subtitle="Projects and tasks completed during internship"
              icon={Briefcase}
              iconColor="bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/50"
            >
              <div className="space-y-4">
                {selectedStudent.tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    {/* Task Number Badge */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-base font-bold">{index + 1}</span>
                    </div>

                    <div className="pl-4">
                      {/* Task Title */}
                      <div className="mb-3">
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 block">
                          Task Title
                        </span>
                        <h3 className="text-xl font-bold text-foreground">
                          {task.title}
                        </h3>
                      </div>

                      {/* Task Description */}
                      <div>
                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 block">
                          Description
                        </span>
                        <p className="text-base text-foreground leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </InfoSection>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <InfoSection
              title="Skills Developed"
              subtitle="Technical competencies acquired"
              icon={Code}
              iconColor="bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/50"
            >
              <div className="flex flex-wrap gap-4">
                {selectedStudent.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <SkillTag skill={skill} variant="primary" />
                  </motion.div>
                ))}
              </div>
            </InfoSection>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
