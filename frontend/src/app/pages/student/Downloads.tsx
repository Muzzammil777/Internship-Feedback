import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Download, FileText, Award, Building2, File, Loader2 } from "lucide-react";
import LoadingAnimation from "../../components/shared/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL, apiFetch } from "../../lib/api";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  ratings?: Partial<Record<CompanyMetricKey, number>>;
  recommendation?: string;
  strengths?: string;
  improvements?: string;
  comments?: string;
}

type CompanyMetricKey =
  | "technicalKnowledge"
  | "codeQualityImplementation"
  | "taskCompletion"
  | "productivity"
  | "attentionToDetail"
  | "communicationClarity"
  | "reportingUpdates"
  | "punctuality"
  | "responsibility"
  | "discipline"
  | "collaboration"
  | "adaptability"
  | "opennessToFeedback"
  | "learningAbility"
  | "skillImprovement"
  | "initiativeToLearnNewThings"
  | "contributionToTeamProject"
  | "ownershipOfTasks";

interface MetricDefinition {
  key: CompanyMetricKey;
  label: string;
}

interface MetricGroup {
  title: string;
  metrics: MetricDefinition[];
}

interface StudentFeedback {
  companyName?: string;
  learningExperience?: number;
  mentorship?: number;
  workEnvironment?: number;
  communication?: number;
  strengths?: string;
  improvements?: string;
  overallComments?: string;
  sections?: StudentFeedbackSection[];
}

type StudentFeedbackQuestionType = "rating" | "boolean" | "enum" | "text";
type StudentFeedbackQuestionValue = number | boolean | string | null;

interface StudentFeedbackSectionQuestion {
  id: string;
  label: string;
  type: StudentFeedbackQuestionType;
}

interface StudentFeedbackSectionTemplate {
  id: string;
  title: string;
  questions: StudentFeedbackSectionQuestion[];
}

interface StudentFeedbackQuestion {
  questionId: string;
  label: string;
  type: StudentFeedbackQuestionType;
  value: StudentFeedbackQuestionValue;
}

