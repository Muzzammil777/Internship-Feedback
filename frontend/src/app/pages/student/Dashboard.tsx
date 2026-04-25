import { motion } from "motion/react";
import { useEffect, useState } from "react";
import StatusCard from "../../components/shared/StatusCard";
import SkillTag from "../../components/shared/SkillTag";
import LoadingAnimation from "../../components/shared/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import {
  CheckCircle2,
  Clock,
  Code,
  Briefcase,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  Role: string;
  COLLEGE: string;
  COLLEGE_DEPARTMENT?: string;
  supervisor?: string;
  supervisorEmail?: string;
  status: string;
  skills: string[];
  tasks: any[];
  duration: string;
  startDate: string;
  endDate: string;
}

interface StudentFeedbackRecord {
  id: string;
}

interface CompanyFeedbackRecord {
  id: string;
  overallRating: number;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedbackRecord | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedbackRecord | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
        const res = await apiFetch(`${API_BASE}/students/profile/${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);

          if (data.id) {
            const [studentFeedbackRes, companyFeedbackRes] = await Promise.all([
              apiFetch(`${API_BASE}/feedback/student?student_email=${encodeURIComponent(data.email)}`),
              apiFetch(`${API_BASE}/feedback/company?student_id=${encodeURIComponent(data.id)}`),
            ]);

            if (studentFeedbackRes.ok) {
              const studentFeedbackRecords = (await studentFeedbackRes.json()) as StudentFeedbackRecord[];
              setStudentFeedback(studentFeedbackRecords[0] ?? null);
            }

            if (companyFeedbackRes.ok) {
              const companyFeedbackRecords = (await companyFeedbackRes.json()) as CompanyFeedbackRecord[];
              setCompanyFeedback(companyFeedbackRecords[0] ?? null);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  if (isLoading) {
    return <LoadingAnimation title="Loading dashboard" description="Fetching your internship overview..." />;
  }

  // Fallback to user data if profile fetch fails
  const displayName = profile?.name ?? user?.name ?? "Student";
  const displayRole = profile?.Role || "Intern";
  const displayCollege = profile?.COLLEGE || "University";
  const skills = profile?.skills ?? [];
  const hasTaskDetails = (profile?.tasks ?? []).some((task) => {
    const title = typeof task?.title === "string" ? task.title.trim() : "";
    const description = typeof task?.description === "string" ? task.description.trim() : "";
    return Boolean(title && description);
  });

  const isProfileComplete = Boolean(
    profile &&
      profile.name?.trim() &&
      profile.email?.trim() &&
      profile.Role?.trim() &&
      profile.COLLEGE?.trim() &&
      profile.COLLEGE_DEPARTMENT?.trim() &&
      profile.startDate?.trim() &&
      profile.endDate?.trim() &&
      profile.duration?.trim() &&
      profile.duration !== "N/A" &&
      profile.supervisor?.trim() &&
      profile.supervisorEmail?.trim() &&
      hasTaskDetails
  );

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary">Good morning!</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                Welcome back, {displayName.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your internship progress and feedback
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8"
        >
          <StatusCard
            title="Profile Status"
            value={isProfileComplete ? "Completed" : "In Progress"}
            description={isProfileComplete ? "All details filled" : "Awaiting completion"}
            icon={CheckCircle2}
            color={isProfileComplete ? "success" : "warning"}
          />
          <StatusCard
            title="Feedback Status"
            value={companyFeedback ? "Reviewed" : "Pending"}
            description={
              companyFeedback
                ? `Company rated ${companyFeedback.overallRating}/5`
                : studentFeedback
                  ? "Your feedback submitted"
                  : "Awaiting company review"
            }
            icon={Clock}
            color={companyFeedback ? "success" : "warning"}
          />
          <StatusCard
            title="Internship Duration"
            value={profile?.duration || "N/A"}
            description={profile?.startDate ? `${profile.startDate} - ${profile.endDate}` : "Period not set"}
            icon={Briefcase}
            color="accent"
          />
          <StatusCard
            title="Skills Acquired"
            value={skills.length}
            description="Technical skills"
            icon={Code}
            color="primary"
          />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/50">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Skills Developed
              </h2>
              <p className="text-sm text-muted-foreground">
                Technical competencies acquired during internship
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <SkillTag key={skill} skill={skill} variant="primary" />
              ))
            ) : (
              <p className="text-muted-foreground italic text-sm">No skills added yet.</p>
            )}
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/50">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Project Summary
              </h2>
              <p className="text-sm text-muted-foreground">
                Your main internship contribution
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold text-foreground mb-3">
                {profile?.tasks?.[0]?.title || "Active Internship Project"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {profile?.tasks?.[0]?.description || "Add you contributions using the profile page."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Institution</p>
                <p className="font-bold text-foreground text-lg truncate px-2">{displayCollege}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Assigned Role</p>
                <p className="font-bold text-foreground text-lg truncate px-2">{displayRole}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Status</p>
                <p className="font-bold text-foreground text-lg capitalize">{profile?.status || "Pending"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

