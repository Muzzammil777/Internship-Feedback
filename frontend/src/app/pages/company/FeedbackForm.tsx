import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import StarRating from "../../components/shared/StarRating";
import StudentAvatar from "../../components/shared/StudentAvatar";
import { Slider } from "../../components/ui/slider";
import {
  Send,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  department: string;
  university: string;
  projectTitle: string;
  duration: string;
  startDate: string;
  endDate: string;
}

interface FeedbackStatus {
  [studentId: string]: {
    submitted: boolean;
    ratings: {
      technical: number;
      quality: number;
      communication: number;
      teamwork: number;
      problemSolving: number;
      initiative: number;
      professionalism: number;
      learning: number;
    };
    overallRating: number;
    strengths: string;
    improvements: string;
    comments: string;
    recommendation: string;
  };
}

export default function CompanyFeedbackForm() {
  const students: Student[] = [
    {
      id: "1",
      name: "Alex Johnson",
      department: "Engineering - Frontend",
      university: "State University",
      projectTitle: "E-Commerce Platform Redesign",
      duration: "12 weeks",
      startDate: "January 15, 2026",
      endDate: "March 30, 2026",
    },
    {
      id: "2",
      name: "Emma Chen",
      department: "Engineering - Backend",
      university: "Tech Institute",
      projectTitle: "API Gateway Migration",
      duration: "10 weeks",
      startDate: "February 1, 2026",
      endDate: "April 15, 2026",
    },
    {
      id: "3",
      name: "Marcus Williams",
      department: "Data Science",
      university: "Engineering College",
      projectTitle: "Customer Analytics Dashboard",
      duration: "11 weeks",
      startDate: "January 20, 2026",
      endDate: "April 5, 2026",
    },
    {
      id: "4",
      name: "Sophia Martinez",
      department: "Product Design",
      university: "Design University",
      projectTitle: "Mobile App Redesign",
      duration: "12 weeks",
      startDate: "February 10, 2026",
      endDate: "May 1, 2026",
    },
  ];

  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId)!;
  const currentFeedback = feedbackStatus[selectedStudentId] || {
    submitted: false,
    ratings: {
      technical: 3,
      quality: 3,
      communication: 3,
      teamwork: 3,
      problemSolving: 3,
      initiative: 3,
      professionalism: 3,
      learning: 3,
    },
    overallRating: 3,
    strengths: "",
    improvements: "",
    comments: "",
    recommendation: "Recommended",
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = Object.values(feedbackStatus).filter(
    (f) => f.submitted
  ).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus({
      ...feedbackStatus,
      [selectedStudentId]: { ...currentFeedback, submitted: true },
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Move to next pending student
      const nextStudent = students.find(
        (s) => !feedbackStatus[s.id]?.submitted && s.id !== selectedStudentId
      );
      if (nextStudent) {
        setSelectedStudentId(nextStudent.id);
      }
    }, 2000);
  };

  const updateRating = (field: string, value: number) => {
    setFeedbackStatus({
      ...feedbackStatus,
      [selectedStudentId]: {
        ...currentFeedback,
        ratings: { ...currentFeedback.ratings, [field]: value },
      },
    });
  };

  const updateField = (field: string, value: any) => {
    setFeedbackStatus({
      ...feedbackStatus,
      [selectedStudentId]: { ...currentFeedback, [field]: value },
    });
  };

  const avatarGradients = [
    "from-indigo-500 to-purple-600",
    "from-teal-500 to-cyan-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
  ];

  const RatingSection = ({
    label,
    value,
    onChange,
    disabled = false,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-semibold">{label}</Label>
        <span className="text-sm font-bold text-foreground">
          {value}/5
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => !disabled && onChange(vals[0])}
        min={1}
        max={5}
        step={1}
        className="w-full"
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* LEFT PANEL - Student List */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-96 bg-card border-r border-border flex flex-col shadow-lg"
      >
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-50">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground mb-1">
              Student Evaluations
            </h2>
            <p className="text-sm text-muted-foreground">
              {completedCount} of {students.length} completed
            </p>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(completedCount / students.length) * 100}%`,
              }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student, index) => {
              const isSelected = student.id === selectedStudentId;
              const isCompleted = feedbackStatus[student.id]?.submitted;
              const gradient = avatarGradients[index % avatarGradients.length];

              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                      : "bg-secondary/30 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <StudentAvatar
                        name={student.name}
                        size="md"
                        gradient={gradient}
                        withRing={false}
                      />
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm truncate ${
                          isSelected ? "text-white" : "text-foreground"
                        }`}
                      >
                        {student.name}
                      </h3>
                      <p
                        className={`text-xs truncate ${
                          isSelected ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {student.department}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                          <CheckCircle2 className={`w-4 h-4 ${isSelected ? "text-white" : "text-emerald-600"}`} />
                        </div>
                      ) : (
                        <div className="p-1.5 bg-amber-500/20 rounded-lg">
                          <Clock className={`w-4 h-4 ${isSelected ? "text-white" : "text-amber-600"}`} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* RIGHT PANEL - Feedback Form */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative mx-auto mb-6"
                >
                  <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 bg-success rounded-full"
                  />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Feedback Submitted!
                </h2>
                <p className="text-muted-foreground">
                  Evaluation for {selectedStudent.name} has been saved successfully
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedStudentId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {/* Student Profile Header */}
              <div className="mb-8 bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 rounded-2xl p-8 border border-border shadow-md">
                <div className="flex items-start gap-6">
                  <StudentAvatar
                    name={selectedStudent.name}
                    size="xl"
                    gradient={
                      avatarGradients[
                        students.findIndex((s) => s.id === selectedStudentId) %
                          avatarGradients.length
                      ]
                    }
                    withRing={true}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {selectedStudent.name}
                        </h1>
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            {selectedStudent.department}
                          </span>
                        </div>
                      </div>
                      {currentFeedback.submitted ? (
                        <div className="px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Completed
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Pending
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Project</p>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedStudent.projectTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedStudent.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                {/* Overall Rating */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    Overall Performance
                  </h2>
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold">Overall Rating</Label>
                      <StarRating
                        value={currentFeedback.overallRating}
                        onChange={(val) => updateField("overallRating", val)}
                        size="lg"
                        readonly={currentFeedback.submitted}
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-foreground mb-5">
                    Detailed Evaluation
                  </h2>
                  <div className="space-y-5">
                    <RatingSection
                      label="Technical Skills"
                      value={currentFeedback.ratings.technical}
                      onChange={(val) => updateRating("technical", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Work Quality"
                      value={currentFeedback.ratings.quality}
                      onChange={(val) => updateRating("quality", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Communication"
                      value={currentFeedback.ratings.communication}
                      onChange={(val) => updateRating("communication", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Teamwork"
                      value={currentFeedback.ratings.teamwork}
                      onChange={(val) => updateRating("teamwork", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Problem Solving"
                      value={currentFeedback.ratings.problemSolving}
                      onChange={(val) => updateRating("problemSolving", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Initiative"
                      value={currentFeedback.ratings.initiative}
                      onChange={(val) => updateRating("initiative", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Professionalism"
                      value={currentFeedback.ratings.professionalism}
                      onChange={(val) => updateRating("professionalism", val)}
                      disabled={currentFeedback.submitted}
                    />
                    <RatingSection
                      label="Learning Ability"
                      value={currentFeedback.ratings.learning}
                      onChange={(val) => updateRating("learning", val)}
                      disabled={currentFeedback.submitted}
                    />
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-foreground mb-5">
                    Written Feedback
                  </h2>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="font-semibold">Strengths</Label>
                      <Textarea
                        rows={4}
                        placeholder="Describe the intern's key strengths and accomplishments..."
                        value={currentFeedback.strengths}
                        onChange={(e) => updateField("strengths", e.target.value)}
                        disabled={currentFeedback.submitted}
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Areas for Growth</Label>
                      <Textarea
                        rows={4}
                        placeholder="Suggest areas where the intern could improve..."
                        value={currentFeedback.improvements}
                        onChange={(e) => updateField("improvements", e.target.value)}
                        disabled={currentFeedback.submitted}
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Overall Comments</Label>
                      <Textarea
                        rows={4}
                        placeholder="Additional comments and recommendations..."
                        value={currentFeedback.comments}
                        onChange={(e) => updateField("comments", e.target.value)}
                        disabled={currentFeedback.submitted}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-foreground mb-5">
                    Hiring Recommendation
                  </h2>
                  <div className="space-y-4">
                    <Label className="font-semibold">
                      Would you hire this intern for a full-time position?
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Highly Recommended", "Recommended", "Not Recommended"].map(
                        (option) => (
                          <motion.button
                            key={option}
                            type="button"
                            whileHover={{ scale: currentFeedback.submitted ? 1 : 1.02 }}
                            whileTap={{ scale: currentFeedback.submitted ? 1 : 0.98 }}
                            onClick={() => !currentFeedback.submitted && updateField("recommendation", option)}
                            disabled={currentFeedback.submitted}
                            className={`px-4 py-3 rounded-xl font-bold transition-all shadow-sm ${
                              currentFeedback.recommendation === option
                                ? option === "Highly Recommended"
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/50"
                                  : option === "Recommended"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-500/50"
                                  : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/50"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            } ${currentFeedback.submitted ? "opacity-75 cursor-not-allowed" : ""}`}
                          >
                            {option}
                          </motion.button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {!currentFeedback.submitted && (
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex items-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </Button>
                  </div>
                )}

                {currentFeedback.submitted && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-bold text-emerald-900">Feedback Submitted</p>
                      <p className="text-sm text-emerald-700">
                        Your evaluation has been saved successfully
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