interface StudentFeedbackSection {
  sectionId: string;
  title: string;
  questions: StudentFeedbackQuestion[];
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

const SYSTEM_META_MARKER = "[SYSTEM_META]";

const COMPANY_METRIC_GROUPS: MetricGroup[] = [
  {
    title: "Technical Skills",
    metrics: [
      { key: "technicalKnowledge", label: "Technical Knowledge" },
      { key: "codeQualityImplementation", label: "Code Quality & Implementation" },
      { key: "skillImprovement", label: "Skill Improvement" },
    ],
  },
  {
    title: "Work Execution",
    metrics: [
      { key: "taskCompletion", label: "Task Completion" },
      { key: "productivity", label: "Productivity" },
      { key: "attentionToDetail", label: "Attention to Detail" },
      { key: "ownershipOfTasks", label: "Ownership of Tasks" },
    ],
  },
  {
    title: "Communication",
    metrics: [
      { key: "communicationClarity", label: "Communication Clarity" },
      { key: "reportingUpdates", label: "Reporting & Updates" },
    ],
  },
  {
    title: "Professional Behavior",
    metrics: [
      { key: "punctuality", label: "Punctuality" },
      { key: "responsibility", label: "Responsibility" },
      { key: "discipline", label: "Discipline" },
    ],
  },
  {
    title: "Teamwork",
    metrics: [
      { key: "collaboration", label: "Collaboration" },
      { key: "contributionToTeamProject", label: "Contribution to Team Project" },
    ],
  },
  {
    title: "Learning & Growth",
    metrics: [
      { key: "adaptability", label: "Adaptability" },
      { key: "opennessToFeedback", label: "Openness to Feedback" },
      { key: "learningAbility", label: "Learning Ability" },
      { key: "initiativeToLearnNewThings", label: "Initiative to Learn New Things" },
    ],
  },
];

const STUDENT_FEEDBACK_SECTION_TEMPLATES: StudentFeedbackSectionTemplate[] = [
  {
    id: "internship_experience",
    title: "Section 1: Internship Experience",
    questions: [
      { id: "overallInternshipExperience", label: "Overall internship experience", type: "rating" },
      { id: "relevanceToStudy", label: "Relevance to field", type: "rating" },
      { id: "learningOutcomesSatisfaction", label: "Learning outcomes", type: "rating" },
      { id: "onboardingProcess", label: "Onboarding process", type: "rating" },
      { id: "teamMentorSupport", label: "Team/mentor support", type: "rating" },
    ],
  },
  {
    id: "learning_development",
    title: "Section 2: Learning & Development",
    questions: [
      { id: "practicalKnowledge", label: "Practical knowledge gained", type: "boolean" },
      { id: "newSkillsLearned", label: "New skills learned", type: "text" },
      { id: "confidenceApplyingSkills", label: "Confidence level", type: "rating" },
      { id: "realTimeProjects", label: "Real-time project exposure", type: "boolean" },
    ],
  },
  {
    id: "mentorship_support",
    title: "Section 3: Mentorship & Support",
    questions: [
      { id: "mentorGuidance", label: "Mentor guidance", type: "rating" },
      { id: "feedbackRegular", label: "Feedback frequency", type: "boolean" },
      { id: "communicationClear", label: "Communication clarity", type: "rating" },
      { id: "comfortableAskingQuestions", label: "Comfort asking questions", type: "boolean" },
    ],
  },
  {
    id: "work_environment",
    title: "Section 4: Work Environment",
    questions: [
      { id: "workCulture", label: "Work culture", type: "rating" },
      { id: "tasksClearlyAssigned", label: "Task clarity", type: "boolean" },
      { id: "workloadManageable", label: "Workload manageability", type: "rating" },
      { id: "metExpectations", label: "Expectations met", type: "boolean" },
    ],
  },
  {
    id: "project_feedback",
    title: "Section 5: Project Feedback",
    questions: [
      { id: "requirementsExplained", label: "Requirement clarity", type: "boolean" },
      { id: "projectChallengeLevel", label: "Project difficulty", type: "enum" },
      { id: "projectImprovedSkills", label: "Skill improvement", type: "boolean" },
      { id: "projectExperienceRating", label: "Project rating", type: "rating" },
    ],
  },
  {
    id: "overall_satisfaction",
    title: "Section 6: Overall Satisfaction",
    questions: [
      { id: "recommendToOthers", label: "Recommend internship", type: "boolean" },
      { id: "interestedFutureOpportunities", label: "Interested in future opportunities", type: "boolean" },
      { id: "overallSatisfaction", label: "Overall satisfaction", type: "rating" },
    ],
  },
  {
    id: "suggestions_feedback",
    title: "Section 7: Suggestions & Feedback",
    questions: [
      { id: "likedMost", label: "What did you like most", type: "text" },
      { id: "challengesFaced", label: "Challenges faced", type: "text" },
      { id: "improvementsSuggested", label: "Improvements suggested", type: "text" },
      { id: "additionalComments", label: "Additional comments", type: "text" },
    ],
  },
  {
    id: "assessment_policy",
    title: "Section 8: Assessment Policy",
    questions: [
      { id: "durationSufficient", label: "Internship duration sufficient", type: "boolean" },
      { id: "stipendFair", label: "Stipend policy fairness", type: "boolean" },
      { id: "continueWithStipend", label: "Willingness to continue", type: "boolean" },
    ],
  },
];

function stripSystemMetaComment(comment?: string): string {
  if (!comment) {
    return "";
  }

  const markerIndex = comment.indexOf(SYSTEM_META_MARKER);
  if (markerIndex === -1) {
    return comment.trim();
  }

  return comment.slice(0, markerIndex).trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getRecommendationBadgeClass(recommendation: string): string {
  const normalized = recommendation.toLowerCase();
  if (normalized.includes("highly")) {
    return "badge-high";
  }
  if (normalized.includes("not")) {
    return "badge-low";
  }
  if (normalized.includes("conditional")) {
    return "badge-mid";
  }
  return "badge-good";
}

function splitFeedbackLines(value?: string): string[] {
  if (!value?.trim()) {
    return [];
  }

  return value
    .split(/\r?\n|\u2022|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatEnumValue(value: string): string {
  return value
    .split(/[ _-]+/)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1).toLowerCase() : ""))
    .join(" ");
}

function renderRatingMarkup(value: number): string {
  const safeValue = Math.max(0, Math.min(5, value));
  const rounded = Math.round(safeValue);
  const stars = `${"&#9733;".repeat(rounded)}${"&#9734;".repeat(5 - rounded)}`;
  return `<div class="answer-rating"><span class="answer-stars">${stars}</span><span class="answer-rating-number">${safeValue.toFixed(1)} / 5</span></div>`;
}

function buildStudentFeedbackSections(feedback: StudentFeedback | null): StudentFeedbackSection[] {
  if (feedback?.sections?.length) {
    return feedback.sections.map((section) => ({
      sectionId: section.sectionId,
      title: section.title,
      questions: section.questions.map((question) => ({
        questionId: question.questionId,
        label: question.label,
        type: question.type,
        value: question.value,
      })),
    }));
  }

  const legacyMap: Record<string, StudentFeedbackQuestionValue> = {
    overallInternshipExperience: feedback?.learningExperience ?? null,
    mentorGuidance: feedback?.mentorship ?? null,
    workCulture: feedback?.workEnvironment ?? null,
    communicationClear: feedback?.communication ?? null,
    likedMost: feedback?.strengths ?? null,
    improvementsSuggested: feedback?.improvements ?? null,
    additionalComments: feedback?.overallComments ?? null,
  };

  return STUDENT_FEEDBACK_SECTION_TEMPLATES.map((section) => ({
    sectionId: section.id,
    title: section.title,
    questions: section.questions.map((question) => ({
      questionId: question.id,
      label: question.label,
      type: question.type,
      value: legacyMap[question.id] ?? null,
    })),
  }));
}

export default function StudentDownloads() {
  const apiBaseUrl = API_BASE_URL;
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedback | null>(null);
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDownloadFileName, setActiveDownloadFileName] = useState<string | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const logoDataUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const loadDownloadsData = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const profileRes = await apiFetch(`${apiBaseUrl}/students/profile/${encodeURIComponent(user.email)}`);
        if (!profileRes.ok) {
          setIsLoading(false);
          return;
        }

