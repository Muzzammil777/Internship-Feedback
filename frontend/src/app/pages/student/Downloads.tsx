import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Download, FileText, Award, Building2, File } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
}

interface CompanyFeedback {
  overallRating: number;
}

interface StudentFeedback {
  overallComments: string;
}

interface DownloadItem {
  title: string;
  description: string;
  icon: typeof Building2;
  fileType: string;
  size: string;
  color: "primary" | "accent" | "success";
  fileName: string;
  fileContent: string;
}

export default function StudentDownloads() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedback | null>(null);
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDownloadsData = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const profileRes = await fetch(`${apiBaseUrl}/students/profile/${encodeURIComponent(user.email)}`);
        if (!profileRes.ok) {
          setIsLoading(false);
          return;
        }

        const profileData = (await profileRes.json()) as StudentProfile;
        setProfile(profileData);

        const [companyFeedbackRes, studentFeedbackRes] = await Promise.all([
          fetch(`${apiBaseUrl}/feedback/company?student_id=${encodeURIComponent(profileData.id)}`),
          fetch(`${apiBaseUrl}/feedback/student?student_email=${encodeURIComponent(user.email)}`),
        ]);

        if (companyFeedbackRes.ok) {
          const companyFeedbackRecords = (await companyFeedbackRes.json()) as CompanyFeedback[];
          setCompanyFeedback(companyFeedbackRecords[0] ?? null);
        }

        if (studentFeedbackRes.ok) {
          const studentFeedbackRecords = (await studentFeedbackRes.json()) as StudentFeedback[];
          setStudentFeedback(studentFeedbackRecords[0] ?? null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadDownloadsData();
  }, [apiBaseUrl, user?.email]);

  const downloadItems = useMemo<DownloadItem[]>(() => {
    if (!profile) {
      return [];
    }

    const generatedAt = new Date().toISOString();
    const profileExport = JSON.stringify(profile, null, 2);
    const companyExport = JSON.stringify(companyFeedback ?? { message: "No company feedback submitted yet." }, null, 2);
    const studentExport = JSON.stringify(studentFeedback ?? { message: "No student feedback submitted yet." }, null, 2);

    return [
      {
        title: "Company Feedback Report",
        description: "Company evaluation data generated from backend records",
        icon: Building2,
        fileType: "JSON",
        size: `${Math.max(1, Math.ceil(companyExport.length / 1024))} KB`,
        color: "primary",
        fileName: `company-feedback-${profile.email}.json`,
        fileContent: companyExport,
      },
      {
        title: "Internship Profile Summary",
        description: "Student profile and internship details from backend",
        icon: Award,
        fileType: "JSON",
        size: `${Math.max(1, Math.ceil(profileExport.length / 1024))} KB`,
        color: "accent",
        fileName: `student-profile-${profile.email}.json`,
        fileContent: profileExport,
      },
      {
        title: "Student Feedback Submission",
        description: "Your submitted feedback about the company",
        icon: FileText,
        fileType: "TXT",
        size: `${Math.max(1, Math.ceil(studentExport.length / 1024))} KB`,
        color: "success",
        fileName: `student-feedback-${profile.email}.txt`,
        fileContent: `Generated at: ${generatedAt}\n\n${studentExport}`,
      },
    ];
  }, [companyFeedback, profile, studentFeedback]);

  const triggerDownload = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
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

  const colorClasses = {
    primary: {
      bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
      shadow: "shadow-indigo-500/50",
    },
    accent: {
      bg: "bg-gradient-to-br from-teal-500 to-cyan-600",
      shadow: "shadow-teal-500/50",
    },
    success: {
      bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/50",
    },
  };

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
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Downloads</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">Downloads</h1>
                <p className="text-muted-foreground text-lg">
                  Download your feedback reports and certificates
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 whitespace-nowrap">
                <File className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold text-primary">{downloadItems.length} files</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="space-y-5">
          {downloadItems.map((item, index) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 rounded-xl ${colors.bg} text-white shadow-lg ${colors.shadow}`}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-secondary rounded-lg text-xs font-semibold text-secondary-foreground">
                          {item.fileType}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                    <Button className="flex items-center gap-2 shadow-md" size="lg" onClick={() => triggerDownload(item.fileName, item.fileContent)}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Download All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="flex items-center gap-2 shadow-md hover:shadow-lg"
            onClick={() => {
              for (const item of downloadItems) {
                triggerDownload(item.fileName, item.fileContent);
              }
            }}
            disabled={downloadItems.length === 0}
          >
            <Download className="w-5 h-5" />
            Download All Files
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
