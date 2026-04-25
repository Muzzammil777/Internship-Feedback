import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import SkillTag from "../../components/shared/SkillTag";
import LoadingAnimation, { LoadingSpinner } from "../../components/shared/LoadingAnimation";
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
  Plus,
  X,
  CheckCircle2,
  Trash2,
  Pencil,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { apiFetch } from "../../lib/api";

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
  profilePhoto?: string;
  COLLEGE: string;
  COLLEGE_DEPARTMENT?: string;
  Role: string;
  supervisor: string;
  supervisorEmail: string;
  hr?: string;
  manager?: string;
  offer_letter?: string;
  nda?: string;
  payment?: string;
  pmo?: string;
  startDate: string;
  endDate: string;
  duration: string;
  tasks: Task[];
  skills: string[];
  status: "active" | "completed" | "pending";
}

interface CompanyFeedbackRecord {
  studentId: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export default function CompanyStudentDetails() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isDeletingStudent, setIsDeletingStudent] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [editTargetEmail, setEditTargetEmail] = useState("");
  const [editSkillInput, setEditSkillInput] = useState("");
  const [editSkills, setEditSkills] = useState<string[]>([]);
  const [editTasks, setEditTasks] = useState<Task[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false);
  const [customPassword, setCustomPassword] = useState("");
  const [showCustomPassword, setShowCustomPassword] = useState(false);
  const [showNewStudentPassword, setShowNewStudentPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    COLLEGE: "",
    COLLEGE_DEPARTMENT: "",
    Role: "",
    supervisor: "",
    supervisorEmail: "",
    hr: "",
    manager: "",
    offer_letter: "",
    nda: "",
    payment: "",
    pmo: "",
    startDate: "",
    endDate: "",
  });

  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    Role: "",
    COLLEGE: "",
  });

  // Load students from API on mount
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoadingStudents(true);
      try {
        const [studentsResponse, feedbackResponse] = await Promise.all([
          apiFetch(`${API_BASE}/students`),
          apiFetch(`${API_BASE}/feedback/company`),
        ]);

        if (!studentsResponse.ok) {
          return;
        }

        const data = (await studentsResponse.json()) as Student[];
        if (!feedbackResponse.ok) {
          setStudents(data);
          return;
        }

        const feedbackRecords = (await feedbackResponse.json()) as CompanyFeedbackRecord[];
        const completedStudentIds = new Set(feedbackRecords.map((record) => record.studentId));

        const normalizedStudents = data.map((student) => ({
          ...student,
          status: (completedStudentIds.has(student.id)
            ? "completed"
            : student.status === "active"
              ? "active"
              : "pending") as Student["status"],
        }));

        setStudents(normalizedStudents);
      } catch {
        // silently fall back to empty list
      } finally {
        setIsLoadingStudents(false);
      }
    };
    void fetchStudents();
  }, []);



  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.Role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.COLLEGE.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.COLLEGE_DEPARTMENT || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    active: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await apiFetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudentForm.name,
          email: newStudentForm.email,
          password: newStudentForm.password,
          role_title: newStudentForm.Role,
          college: newStudentForm.COLLEGE,
        }),
      });

      if (!res.ok) {
        const err = await res.json() as { detail?: string };
        throw new Error(err.detail ?? "Failed to create student");
      }

      const created = await res.json() as Student;
      // Add to local list immediately without needing a full refetch
      setStudents((prev) => [...prev, created]);
      setShowSuccess(true);

      setTimeout(() => {
        setIsAddModalOpen(false);
        setShowSuccess(false);
        setNewStudentForm({ name: "", email: "", password: "", Role: "", COLLEGE: "" });
      }, 1500);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setShowSuccess(false);
    setShowNewStudentPassword(false);
    setNewStudentForm({
      name: "",
      email: "",
      password: "",
      Role: "",
      COLLEGE: "",
    });
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent || isDeletingStudent) {
      return;
    }

    const confirmed = window.confirm(
      `Remove ${selectedStudent.name}? This action cannot be undone.`
    );
    if (!confirmed) {
      return;
    }

    setIsDeletingStudent(true);
    setApiError("");

    try {
      const response = await apiFetch(
        `${API_BASE}/students/${encodeURIComponent(selectedStudent.id)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorPayload = (await response.json()) as { detail?: string };
        throw new Error(errorPayload.detail ?? "Failed to remove student");
      }

      const deletedId = selectedStudent.id;
      setStudents((prev) => prev.filter((student) => student.id !== deletedId));
      setSelectedStudent(null);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unable to remove student right now.");
    } finally {
      setIsDeletingStudent(false);
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";
    const weeks = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return `${weeks} weeks`;
  };

  const openEditModal = (student: Student) => {
    setEditTargetEmail(student.email);
    setEditForm({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      COLLEGE: student.COLLEGE || "",
      COLLEGE_DEPARTMENT: student.COLLEGE_DEPARTMENT || "",
      Role: student.Role || "",
      supervisor: student.supervisor || "",
      supervisorEmail: student.supervisorEmail || "",
      hr: student.hr || "",
      manager: student.manager || "",
      offer_letter: student.offer_letter || "",
      nda: student.nda || "",
      payment: student.payment || "",
      pmo: student.pmo || "",
      startDate: student.startDate || "",
      endDate: student.endDate || "",
    });
    setEditSkills(student.skills || []);
    setEditTasks(student.tasks || []);
    setEditSkillInput("");
    setEditError("");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditError("");
  };

  const openPasswordModal = () => {
    setPasswordNotice("");
    setCustomPassword("");
    setShowCustomPassword(false);
    setShowGeneratedPassword(false);
    setGeneratedPassword(null);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || isResettingPassword) {
      return;
    }

    setIsResettingPassword(true);
    setPasswordNotice("");

    try {
      const response = await apiFetch(
        `${API_BASE}/students/${encodeURIComponent(selectedStudent.id)}/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: customPassword.trim() || undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorPayload = (await response.json()) as { detail?: string };
        throw new Error(errorPayload.detail ?? "Failed to reset password");
      }

      const data = (await response.json()) as { temporaryPassword?: string };
      setGeneratedPassword(data.temporaryPassword ?? null);
      setShowGeneratedPassword(true);
      setPasswordNotice("Password reset successfully. Share the new password with the student securely.");
    } catch (error) {
      setPasswordNotice(error instanceof Error ? error.message : "Unable to reset password right now.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  const addEditSkill = () => {
    const normalized = editSkillInput.trim();
    if (!normalized || editSkills.includes(normalized)) return;
    setEditSkills((prev) => [...prev, normalized]);
    setEditSkillInput("");
  };

  const removeEditSkill = (skill: string) => {
    setEditSkills((prev) => prev.filter((item) => item !== skill));
  };

  const addEditTask = () => {
    setEditTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", description: "" },
    ]);
  };

  const updateEditTask = (id: string, field: keyof Task, value: string) => {
    setEditTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const removeEditTask = (id: string) => {
    setEditTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editTargetEmail || isSavingEdit) {
      return;
    }

    setIsSavingEdit(true);
    setEditError("");

    try {
      const response = await apiFetch(
        `${API_BASE}/students/profile/${encodeURIComponent(editTargetEmail)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editForm.name,
            email: editForm.email,
            phone: editForm.phone,
            profilePhoto: selectedStudent?.profilePhoto || "",
            role_title: editForm.Role,
            college: editForm.COLLEGE,
            college_department: editForm.COLLEGE_DEPARTMENT,
            startDate: editForm.startDate,
            endDate: editForm.endDate,
            duration: calculateDuration(editForm.startDate, editForm.endDate),
            supervisor: editForm.supervisor,
            supervisorEmail: editForm.supervisorEmail,
            hr: editForm.hr,
            manager: editForm.manager,
            offer_letter: editForm.offer_letter,
            nda: editForm.nda,
            payment: editForm.payment,
            pmo: editForm.pmo,
            skills: editSkills,
            tasks: editTasks,
          }),
        }
      );

      if (!response.ok) {
        const errorPayload = (await response.json()) as { detail?: string };
        throw new Error(errorPayload.detail ?? "Failed to update student profile");
      }

      const updatedStudent = (await response.json()) as Student;
      setStudents((prev) =>
        prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
      setSelectedStudent(updatedStudent);
      setIsEditModalOpen(false);
    } catch (error) {
      setEditError(error instanceof Error ? error.message : "Unable to update student profile.");
    } finally {
      setIsSavingEdit(false);
    }
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
          <div className="w-full px-4 sm:px-8 py-6 sm:py-10">
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
        <div className="w-full px-4 sm:px-8 py-6 sm:py-8">
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
                placeholder="Search by Name, Role, or College..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base shadow-md"
              />
            </div>
          </motion.div>

          {isLoadingStudents ? (
            <LoadingAnimation
              compact
              title="Loading students"
              description="Fetching the student directory..."
              className="rounded-2xl border border-border bg-card shadow-sm"
            />
          ) : (
            <>
              {/* Student Cards Grid */}
              <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredStudents.map((student, index) => {
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
                        whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
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
                              photoUrl={student.profilePhoto}
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

                            {/* Role & COLLEGE */}
                            <div className="mb-3">
                              <p className="text-sm font-semibold text-foreground mb-1">
                                {student.Role}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {student.COLLEGE}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Department: {student.COLLEGE_DEPARTMENT || "N/A"}
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
            </>
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
                              Login credentials have been saved to the database.
                            </p>
                          </div>
                        </motion.div>
                      )}
                      {apiError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                        >
                          <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-red-900">Failed to create student</h3>
                            <p className="text-sm text-red-700">{apiError}</p>
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
                        <div className="relative">
                          <Input
                            required
                            type={showNewStudentPassword ? "text" : "password"}
                            value={newStudentForm.password}
                            onChange={(e) =>
                              setNewStudentForm({ ...newStudentForm, password: e.target.value })
                            }
                            placeholder="Enter a secure password"
                            className="text-base pr-10"
                            disabled={isSubmitting}
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewStudentPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showNewStudentPassword ? "Hide password" : "Show password"}
                          >
                            {showNewStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Minimum 6 characters
                        </p>
                      </div>

                      {/* Role */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Role
                          <span className="text-xs text-muted-foreground font-normal ml-1">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          value={newStudentForm.Role}
                          onChange={(e) =>
                            setNewStudentForm({
                              ...newStudentForm,
                              Role: e.target.value,
                            })
                          }
                          placeholder="e.g., Engineering - Frontend"
                          className="text-base"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* COLLEGE */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          COLLEGE
                          <span className="text-xs text-muted-foreground font-normal ml-1">
                            (Optional)
                          </span>
                        </Label>
                        <Input
                          value={newStudentForm.COLLEGE}
                          onChange={(e) =>
                            setNewStudentForm({
                              ...newStudentForm,
                              COLLEGE: e.target.value,
                            })
                          }
                          placeholder="e.g., College name"
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
                            <LoadingSpinner className="w-4 h-4" />
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
            <div className="mb-6 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setSelectedStudent(null)}
                className="-ml-2 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Student List
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  onClick={handleDeleteStudent}
                  disabled={isDeletingStudent}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeletingStudent ? "Removing..." : "Remove Student"}
                </Button>
              </div>
            </div>

            <div className="mb-4 flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={openPasswordModal}
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => selectedStudent && openEditModal(selectedStudent)}
                className="flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {apiError && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                {apiError}
              </div>
            )}

            {/* Profile Header Section */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* LEFT - Large Student Photo */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
                    {selectedStudent.profilePhoto ? (
                      <img
                        src={selectedStudent.profilePhoto}
                        alt={`${selectedStudent.name} profile`}
                        className="w-32 h-32 rounded-2xl object-cover shadow-2xl ring-4 ring-white"
                      />
                    ) : (
                      <div className={`w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} shadow-2xl flex items-center justify-center ring-4 ring-white`}>
                        <span className="text-4xl font-bold leading-none tracking-tight text-white text-center select-none">
                          {selectedStudent.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Status badge on photo */}
                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-lg max-w-[calc(100%-12px)] ${statusColors[selectedStudent.status]}`}>
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

                  {/* Role */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {selectedStudent.Role}
                    </span>
                  </div>

                  {/* COLLEGE */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base text-muted-foreground font-medium break-words">{selectedStudent.COLLEGE}</p>
                      <p className="text-sm text-muted-foreground/90 break-words">Department: {selectedStudent.COLLEGE_DEPARTMENT || "N/A"}</p>
                    </div>
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
                          {selectedStudent.tasks?.length ?? 0}
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
                          {selectedStudent.skills?.length ?? 0}
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
                    COLLEGE
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.COLLEGE}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    DEPARTMENT
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.COLLEGE_DEPARTMENT || "N/A"}
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
                    Role
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.Role}
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
                    {selectedStudent.startDate || "Not set"} - {selectedStudent.endDate || "Not set"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    HR
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.hr || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Manager
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.manager || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Offer Letter
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.offer_letter || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    NDA
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.nda || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    Payment
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.payment || "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    PMO
                  </span>
                  <div className="text-base font-semibold text-foreground">
                    {selectedStudent.pmo || "N/A"}
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

      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 px-6 py-5 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-md flex-shrink-0">
                        <Pencil className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">
                          Edit Student Profile
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Update personal and internship details
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeEditModal}
                      className="p-1.5 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
                      type="button"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
                  <form onSubmit={handleSaveEdit} className="p-6 space-y-6">
                    {editError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                        {editError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Full Name
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">
                          Email Address
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          required
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Phone</Label>
                        <Input
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Role</Label>
                        <Input
                          value={editForm.Role}
                          onChange={(e) => setEditForm({ ...editForm, Role: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">College</Label>
                        <Input
                          value={editForm.COLLEGE}
                          onChange={(e) => setEditForm({ ...editForm, COLLEGE: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Department</Label>
                        <Input
                          value={editForm.COLLEGE_DEPARTMENT}
                          onChange={(e) =>
                            setEditForm({ ...editForm, COLLEGE_DEPARTMENT: e.target.value })
                          }
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Supervisor</Label>
                        <Input
                          value={editForm.supervisor}
                          onChange={(e) =>
                            setEditForm({ ...editForm, supervisor: e.target.value })
                          }
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Supervisor Email</Label>
                        <Input
                          type="email"
                          value={editForm.supervisorEmail}
                          onChange={(e) =>
                            setEditForm({ ...editForm, supervisorEmail: e.target.value })
                          }
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">HR</Label>
                        <Input
                          value={editForm.hr}
                          onChange={(e) => setEditForm({ ...editForm, hr: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Manager</Label>
                        <Input
                          value={editForm.manager}
                          onChange={(e) => setEditForm({ ...editForm, manager: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Offer Letter</Label>
                        <Input
                          value={editForm.offer_letter}
                          onChange={(e) => setEditForm({ ...editForm, offer_letter: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">NDA</Label>
                        <Input
                          value={editForm.nda}
                          onChange={(e) => setEditForm({ ...editForm, nda: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Payment</Label>
                        <Input
                          value={editForm.payment}
                          onChange={(e) => setEditForm({ ...editForm, payment: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">PMO</Label>
                        <Input
                          value={editForm.pmo}
                          onChange={(e) => setEditForm({ ...editForm, pmo: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Start Date</Label>
                        <Input
                          type="date"
                          value={editForm.startDate}
                          onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">End Date</Label>
                        <Input
                          type="date"
                          value={editForm.endDate}
                          onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                          className="text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-foreground">Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {editSkills.map((skill) => (
                          <SkillTag
                            key={skill}
                            skill={skill}
                            onRemove={() => removeEditSkill(skill)}
                            variant="primary"
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={editSkillInput}
                          onChange={(e) => setEditSkillInput(e.target.value)}
                          placeholder="Add a skill"
                        />
                        <Button type="button" variant="outline" onClick={addEditSkill}>
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold text-foreground">Tasks</Label>
                        <Button type="button" variant="outline" onClick={addEditTask}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Task
                        </Button>
                      </div>

                      {editTasks.map((task) => (
                        <div key={task.id} className="border border-border rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <Input
                              value={task.title}
                              onChange={(e) => updateEditTask(task.id, "title", e.target.value)}
                              placeholder="Task title"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => removeEditTask(task.id)}
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <Textarea
                            value={task.description}
                            onChange={(e) =>
                              updateEditTask(task.id, "description", e.target.value)
                            }
                            placeholder="Task description"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button type="button" variant="outline" onClick={closeEditModal}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSavingEdit}>
                        {isSavingEdit ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPasswordModalOpen && selectedStudent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePasswordModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 px-6 py-5 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-md flex-shrink-0">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">Password Access</h2>
                        <p className="text-sm text-muted-foreground">
                          Reset the student password and share it securely.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closePasswordModal}
                      className="p-1.5 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
                      type="button"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleResetPassword} className="p-6 space-y-5">
                  {passwordNotice && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                      {passwordNotice}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">Student Email</Label>
                    <Input value={selectedStudent.email} disabled className="text-base" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">
                      Set Custom Password
                      <span className="text-xs text-muted-foreground font-normal ml-1">(Optional)</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showCustomPassword ? "text" : "password"}
                        value={customPassword}
                        onChange={(e) => setCustomPassword(e.target.value)}
                        placeholder="Leave blank to auto-generate"
                        minLength={6}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustomPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showCustomPassword ? "Hide password" : "Show password"}
                      >
                        {showCustomPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {generatedPassword && (
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">New Password</Label>
                      <div className="relative">
                        <Input
                          type={showGeneratedPassword ? "text" : "password"}
                          value={generatedPassword}
                          readOnly
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowGeneratedPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showGeneratedPassword ? "Hide password" : "Show password"}
                        >
                          {showGeneratedPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={closePasswordModal}>
                      Close
                    </Button>
                    <Button type="submit" disabled={isResettingPassword}>
                      {isResettingPassword ? "Resetting..." : "Reset Password"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
