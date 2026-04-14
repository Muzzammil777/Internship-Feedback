import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Download, FileText, Award, Building2, File } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface TaskItem {
  id: string;
  title: string;
  description: string;
}

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  phone?: string;
  Role?: string;
  COLLEGE?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  supervisor?: string;
  supervisorEmail?: string;
  status?: string;
  skills?: string[];
  tasks?: TaskItem[];
}

interface CompanyFeedback {
  studentName?: string;
  role?: string;
  college?: string;
  projectTitle?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  overallRating: number;
  recommendation?: string;
  strengths?: string;
  improvements?: string;
  comments?: string;
}

interface StudentFeedback {
  companyName?: string;
  learningExperience?: number;
  mentorship?: number;
  workEnvironment?: number;
  communication?: number;
  strengths?: string;
  improvements?: string;
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
  onDownload: () => Promise<void>;
}

export default function StudentDownloads() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedback | null>(null);
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logoDataUrlRef = useRef<string | null>(null);

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

  const getCircularLogoDataUrl = async (): Promise<string | null> => {
    if (logoDataUrlRef.current) {
      return logoDataUrlRef.current;
    }

    try {
      const image = new Image();
      image.src = "/favicon.png";

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to load logo"));
      });

      const size = 160;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");

      if (!context) {
        return null;
      }

      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.closePath();
      context.clip();
      context.drawImage(image, 0, 0, size, size);

      logoDataUrlRef.current = canvas.toDataURL("image/png");
      return logoDataUrlRef.current;
    } catch {
      return null;
    }
  };

  const getCircularPhotoDataUrl = async (photoSource: string): Promise<string | null> => {
    try {
      const image = new Image();
      image.src = photoSource;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to load profile photo"));
      });

      const size = 240;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");

      if (!context) {
        return null;
      }

      context.clearRect(0, 0, size, size);
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.closePath();
      context.clip();

      context.drawImage(image, 0, 0, size, size);
      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const addPdfHeader = async (doc: jsPDF, title: string, subtitle: string) => {
    doc.setFillColor(67, 56, 202);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("MoviCloud Labs", 105, 8.5, { align: "center" });

    const logoDataUrl = await getCircularLogoDataUrl();
    if (logoDataUrl) {
      const logoCenterX = 190;
      const logoCenterY = 20;
      const logoDiameter = 20;

      doc.setDrawColor(167, 243, 208);
      doc.setLineWidth(0.8);
      doc.circle(logoCenterX, logoCenterY, 11.5);
      doc.addImage(
        logoDataUrl,
        "PNG",
        logoCenterX - logoDiameter / 2,
        logoCenterY - logoDiameter / 2,
        logoDiameter,
        logoDiameter
      );
    }

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.line(14, 11.5, 170, 11.5);

    doc.setFontSize(17);
    doc.text(title, 14, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(subtitle, 14, 30);

    doc.setTextColor(45, 55, 72);
  };

  const downloadCompanyFeedbackPdf = async () => {
    if (!profile) {
      return;
    }

    const doc = new jsPDF();
    await addPdfHeader(doc, "Company Feedback Report", `Generated for ${profile.name}`);

    autoTable(doc, {
      startY: 50,
      theme: "grid",
      head: [["Field", "Value"]],
      body: [
        ["Student", profile.name],
        ["Email", profile.email],
        ["Overall Rating", companyFeedback ? `${companyFeedback.overallRating}/5` : "Not submitted"],
        ["Recommendation", companyFeedback?.recommendation || "N/A"],
        ["Project", companyFeedback?.projectTitle || "N/A"],
        ["Internship Duration", companyFeedback?.duration || profile.duration || "N/A"],
        ["Strengths", companyFeedback?.strengths || "N/A"],
        ["Improvements", companyFeedback?.improvements || "N/A"],
        ["Additional Comments", companyFeedback?.comments || "N/A"],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [99, 102, 241] },
      columnStyles: { 0: { cellWidth: 60, fontStyle: "bold" }, 1: { cellWidth: 120 } },
    });

    doc.save(`company-feedback-${profile.email}.pdf`);
  };

  const downloadProfileSummaryPdf = async () => {
    if (!profile) {
      return;
    }

    const skills = profile.skills ?? [];
    const tasks = profile.tasks ?? [];

    const doc = new jsPDF();
    await addPdfHeader(doc, "Internship Profile Summary", `Generated for ${profile.name}`);

    // Visual profile block with photo (if available) and identity details.
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 46, 182, 26, 3, 3, "FD");

    const photoX = 18;
    const photoY = 50;
    const photoSize = 18;
    const circularProfilePhoto = profile.profilePhoto
      ? await getCircularPhotoDataUrl(profile.profilePhoto)
      : null;

    if (profile.profilePhoto) {
      if (circularProfilePhoto) {
        doc.setDrawColor(203, 213, 225);
        doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, 10);
        doc.addImage(circularProfilePhoto, "PNG", photoX, photoY, photoSize, photoSize);
      } else {
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        const initials = profile.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, 10);
        doc.text(initials || "ST", photoX + photoSize / 2, photoY + 11.5, { align: "center" });
        doc.setTextColor(45, 55, 72);
      }
    } else {
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      const initials = profile.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, 10);
      doc.text(initials || "ST", photoX + photoSize / 2, photoY + 11.5, { align: "center" });
      doc.setTextColor(45, 55, 72);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(profile.name, 42, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(profile.email, 42, 62);
    doc.text(`${profile.Role || "Intern"} | ${profile.COLLEGE || "College"}`, 42, 68);
    doc.setTextColor(45, 55, 72);

    autoTable(doc, {
      startY: 78,
      theme: "striped",
      head: [["Profile Field", "Details"]],
      body: [
        ["Full Name", profile.name],
        ["Email", profile.email],
        ["Phone", profile.phone || "N/A"],
        ["Role", profile.Role || "N/A"],
        ["College", profile.COLLEGE || "N/A"],
        ["Status", profile.status || "N/A"],
        ["Start Date", profile.startDate || "N/A"],
        ["End Date", profile.endDate || "N/A"],
        ["Duration", profile.duration || "N/A"],
        ["Supervisor", profile.supervisor || "N/A"],
        ["Supervisor Email", profile.supervisorEmail || "N/A"],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [20, 184, 166] },
      columnStyles: { 0: { cellWidth: 60, fontStyle: "bold" }, 1: { cellWidth: 120 } },
    });

    const profileTableEndY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 50;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 184, 166);
    doc.text("Skills", 14, profileTableEndY + 12);
    doc.setTextColor(45, 55, 72);

    autoTable(doc, {
      startY: profileTableEndY + 16,
      theme: "grid",
      head: [["Skill"]],
      body: skills.length > 0 ? skills.map((skill) => [skill]) : [["No skills added yet"]],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [14, 165, 233] },
      columnStyles: { 0: { cellWidth: 180 } },
    });

    const skillsTableEndY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? profileTableEndY + 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 184, 166);
    doc.text("Task Timeline", 14, skillsTableEndY + 12);
    doc.setTextColor(45, 55, 72);

    autoTable(doc, {
      startY: skillsTableEndY + 16,
      theme: "grid",
      head: [["#", "Task", "Description", "Timeline"]],
      body:
        tasks.length > 0
          ? tasks.map((task, index) => [
              String(index + 1),
              task.title || "Untitled Task",
              task.description || "No description",
              profile.startDate && profile.endDate
                ? `${profile.startDate} to ${profile.endDate}`
                : profile.duration || "Not specified",
            ])
          : [["-", "No tasks added yet", "No task details available", "N/A"]],
      styles: { fontSize: 9, cellPadding: 3, valign: "top" },
      headStyles: { fillColor: [59, 130, 246] },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 38, fontStyle: "bold" },
        2: { cellWidth: 85 },
        3: { cellWidth: 47 },
      },
    });

    doc.save(`student-profile-${profile.email}.pdf`);
  };

  const downloadStudentFeedbackPdf = async () => {
    if (!profile) {
      return;
    }

    const doc = new jsPDF();
    await addPdfHeader(doc, "Student Feedback Submission", `Generated for ${profile.name}`);

    autoTable(doc, {
      startY: 50,
      theme: "grid",
      head: [["Field", "Value"]],
      body: [
        ["Student", profile.name],
        ["Email", profile.email],
        ["Company", studentFeedback?.companyName || "N/A"],
        ["Learning Experience", studentFeedback?.learningExperience ? `${studentFeedback.learningExperience}/5` : "N/A"],
        ["Mentorship", studentFeedback?.mentorship ? `${studentFeedback.mentorship}/5` : "N/A"],
        ["Work Environment", studentFeedback?.workEnvironment ? `${studentFeedback.workEnvironment}/5` : "N/A"],
        ["Communication", studentFeedback?.communication ? `${studentFeedback.communication}/5` : "N/A"],
        ["Strengths", studentFeedback?.strengths || "N/A"],
        ["Improvements", studentFeedback?.improvements || "N/A"],
        ["Overall Comments", studentFeedback?.overallComments || "N/A"],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [16, 185, 129] },
      columnStyles: { 0: { cellWidth: 60, fontStyle: "bold" }, 1: { cellWidth: 120 } },
    });

    doc.save(`student-feedback-${profile.email}.pdf`);
  };

  const downloadItems = useMemo<DownloadItem[]>(() => {
    if (!profile) {
      return [];
    }

    return [
      {
        title: "Company Feedback Report",
        description: "Company evaluation data generated from backend records",
        icon: Building2,
        fileType: "PDF",
        size: "Generated on download",
        color: "primary",
        fileName: `company-feedback-${profile.email}.pdf`,
        onDownload: downloadCompanyFeedbackPdf,
      },
      {
        title: "Internship Profile Summary",
        description: "Student profile and internship details from backend",
        icon: Award,
        fileType: "PDF",
        size: "Generated on download",
        color: "accent",
        fileName: `student-profile-${profile.email}.pdf`,
        onDownload: downloadProfileSummaryPdf,
      },
      {
        title: "Student Feedback Submission",
        description: "Your submitted feedback about the company",
        icon: FileText,
        fileType: "PDF",
        size: "Generated on download",
        color: "success",
        fileName: `student-feedback-${profile.email}.pdf`,
        onDownload: downloadStudentFeedbackPdf,
      },
    ];
  }, [companyFeedback, profile, studentFeedback]);

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
                    <Button className="flex items-center gap-2 shadow-md" size="lg" onClick={() => void item.onDownload()}>
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
              void (async () => {
                for (const item of downloadItems) {
                  await item.onDownload();
                }
              })();
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