        const profileData = (await profileRes.json()) as StudentProfile;
        setProfile(profileData);

        const [companyFeedbackRes, studentFeedbackRes] = await Promise.all([
          apiFetch(`${apiBaseUrl}/feedback/company?student_id=${encodeURIComponent(profileData.id)}`),
          apiFetch(`${apiBaseUrl}/feedback/student?student_email=${encodeURIComponent(user.email)}`),
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

  const downloadCompanyFeedbackPdf = async () => {
    if (!profile) {
      return;
    }

    const reportDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const cleanedCompanyComments = stripSystemMetaComment(companyFeedback?.comments);
    const strengthsList = splitFeedbackLines(companyFeedback?.strengths);
    const improvementsList = splitFeedbackLines(companyFeedback?.improvements);

    const logoDataUrl = await getCircularLogoDataUrl();
    const studentName = profile.name || companyFeedback?.studentName || "Student";
    const evaluatorName = profile.supervisor || "Company Evaluator";
    const companyName = studentFeedback?.companyName || "MoviCloud Labs";
    const recommendation = companyFeedback?.recommendation || "Recommended";
    const overallRating = companyFeedback?.overallRating ?? 0;
    const ratings = companyFeedback?.ratings ?? {};
    const logoMarkup = logoDataUrl
      ? `<img class="logo" src="${logoDataUrl}" alt="Company logo" />`
      : `<div class="logo logo-fallback">${escapeHtml((companyName.slice(0, 2) || "MC").toUpperCase())}</div>`;

    const starsCount = Math.max(0, Math.min(5, Math.round(overallRating || 0)));
    const stars = `${"&#9733;".repeat(starsCount)}${"&#9734;".repeat(5 - starsCount)}`;

    const metricGroupsMarkup = COMPANY_METRIC_GROUPS.map((group) => {
      const metricsMarkup = group.metrics
        .map((metric) => {
          const metricRating = Number(ratings[metric.key] ?? 0);
          const widthPercent = Math.max(0, Math.min(100, (metricRating / 5) * 100));
          return `
            <div class="metric-row">
              <div class="metric-top">
                <span class="metric-label">${escapeHtml(metric.label)}</span>
                <span class="metric-value">${metricRating ? metricRating.toFixed(1) : "0.0"} / 5</span>
              </div>
              <div class="metric-track">
                <div class="metric-fill" style="width:${widthPercent}%;"></div>
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <section class="card metric-card">
          <h3>${escapeHtml(group.title)}</h3>
          ${metricsMarkup}
        </section>
      `;
    }).join("");

    const strengthsMarkup =
      strengthsList.length > 0
        ? `<ul class="bullet-list">${strengthsList.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
        : `<p class="muted">No strengths provided.</p>`;

    const improvementsMarkup =
      improvementsList.length > 0
        ? `<ul class="bullet-list">${improvementsList.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
        : `<p class="muted">No areas for growth provided.</p>`;

    const commentsMarkup = cleanedCompanyComments
      ? `<p>${escapeHtml(cleanedCompanyComments)}</p>`
      : `<p class="muted">No overall comments provided.</p>`;

    const html = `
      <div class="report-shell">
        <style>
          .report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            color: #1f2937;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            background: #f3f5fb;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(120deg, #2b4fc8, #6143d6);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            background: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.35);
            object-fit: cover;
          }
          .logo-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .title-wrap h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
            letter-spacing: 0.2px;
          }
          .title-wrap .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .title-wrap .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.9;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dbe4f5;
            border-radius: 14px;
            padding: 14px;
          }
          .section-title {
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 700;
            color: #334155;
          }
          .divider {
            margin-top: 16px;
            border: none;
            border-top: 1px solid #dbe4f5;
          }
          .student-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .field {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .field .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 4px;
            display: block;
          }
          .field .value {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
          }
          .overall {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .overall-score {
            display: flex;
            align-items: baseline;
            gap: 8px;
          }
          .overall-score .score {
            font-size: 36px;
            line-height: 1;
            font-weight: 800;
            color: #2d3f99;
          }
          .overall-score .outof {
            font-size: 16px;
            color: #475569;
            font-weight: 700;
          }
          .stars {
            font-size: 20px;
            letter-spacing: 2px;
            color: #f59e0b;
            margin-top: 6px;
          }
          .evaluator {
            background: #eef2ff;
            border: 1px solid #dbe4f5;
            padding: 9px 12px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            color: #1e3a8a;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .metric-card h3 {
            margin: 0 0 10px;
            font-size: 14px;
            color: #1e3a8a;
          }
          .metric-row {
            margin-bottom: 9px;
          }
          .metric-row:last-child {
            margin-bottom: 0;
          }
          .metric-top {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 4px;
            font-size: 12px;
          }
          .metric-label {
            color: #334155;
            font-weight: 600;
          }
          .metric-value {
            color: #1f2937;
            font-weight: 700;
          }
          .metric-track {
            height: 8px;
            border-radius: 999px;
            background: #e2e8f0;
            overflow: hidden;
          }
          .metric-fill {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          }
          .feedback-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }
          .feedback-grid h4 {
            margin: 0 0 8px;
            color: #1f2937;
            font-size: 14px;
          }
          .feedback-grid p,
          .feedback-grid li {
            margin: 0;
            color: #374151;
            font-size: 12px;
            line-height: 1.45;
          }
          .bullet-list {
            margin: 0;
            padding-left: 16px;
          }
          .muted {
            color: #64748b !important;
            font-style: italic;
          }
          .recommendation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .badge {
            padding: 9px 14px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 13px;
            border: 1px solid transparent;
          }
          .badge-high {
            background: #dcfce7;
            color: #166534;
            border-color: #86efac;
          }
          .badge-good {
            background: #dbeafe;
            color: #1d4ed8;
            border-color: #93c5fd;
          }
          .badge-mid {
            background: #fef3c7;
            color: #92400e;
            border-color: #fcd34d;
          }
          .badge-low {
            background: #fee2e2;
            color: #b91c1c;
            border-color: #fca5a5;
          }
        </style>

        <section class="header">
          <div class="brand">
            ${logoMarkup}
            <div>
              <div style="font-size:15px; font-weight:700;">${escapeHtml(companyName)}</div>
              <div style="font-size:12px; opacity:0.92;">Evaluation Summary</div>
            </div>
          </div>
          <div class="title-wrap" style="text-align:right;">
            <h1>Internship Feedback Report</h1>
            <div class="subtitle">Generated for ${escapeHtml(studentName)}</div>
            <div class="meta">Generated on ${escapeHtml(reportDate)}</div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Student Information</h2>
          <div class="card student-grid">
            <div class="field"><span class="label">Student Name</span><span class="value">${escapeHtml(studentName)}</span></div>
            <div class="field"><span class="label">Email</span><span class="value">${escapeHtml(profile.email || "N/A")}</span></div>
            <div class="field"><span class="label">Project</span><span class="value">${escapeHtml(companyFeedback?.projectTitle || "N/A")}</span></div>
            <div class="field"><span class="label">Internship Duration</span><span class="value">${escapeHtml(companyFeedback?.duration || profile.duration || "N/A")}</span></div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Overall Performance</h2>
          <div class="card overall">
            <div>
              <div class="overall-score">
                <span class="score">${overallRating.toFixed(1)}</span>
                <span class="outof">/ 5</span>
              </div>
              <div class="stars">${stars}</div>
            </div>
            <div class="evaluator">Evaluator: ${escapeHtml(evaluatorName)}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Performance Metrics</h2>
          <div class="metrics-grid">
            ${metricGroupsMarkup}
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Detailed Feedback</h2>
          <div class="feedback-grid">
            <div class="card">
              <h4>Strengths</h4>
              ${strengthsMarkup}
            </div>
            <div class="card">
              <h4>Areas for Growth</h4>
              ${improvementsMarkup}
            </div>
            <div class="card">
              <h4>Overall Comments</h4>
              ${commentsMarkup}
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Final Recommendation</h2>
          <div class="card recommendation">
            <div style="font-size:13px; color:#334155;">Recommendation from company evaluator</div>
            <div class="badge ${getRecommendationBadgeClass(recommendation)}">${escapeHtml(recommendation)}</div>
          </div>
        </section>
      </div>
    `;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.zIndex = "-1";
    container.innerHTML = html;
    document.body.appendChild(container);

    const reportElement = container.firstElementChild as HTMLElement | null;
    if (!reportElement) {
      container.remove();
      return;
    }

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f3f5fb",
      windowWidth: 900,
    });

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const mmPerPx = pageWidth / canvas.width;
    const footerHeightMm = 12;
    const contentHeightMm = pageHeight - footerHeightMm;
    const contentHeightPx = Math.floor(contentHeightMm / mmPerPx);

    const reportScale = canvas.width / reportElement.scrollWidth;
    const metricCards = Array.from(reportElement.querySelectorAll(".metric-card")) as HTMLElement[];
    const forcedBreakStartPx = metricCards.length >= 2
      ? Math.round(Math.min(metricCards[metricCards.length - 2].offsetTop, metricCards[metricCards.length - 1].offsetTop) * reportScale)
      : null;

    const pageSlices: Array<{ startPx: number; heightPx: number }> = [];
    let yOffsetPx = 0;

    while (yOffsetPx < canvas.height) {
      let sliceEndPx = Math.min(yOffsetPx + contentHeightPx, canvas.height);

      // Keep the last metric row (Teamwork + Learning & Growth) together on the next page.
      if (forcedBreakStartPx !== null && yOffsetPx < forcedBreakStartPx && sliceEndPx > forcedBreakStartPx) {
        sliceEndPx = forcedBreakStartPx;
      }

      if (sliceEndPx <= yOffsetPx) {
        sliceEndPx = Math.min(yOffsetPx + contentHeightPx, canvas.height);
      }

      pageSlices.push({
        startPx: yOffsetPx,
        heightPx: sliceEndPx - yOffsetPx,
      });

      yOffsetPx = sliceEndPx;
    }

    const totalPages = pageSlices.length;
    pageSlices.forEach((slice, pageIndex) => {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = slice.heightPx;

      const pageContext = pageCanvas.getContext("2d");
      if (!pageContext) {
        return;
      }

      pageContext.drawImage(
        canvas,
        0,
        slice.startPx,
        canvas.width,
        slice.heightPx,
        0,
        0,
        canvas.width,
        slice.heightPx
      );

      if (pageIndex > 0) {
        doc.addPage();
      }

      const sliceHeightMm = slice.heightPx * mmPerPx;
      const imageData = pageCanvas.toDataURL("image/png", 1.0);
      doc.addImage(imageData, "PNG", 0, 0, pageWidth, sliceHeightMm, undefined, "MEDIUM");

      const footerTopY = pageHeight - footerHeightMm + 2;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.25);
      doc.line(10, footerTopY, pageWidth - 10, footerTopY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Internship Feedback System | MoviCloud Labs", 10, pageHeight - 4);
      doc.text(`Page ${pageIndex + 1} of ${totalPages}`, pageWidth - 10, pageHeight - 4, { align: "right" });
    });

    container.remove();

    doc.save(`company-feedback-${profile.email}.pdf`);
  };

  const downloadProfileSummaryPdf = async () => {
    if (!profile) {
      return;
    }

    const skills = profile.skills ?? [];
    const tasks = profile.tasks ?? [];

    const reportDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const logoDataUrl = await getCircularLogoDataUrl();
    const circularProfilePhoto = profile.profilePhoto
      ? await getCircularPhotoDataUrl(profile.profilePhoto)
      : null;
    const studentInitials = profile.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const logoMarkup = logoDataUrl
      ? `<img class="brand-logo" src="${logoDataUrl}" alt="Company logo" />`
      : `<div class="brand-logo brand-fallback">MC</div>`;
    const profilePhotoMarkup = circularProfilePhoto
      ? `<img class="student-photo" src="${circularProfilePhoto}" alt="Student photo" />`
      : `<div class="student-photo student-fallback">${escapeHtml(studentInitials || "ST")}</div>`;

    const skillChipsMarkup =
      skills.length > 0
        ? skills
            .map((skill) => `<span class="skill-chip">${escapeHtml(skill)}</span>`)
            .join("")
        : `<span class="empty-text">No skills added yet.</span>`;

    const timelineMarkup =
      tasks.length > 0
        ? tasks
            .map((task, index) => {
              const timelineText = profile.startDate && profile.endDate
                ? `${profile.startDate} - ${profile.endDate}`
                : profile.duration || "Timeline not specified";
              return `
                <article class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">${index + 1}. ${escapeHtml(task.title || "Untitled Task")}</div>
                    <div class="timeline-desc">${escapeHtml(task.description || "No description provided").replace(/\n/g, "<br />")}</div>
                    <div class="timeline-range">${escapeHtml(timelineText)}</div>
                  </div>
                </article>
              `;
            })
            .join("")
        : `
            <article class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-title">No tasks added yet</div>
                <div class="timeline-desc">Project task timeline is currently unavailable for this profile.</div>
                <div class="timeline-range">N/A</div>
              </div>
            </article>
          `;

    const html = `
      <div class="profile-report-shell">
        <style>
          .profile-report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            color: #1f2937;
            background: #f4f6ff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
            background: linear-gradient(120deg, #2c49c8, #6a46db);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.35);
            background: #ffffff;
            object-fit: cover;
          }
          .brand-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .header h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
          }
          .header .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .header .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.88;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dde4f5;
            border-radius: 14px;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(45, 71, 145, 0.06);
          }
          .divider {
            margin-top: 16px;
            border: none;
            border-top: 1px solid #dde4f5;
          }
          .section-title {
            margin: 0 0 10px;
            color: #2b4fc8;
            font-size: 16px;
            font-weight: 700;
          }
          .section-title .icon {
            margin-right: 6px;
          }
          .profile-hero {
            display: grid;
            grid-template-columns: 96px 1fr;
            align-items: center;
            gap: 14px;
            background: linear-gradient(180deg, #f8faff, #eef3ff);
          }
          .student-photo {
            width: 88px;
            height: 88px;
            border-radius: 999px;
            border: 2px solid #c7d3f8;
            object-fit: cover;
            background: #ffffff;
          }
          .student-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: 800;
            color: #365bcf;
          }
          .hero-name {
            font-size: 27px;
            font-weight: 800;
            color: #1e3a8a;
            line-height: 1.2;
          }
          .hero-role {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 700;
            color: #4338ca;
          }
          .hero-meta {
            margin-top: 4px;
            font-size: 13px;
            color: #475569;
          }
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .details-column {
            display: grid;
            gap: 8px;
          }
          .detail-item {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .detail-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 3px;
          }
          .detail-value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
          }
          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-chip {
            background: linear-gradient(120deg, #e1e9ff, #ece6ff);
            color: #2f4cb7;
            border: 1px solid #cfdbff;
            border-radius: 999px;
            padding: 6px 11px;
            font-size: 12px;
            font-weight: 700;
          }
          .empty-text {
            color: #64748b;
            font-style: italic;
            font-size: 12px;
          }
          .timeline {
            position: relative;
            padding-left: 18px;
          }
          .timeline::before {
            content: "";
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: 6px;
            width: 2px;
            background: #dbe4ff;
          }
          .timeline-item {
            position: relative;
            margin-bottom: 11px;
          }
          .timeline-item:last-child {
            margin-bottom: 0;
          }
          .timeline-dot {
            position: absolute;
            left: -16px;
            top: 8px;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: linear-gradient(120deg, #3b82f6, #8b5cf6);
            border: 2px solid #f4f6ff;
          }
          .timeline-content {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 10px;
          }
          .timeline-title {
            font-size: 13px;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 5px;
          }
          .timeline-desc {
            font-size: 12px;
            color: #334155;
            line-height: 1.45;
            margin-bottom: 6px;
          }
          .timeline-range {
            display: inline-block;
            font-size: 11px;
            color: #4338ca;
            background: #eef2ff;
            border: 1px solid #dbe4ff;
            border-radius: 999px;
            padding: 4px 8px;
            font-weight: 700;
          }
        </style>

        <section class="header">
          <div class="brand-wrap">
            ${logoMarkup}
            <div>
              <div style="font-size:15px; font-weight:700;">MoviCloud Labs</div>
              <div style="font-size:12px; opacity:0.92;">Student Portfolio Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Internship Profile Report</h1>
            <div class="subtitle">Generated for ${escapeHtml(profile.name)}</div>
            <div class="meta">Generated on ${escapeHtml(reportDate)}</div>
          </div>
        </section>

        <section class="section">
          <div class="card profile-hero">
            ${profilePhotoMarkup}
            <div>
              <div class="hero-name">${escapeHtml(profile.name)}</div>
              <div class="hero-role">${escapeHtml(profile.Role || "Intern")}</div>
              <div class="hero-meta">${escapeHtml(profile.COLLEGE || "Institution not specified")}</div>
              <div class="hero-meta">${escapeHtml(profile.email || "Email not available")}</div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">▦</span>Personal & Internship Details</h2>
          <div class="card details-grid">
            <div class="details-column">
              <div class="detail-item"><div class="detail-label">Full Name</div><div class="detail-value">${escapeHtml(profile.name || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${escapeHtml(profile.email || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Phone</div><div class="detail-value">${escapeHtml(profile.phone || "N/A")}</div></div>
            </div>
            <div class="details-column">
              <div class="detail-item"><div class="detail-label">Role</div><div class="detail-value">${escapeHtml(profile.Role || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">College</div><div class="detail-value">${escapeHtml(profile.COLLEGE || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value">${escapeHtml(profile.status || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Duration</div><div class="detail-value">${escapeHtml(profile.duration || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Start Date</div><div class="detail-value">${escapeHtml(profile.startDate || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">End Date</div><div class="detail-value">${escapeHtml(profile.endDate || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Supervisor</div><div class="detail-value">${escapeHtml(profile.supervisor || "N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Supervisor Email</div><div class="detail-value">${escapeHtml(profile.supervisorEmail || "N/A")}</div></div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">◉</span>Skills</h2>
          <div class="card">
            <div class="skills-wrap">${skillChipsMarkup}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">⟡</span>Task / Project Timeline</h2>
          <div class="card timeline">
            ${timelineMarkup}
          </div>
        </section>
      </div>
    `;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.zIndex = "-1";
    container.innerHTML = html;
    document.body.appendChild(container);

    const reportElement = container.firstElementChild as HTMLElement | null;
    if (!reportElement) {
      container.remove();
      return;
    }

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f4f6ff",
      windowWidth: 900,
    });

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const mmPerPx = pageWidth / canvas.width;
    const footerHeightMm = 12;
    const contentHeightMm = pageHeight - footerHeightMm;
    const contentHeightPx = Math.floor(contentHeightMm / mmPerPx);

    const pageSlices: Array<{ startPx: number; heightPx: number }> = [];
    let yOffsetPx = 0;

    while (yOffsetPx < canvas.height) {
      const sliceEndPx = Math.min(yOffsetPx + contentHeightPx, canvas.height);
      pageSlices.push({
        startPx: yOffsetPx,
        heightPx: sliceEndPx - yOffsetPx,
      });
      yOffsetPx = sliceEndPx;
    }

    const totalPages = pageSlices.length;
    pageSlices.forEach((slice, pageIndex) => {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = slice.heightPx;

      const pageContext = pageCanvas.getContext("2d");
      if (!pageContext) {
        return;
      }

      pageContext.drawImage(
        canvas,
        0,
        slice.startPx,
        canvas.width,
        slice.heightPx,
        0,
        0,
        canvas.width,
        slice.heightPx
      );

      if (pageIndex > 0) {
        doc.addPage();
      }

      const sliceHeightMm = slice.heightPx * mmPerPx;
      const imageData = pageCanvas.toDataURL("image/png", 1.0);
      doc.addImage(imageData, "PNG", 0, 0, pageWidth, sliceHeightMm, undefined, "MEDIUM");

      const footerTopY = pageHeight - footerHeightMm + 2;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.25);
      doc.line(10, footerTopY, pageWidth - 10, footerTopY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Internship Feedback System | Student Profile Report", 10, pageHeight - 4);
      doc.text(`Page ${pageIndex + 1} of ${totalPages}`, pageWidth - 10, pageHeight - 4, { align: "right" });
    });

    container.remove();

    doc.save(`student-profile-${profile.email}.pdf`);
  };

  const downloadStudentFeedbackPdf = async () => {
    if (!profile) {
      return;
    }

    const reportDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const logoDataUrl = await getCircularLogoDataUrl();
    const companyName = studentFeedback?.companyName || "MoviCloud Labs";
    const structuredSections = buildStudentFeedbackSections(studentFeedback);

    const logoMarkup = logoDataUrl
      ? `<img class="brand-logo" src="${logoDataUrl}" alt="Company logo" />`
      : `<div class="brand-logo brand-fallback">MC</div>`;

    const sectionMarkup = structuredSections
      .map((section) => {
        const questionsMarkup = section.questions
          .map((question) => {
            const value = question.value;
            let answerMarkup = `<span class="answer-empty">N/A</span>`;

            if (question.type === "rating" && typeof value === "number") {
              answerMarkup = renderRatingMarkup(value);
            } else if (question.type === "boolean" && typeof value === "boolean") {
              answerMarkup = `<span class="answer-badge ${value ? "badge-yes" : "badge-no"}">${value ? "Yes" : "No"}</span>`;
            } else if (question.type === "enum" && typeof value === "string" && value.trim()) {
              answerMarkup = `<span class="answer-badge badge-enum">${escapeHtml(formatEnumValue(value))}</span>`;
            } else if (question.type === "text" && typeof value === "string" && value.trim()) {
              answerMarkup = `<div class="answer-text">${escapeHtml(value).replace(/\n/g, "<br />")}</div>`;
            }

            return `
              <div class="qa-row">
                <div class="qa-label">${escapeHtml(question.label)}</div>
                <div class="qa-answer">${answerMarkup}</div>
              </div>
            `;
          })
          .join("");

        // Page layout: Page 1 → S1+S2 | Page 2 → S3+S4+S5 | Page 3 → S6+S7+S8
        const startsNewPage =
          section.title.startsWith("Section 3") ||
          section.title.startsWith("Section 6");
        const pageBreakStyle = startsNewPage
          ? ` style="break-before:page; page-break-before:always;"`
          : "";

        return `
          <section class="feedback-section card"${pageBreakStyle}>
            <h3>${escapeHtml(section.title)}</h3>
            <div class="section-divider"></div>
            <div class="qa-list">${questionsMarkup}</div>
          </section>
        `;
      })
      .join("");

    const html = `
      <div class="student-feedback-report-shell">
        <style>
          .student-feedback-report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            color: #1f2937;
            background: #f8faff;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            background: linear-gradient(120deg, #2c49c8, #6a46db);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.35);
            background: #ffffff;
            object-fit: cover;
          }
          .brand-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .header h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
          }
          .header .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .header .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.88;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dde4f5;
            border-radius: 14px;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(45, 71, 145, 0.06);
          }
          .student-info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }
          .info-item {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .info-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 3px;
          }
          .info-value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
          }
          .feedback-sections {
            margin-top: 18px;
          }
          .feedback-section {
            margin-top: 24px;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .feedback-section:first-child {
            margin-top: 0;
          }
          .feedback-section h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #1e3a8a;
          }
          .section-divider {
            border-top: 1px solid #dde4f5;
            margin: 10px 0 2px;
          }
          .qa-list {
            margin-top: 6px;
          }
          .qa-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 11px 0;
            border-bottom: 1px solid #eef2ff;
            align-items: start;
          }
          .qa-row:last-child {
            border-bottom: none;
          }
          .qa-label {
            color: #334155;
            font-size: 13px;
            font-weight: 600;
          }
          .qa-answer {
            color: #0f172a;
            font-size: 13px;
            font-weight: 600;
          }
          .answer-rating {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .answer-stars {
            letter-spacing: 2px;
            color: #f59e0b;
            font-size: 14px;
          }
          .answer-rating-number {
            color: #1f2937;
            font-weight: 700;
            font-size: 12px;
          }
          .answer-badge {
            display: inline-block;
            border-radius: 999px;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid transparent;
          }
          .badge-yes {
            background: #dcfce7;
            color: #166534;
            border-color: #86efac;
          }
          .badge-no {
            background: #fee2e2;
            color: #b91c1c;
            border-color: #fca5a5;
          }
          .badge-enum {
            background: #eef2ff;
            color: #4338ca;
            border-color: #c7d2fe;
          }
          .answer-text {
            color: #1f2937;
            line-height: 1.5;
            font-weight: 500;
          }
          .answer-empty {
            color: #64748b;
            font-style: italic;
            font-weight: 500;
          }
        </style>

        <section class="header">
          <div class="brand-wrap">
            ${logoMarkup}
            <div>
              <div style="font-size:15px; font-weight:700;">${escapeHtml(companyName)}</div>
              <div style="font-size:12px; opacity:0.92;">Student Evaluation Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Student Feedback Report</h1>
            <div class="subtitle">Generated for ${escapeHtml(profile.name)}</div>
            <div class="meta">Generated on ${escapeHtml(reportDate)}</div>
          </div>
        </section>

        <section class="section card">
          <h2 style="margin:0 0 10px; color:#2b4fc8; font-size:16px; font-weight:700;">Student Information</h2>
          <div class="student-info-grid">
            <div class="info-item"><div class="info-label">Student Name</div><div class="info-value">${escapeHtml(profile.name || "N/A")}</div></div>
            <div class="info-item"><div class="info-label">Email</div><div class="info-value">${escapeHtml(profile.email || "N/A")}</div></div>
            <div class="info-item"><div class="info-label">Company</div><div class="info-value">${escapeHtml(companyName)}</div></div>
          </div>
        </section>

        <div class="feedback-sections">
          ${sectionMarkup}
        </div>
      </div>
    `;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.zIndex = "-1";
    container.innerHTML = html;
    document.body.appendChild(container);

    const reportElement = container.firstElementChild as HTMLElement | null;
    if (!reportElement) {
      container.remove();
      return;
    }

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f8faff",
      windowWidth: 900,
    });

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const mmPerPx = pageWidth / canvas.width;
    const footerHeightMm = 12;
    const contentHeightMm = pageHeight - footerHeightMm;
    const contentHeightPx = Math.floor(contentHeightMm / mmPerPx);

