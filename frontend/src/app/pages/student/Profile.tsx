import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import SkillTag from "../../components/shared/SkillTag";
import { useAuth } from "../../context/AuthContext";
import { Plus, Save, User, Building2, Briefcase, Code, Upload, Camera, GraduationCap, Calendar, CheckCircle2, X, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
}

export default function StudentProfile() {
  const { user } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    COLLEGE: "",
    COLLEGE_DEPARTMENT: "",
    Role: "",
    startDate: "",
    endDate: "",
    supervisor: "",
    supervisorEmail: "",
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      
      try {
        const res = await fetch(`${apiBaseUrl}/students/profile/${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            COLLEGE: data.COLLEGE || "",
            COLLEGE_DEPARTMENT: data.COLLEGE_DEPARTMENT || "",
            Role: data.Role || "",
            startDate: data.startDate || "",
            endDate: data.endDate || "",
            supervisor: data.supervisor || "",
            supervisorEmail: data.supervisorEmail || "",
          });
          setProfilePhoto(data.profilePhoto || null);
          setSkills(data.skills || []);
          setTasks(data.tasks || []);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [apiBaseUrl, user?.email]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setSaveError("Please choose an image file.");
        return;
      }

      const maxFileSizeBytes = 2 * 1024 * 1024;
      if (file.size > maxFileSizeBytes) {
        setSaveError("Please upload an image smaller than 2MB.");
        return;
      }

      setSaveError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    const confirmed = window.confirm("Remove your profile photo? This will clear the current photo.");
    if (!confirmed) {
      return;
    }

    setProfilePhoto(null);
    setSaveError("");
    setSaveMessage("Photo removed. Click Save Changes to persist.");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return "N/A";
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "N/A";
    const weeks = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return `${weeks} weeks`;
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "",
      description: "",
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, field: keyof Task, value: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = async () => {
    if (!user?.email) {
      return;
    }

    setIsSaving(true);
    setSaveError("");
    setSaveMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/students/profile/${encodeURIComponent(user.email)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profilePhoto: profilePhoto || "",
          role_title: formData.Role,
          college: formData.COLLEGE,
          college_department: formData.COLLEGE_DEPARTMENT,
          startDate: formData.startDate,
          endDate: formData.endDate,
          duration: calculateDuration(),
          supervisor: formData.supervisor,
          supervisorEmail: formData.supervisorEmail,
          skills,
          tasks,
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { detail?: string };
        throw new Error(errorPayload.detail ?? "Failed to save profile");
      }

      setSaveMessage("Profile saved successfully.");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to save profile right now.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }


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
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">My Profile</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
              Profile & Details
            </h1>
            <p className="text-muted-foreground text-lg" style={{ paddingBottom: "40px" }}>
              Manage your personal information and internship details
            </p>

            {/* Profile Header Section */}
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* LEFT - Large Profile Photo with Upload */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {profilePhoto ? (
                      <div className="relative">
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-32 h-32 rounded-2xl object-cover shadow-2xl ring-4 ring-white"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <Camera className="w-8 h-8 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl flex flex-col items-center justify-center ring-4 ring-white hover:scale-105 transition-transform group"
                      >
                        <span className="text-5xl font-bold text-white mb-2">
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-white mx-auto mb-1" />
                            <span className="text-xs text-white font-semibold">
                              Upload
                            </span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Status badge on photo */}
                    <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-700 border-2 border-white shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </div>
                  </div>
                  {profilePhoto && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRemovePhoto}
                      className="w-full mt-4 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Photo
                    </Button>
                  )}
                </div>

                {/* RIGHT - Student Information */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
                    {formData.name}
                  </h2>

                  {/* Role */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {formData.Role}
                    </span>
                  </div>

                  {/* COLLEGE */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-base text-muted-foreground font-medium">
                      {formData.COLLEGE}
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
                          {calculateDuration()}
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
                          {tasks.length}
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
                          {skills.length}
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
        <form className="space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/50">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Personal Information
                </h2>
                <p className="text-sm text-muted-foreground">Your basic details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">COLLEGE</Label>
                <Input
                  value={formData.COLLEGE}
                  onChange={(e) => setFormData({ ...formData, COLLEGE: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">COLLEGE DEPARTMENT</Label>
                <Input
                  value={formData.COLLEGE_DEPARTMENT}
                  onChange={(e) => setFormData({ ...formData, COLLEGE_DEPARTMENT: e.target.value })}
                  placeholder="e.g., Computer Science and Engineering"
                  className="font-medium text-base"
                />
              </div>
            </div>
          </motion.div>

          {/* Internship Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/50">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Internship Details
                </h2>
                <p className="text-sm text-muted-foreground">Internship organization info</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Role</Label>
                <Input
                  value={formData.Role}
                  onChange={(e) => setFormData({ ...formData, Role: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Supervisor Name</Label>
                <Input
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Supervisor Email</Label>
                <Input
                  type="email"
                  value={formData.supervisorEmail}
                  onChange={(e) => setFormData({ ...formData, supervisorEmail: e.target.value })}
                  className="font-medium text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Start Date</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="font-medium text-base pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">End Date</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="font-medium text-base pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tasks & Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Tasks & Responsibilities
                  </h2>
                  <p className="text-sm text-muted-foreground">Projects and tasks you worked on</p>
                </div>
              </div>
              <Button
                type="button"
                onClick={addTask}
                className="flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-100 shadow-sm relative group"
                  >
                    {/* Task Number Badge */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => removeTask(task.id)}
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>

                    <div className="space-y-4">
                      {/* Task Title */}
                      <div className="space-y-2">
                        <Label className="font-semibold text-xs uppercase tracking-wide text-purple-600">
                          Task Title
                        </Label>
                        <Input
                          value={task.title}
                          onChange={(e) => updateTask(task.id, "title", e.target.value)}
                          placeholder="E.g., E-Commerce Platform Redesign"
                          className="font-semibold text-base bg-white border-purple-200 focus:border-purple-400"
                        />
                      </div>

                      {/* Task Description */}
                      <div className="space-y-2">
                        <Label className="font-semibold text-xs uppercase tracking-wide text-purple-600">
                          Description
                        </Label>
                        <Textarea
                          value={task.description}
                          onChange={(e) => updateTask(task.id, "description", e.target.value)}
                          placeholder="Describe what you worked on, technologies used, and impact..."
                          rows={3}
                          className="leading-relaxed text-base bg-white border-purple-200 focus:border-purple-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {tasks.length === 0 && (
                <div className="text-center py-12 bg-secondary/30 rounded-2xl border-2 border-dashed border-border">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground font-medium mb-4">
                    No tasks added yet
                  </p>
                  <Button
                    type="button"
                    onClick={addTask}
                    variant="outline"
                    className="flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Task
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/50">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Skills Developed
                </h2>
                <p className="text-sm text-muted-foreground">Technical competencies acquired</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., React, Python)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="font-medium text-base"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <SkillTag
                      skill={skill}
                      variant="primary"
                      onRemove={removeSkill}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>


          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-end pt-4 pb-12"
          >
            <Button
              size="lg"
              className="flex items-center gap-2 shadow-lg"
              onClick={handleSave}
              type="button"
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>

          {saveError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 -mt-6 mb-6">
              {saveError}
            </div>
          )}

          {saveMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 -mt-6 mb-6">
              {saveMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