    const reportScale = canvas.width / reportElement.scrollWidth;
    const sectionElements = Array.from(reportElement.querySelectorAll(".feedback-section")) as HTMLElement[];

    // Forced page-break indices: Section 3 (index 2) starts page 2,
    // Section 6 (index 5) starts page 3.
    const forcedBreakIndices = [2, 5];
    const forcedBreakpointsPx = forcedBreakIndices
      .filter((i) => i < sectionElements.length)
      .map((i) => Math.round(sectionElements[i].offsetTop * reportScale));

    // Build page slices by cutting at the forced breakpoints
    const allCuts = [0, ...forcedBreakpointsPx, canvas.height];
    const pageSlices: Array<{ startPx: number; heightPx: number }> = [];
    for (let i = 0; i < allCuts.length - 1; i++) {
      const startPx = allCuts[i];
      const endPx = allCuts[i + 1];
      if (endPx > startPx) {
        pageSlices.push({ startPx, heightPx: endPx - startPx });
      }
    }

    const totalPages = pageSlices.length;
    pageSlices.forEach((slice, pageIndex) => {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = slice.heightPx;

      const pageContext = pageCanvas.getContext("2d");
      if (!pageContext) {
        return;
      }

      pageContext.drawImage(
        canvas,
        0,
        slice.startPx,
        canvas.width,
        slice.heightPx,
        0,
        0,
        canvas.width,
        slice.heightPx,
      );

      if (pageIndex > 0) {
        doc.addPage();
      }

      const imageData = pageCanvas.toDataURL("image/png", 1.0);
      const sliceHeightMm = slice.heightPx * mmPerPx;
      doc.addImage(imageData, "PNG", 0, 0, pageWidth, sliceHeightMm, undefined, "MEDIUM");

      const footerTopY = pageHeight - footerHeightMm + 2;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.25);
      doc.line(10, footerTopY, pageWidth - 10, footerTopY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Generated by Internship Feedback System", 10, pageHeight - 4);
      doc.text(reportDate, pageWidth / 2, pageHeight - 4, { align: "center" });
      doc.text(`Page ${pageIndex + 1} of ${totalPages}`, pageWidth - 10, pageHeight - 4, { align: "right" });
    });

    container.remove();

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

  const isAnyDownloadInProgress = isDownloadingAll || activeDownloadFileName !== null;

  const handleDownloadItem = async (item: DownloadItem) => {
    if (isAnyDownloadInProgress) {
      return;
    }

    setActiveDownloadFileName(item.fileName);
    try {
      await item.onDownload();
    } finally {
      setActiveDownloadFileName(null);
    }
  };

  const handleDownloadAll = async () => {
    if (isAnyDownloadInProgress || downloadItems.length === 0) {
      return;
    }

    setIsDownloadingAll(true);
    try {
      for (const item of downloadItems) {
        setActiveDownloadFileName(item.fileName);
        await item.onDownload();
      }
    } finally {
      setActiveDownloadFileName(null);
      setIsDownloadingAll(false);
    }
  };

  if (isLoading) {
    return <LoadingAnimation title="Loading downloads" description="Fetching your reports and feedback data..." />;
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 rounded-xl ${colors.bg} text-white shadow-lg ${colors.shadow}`}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
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
                  <Button
                    className="flex w-full sm:w-auto items-center justify-center gap-2 shadow-md"
                    size="lg"
                    onClick={() => {
                      void handleDownloadItem(item);
                    }}
                    disabled={isAnyDownloadInProgress}
                  >
                    {activeDownloadFileName === item.fileName ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {activeDownloadFileName === item.fileName ? "Generating..." : "Download"}
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
              void handleDownloadAll();
            }}
            disabled={downloadItems.length === 0 || isAnyDownloadInProgress}
          >
            {isDownloadingAll ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isDownloadingAll ? "Generating Files..." : "Download All Files"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
