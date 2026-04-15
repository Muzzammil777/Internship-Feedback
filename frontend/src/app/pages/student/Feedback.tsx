import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  Building2,
  CheckCircle2,
  MessageSquare,
  Send,
  TrendingUp,
} from "lucide-react";

import StarRating from "../../components/shared/StarRating";
import RatingBar from "../../components/shared/RatingBar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useAuth } from "../../context/AuthContext";

interface StudentProfile {
  id: string;
  company_name?: string;
  companyName?: string;
  supervisor?: string;
  role_title?: string;
  Role?: string;
}

interface CompanyFeedback {
  overallRating?: number;
  ratings?: Record<string, number>;
  strengths?: string;
  improvements?: string;
  comments?: string;
  recommendation?: string;
}

type QuestionType = "rating" | "boolean" | "enum" | "text";
type QuestionValue = number | boolean | string;

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

interface SubmittedQuestion {
  questionId: string;
  label: string;
  type: QuestionType;
  value: QuestionValue;
}

interface SubmittedSection {
  sectionId: string;
  title: string;
  questions: SubmittedQuestion[];
}

interface StudentFeedbackRecord {
  sections?: SubmittedSection[];
  department?: string;
  learningExperience?: number;
  mentorship?: number;
  workEnvironment?: number;
  communication?: number;
  strengths?: string;
  improvements?: string;
  overallComments?: string;
}

const sections: Section[] = [
  {
    id: "internship_experience",
    title: "Section 1: Internship Experience",
    questions: [
      { id: "overallInternshipExperience", label: "How would you rate your overall internship experience?", type: "rating", required: true },
      { id: "relevanceToStudy", label: "How relevant was the internship to your field of study?", type: "rating", required: true },
      { id: "learningOutcomesSatisfaction", label: "How satisfied are you with the learning outcomes?", type: "rating", required: true },
      { id: "onboardingProcess", label: "How would you rate the onboarding process?", type: "rating", required: true },
      { id: "teamMentorSupport", label: "How supportive was the team/mentor?", type: "rating", required: true },
    ],
  },
  {
    id: "learning_development",
    title: "Section 2: Learning and Development",
    questions: [
      { id: "practicalKnowledge", label: "Did you gain practical knowledge during the internship?", type: "boolean", required: true },
      { id: "newSkillsLearned", label: "What new skills did you learn?", type: "text", required: true },
      { id: "confidenceApplyingSkills", label: "How confident do you feel applying these skills?", type: "rating", required: true },
      { id: "realTimeProjects", label: "Were you given opportunities to work on real-time projects?", type: "boolean", required: true },
    ],
  },
  {
    id: "mentorship_support",
    title: "Section 3: Mentorship and Support",
    questions: [
      { id: "mentorGuidance", label: "How would you rate your mentor's guidance?", type: "rating", required: true },
      { id: "feedbackRegular", label: "Was feedback provided regularly?", type: "boolean", required: true },
      { id: "communicationClear", label: "Was communication clear and effective?", type: "rating", required: true },
      { id: "comfortableAskingQuestions", label: "Did you feel comfortable asking questions?", type: "boolean", required: true },
    ],
  },
  {
    id: "work_environment",
    title: "Section 4: Work Environment",
    questions: [
      { id: "workCulture", label: "How would you rate the work culture?", type: "rating", required: true },
      { id: "tasksClearlyAssigned", label: "Were tasks clearly assigned?", type: "boolean", required: true },
      { id: "workloadManageable", label: "Was the workload manageable?", type: "rating", required: true },
      { id: "metExpectations", label: "Did the internship meet your expectations?", type: "boolean", required: true },
    ],
  },
  {
    id: "project_feedback",
    title: "Section 5: Project Feedback",
    questions: [
      { id: "requirementsExplained", label: "Were project requirements clearly explained?", type: "boolean", required: true },
      { id: "projectChallengeLevel", label: "How challenging was your project?", type: "enum", required: true, options: ["easy", "moderate", "difficult"] },
      { id: "projectImprovedSkills", label: "Did the project help improve your skills?", type: "boolean", required: true },
      { id: "projectExperienceRating", label: "Rate your project experience.", type: "rating", required: true },
    ],
  },
  {
    id: "overall_satisfaction",
    title: "Section 6: Overall Satisfaction",
    questions: [
      { id: "recommendToOthers", label: "Would you recommend this internship to others?", type: "boolean", required: true },
      { id: "interestedFutureOpportunities", label: "Are you interested in future opportunities with us?", type: "boolean", required: true },
      { id: "overallSatisfaction", label: "Rate your overall satisfaction.", type: "rating", required: true },
    ],
  },
  {
    id: "suggestions_feedback",
    title: "Section 7: Suggestions and Feedback",
    questions: [
      { id: "likedMost", label: "What did you like most about the internship?", type: "text", required: true },
      { id: "challengesFaced", label: "What challenges did you face?", type: "text", required: true },
      { id: "improvementsSuggested", label: "What improvements would you suggest?", type: "text", required: true },
      { id: "additionalComments", label: "Any additional comments?", type: "text", required: false },
    ],
  },
  {
    id: "assessment_policy",
    title: "Section 8: Assessment Policy",
    questions: [
      { id: "durationSufficient", label: "Do you feel the internship duration was sufficient for learning?", type: "boolean", required: true },
      { id: "stipendFair", label: "Do you think performance-based stipend after 3 months is fair?", type: "boolean", required: true },
      { id: "continueWithStipend", label: "Would you continue if offered a stipend after evaluation?", type: "boolean", required: true },
    ],
  },
];

function flattenSaved(sectionsData: SubmittedSection[]): Record<string, QuestionValue> {
  const data: Record<string, QuestionValue> = {};
  for (const section of sectionsData) {
    for (const question of section.questions) {
      data[question.questionId] = question.value;
    }
  }
  return data;
}

function formatMetricLabel(metricKey: string): string {
  return metricKey.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (v) => v.toUpperCase());
}

const SYSTEM_META_MARKER = "[SYSTEM_META]";

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

export default function StudentFeedback() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"company" | "student">("company");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedback | null>(null);
  const [answers, setAnswers] = useState<Record<string, QuestionValue>>({});
  const [department, setDepartment] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;

      let profileDepartment = "";
      const profileRes = await fetch(`${apiBaseUrl}/students/profile/${user.email}`);
      let studentId = "";
      if (profileRes.ok) {
        const profileData = (await profileRes.json()) as StudentProfile;
        setProfile(profileData);
        studentId = profileData.id;
        profileDepartment = profileData.role_title || profileData.Role || "";
        setDepartment(profileDepartment);
      }

      if (studentId) {
        const companyRes = await fetch(`${apiBaseUrl}/feedback/company?student_id=${encodeURIComponent(studentId)}`);
        if (companyRes.ok) {
          const list = (await companyRes.json()) as CompanyFeedback[];
          setCompanyFeedback(list[0] ?? null);
        }
      }

      const ownRes = await fetch(`${apiBaseUrl}/feedback/student?student_email=${encodeURIComponent(user.email)}`);
      if (ownRes.ok) {
        const list = (await ownRes.json()) as StudentFeedbackRecord[];
        if (list.length > 0) {
          const latest = list[0];
          setDepartment(latest.department || profileDepartment || "");
          if (latest.sections) {
            setAnswers(flattenSaved(latest.sections));
          } else {
            setAnswers({
              overallInternshipExperience: latest.learningExperience ?? 0,
              mentorGuidance: latest.mentorship ?? 0,
              workCulture: latest.workEnvironment ?? 0,
              communicationClear: latest.communication ?? 0,
              likedMost: latest.strengths ?? "",
              improvementsSuggested: latest.improvements ?? "",
              additionalComments: latest.overallComments ?? "",
            });
          }
          setIsSubmitted(true);
        }
      }
    };

    void load();
  }, [apiBaseUrl, user?.email]);

  const average = useMemo(() => {
    const ratingIds = sections.flatMap((section) =>
      section.questions.filter((question) => question.type === "rating").map((question) => question.id),
    );
    const values = ratingIds
      .map((id) => answers[id])
      .filter((value): value is number => typeof value === "number" && value > 0);
    if (!values.length) return null;
    return Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2));
  }, [answers]);

  const companyComments = stripSystemMetaComment(companyFeedback?.comments);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const missing = sections
      .flatMap((section) => section.questions.filter((question) => question.required))
      .find((question) => {
        const value = answers[question.id];
        if (question.type === "rating") return typeof value !== "number" || value < 1;
        if (question.type === "boolean") return typeof value !== "boolean";
        if (question.type === "enum") return typeof value !== "string" || !value.trim();
        return typeof value !== "string" || !value.trim();
      });

    if (missing) {
      setError(`Please answer: ${missing.label}`);
      setIsSaving(false);
      return;
    }

    if (!department.trim()) {
      setError("Please enter your department.");
      setIsSaving(false);
      return;
    }

    try {
      const payload: SubmittedSection[] = sections.map((section) => ({
        sectionId: section.id,
        title: section.title,
        questions: section.questions.map((question) => ({
          questionId: question.id,
          label: question.label,
          type: question.type,
          value: answers[question.id] ?? "",
        })),
      }));

      const response = await fetch(`${apiBaseUrl}/feedback/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail: user?.email ?? "",
          studentName: user?.name ?? "Student",
          department: department.trim(),
          companyName: profile?.company_name || profile?.companyName || "Organization",
          sections: payload,
          strengths: typeof answers.likedMost === "string" ? answers.likedMost : "",
          improvements: typeof answers.improvementsSuggested === "string" ? answers.improvementsSuggested : "",
          overallComments: typeof answers.additionalComments === "string" ? answers.additionalComments : "",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setIsSubmitted(true);
    } catch {
      setError("Could not save your feedback right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderControl = (question: Question) => {
    const value = answers[question.id];

    if (question.type === "rating") {
      return (
        <StarRating
          value={typeof value === "number" ? value : 0}
          onChange={(v) => setAnswers((s) => ({ ...s, [question.id]: v }))}
          readonly={isSubmitted}
          size="md"
        />
      );
    }

    if (question.type === "boolean") {
      return (
        <div className="flex gap-2">
          <Button
            type="button"
            variant={value === true ? "default" : "outline"}
            onClick={() => setAnswers((s) => ({ ...s, [question.id]: true }))}
            disabled={isSubmitted}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant={value === false ? "default" : "outline"}
            onClick={() => setAnswers((s) => ({ ...s, [question.id]: false }))}
            disabled={isSubmitted}
          >
            No
          </Button>
        </div>
      );
    }

    if (question.type === "enum") {
      return (
        <div className="flex gap-2 flex-wrap">
          {(question.options ?? []).map((option) => (
            <Button
              key={option}
              type="button"
              variant={value === option ? "default" : "outline"}
              onClick={() => setAnswers((s) => ({ ...s, [question.id]: option }))}
              disabled={isSubmitted}
            >
              {option}
            </Button>
          ))}
        </div>
      );
    }

    return (
      <Textarea
        value={typeof value === "string" ? value : ""}
        onChange={(e) => setAnswers((s) => ({ ...s, [question.id]: e.target.value }))}
        rows={3}
        disabled={isSubmitted}
      />
    );
  };

  return (
    <div className="min-h-full bg-background">
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Feedback</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">Internship Feedback</h1>
            <p className="text-muted-foreground text-lg">View company evaluation and share your internship experience</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <div className="bg-card border border-border rounded-2xl p-2 shadow-md inline-flex gap-2">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "company"
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Feedback
              </div>
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Feedback
              </div>
            </button>
          </div>
        </motion.div>

        {activeTab === "company" && (
          <motion.div
            key="company-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/30">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Company Evaluation</h2>
                  <p className="text-sm text-muted-foreground mt-1">{profile?.company_name || profile?.companyName || "Organization"}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold uppercase tracking-wide border border-blue-200">
                Read Only
              </div>
            </div>

            <div className="mb-10 pb-8 border-b border-border">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Overall Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluated by {profile?.supervisor || "Supervisor"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StarRating value={companyFeedback?.overallRating ?? 0} readonly size="lg" />
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                        {(companyFeedback?.overallRating ?? 0).toFixed(1)}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {companyFeedback ? "From company evaluation" : "No rating yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-foreground mb-6">Performance Metrics</h3>
              {companyFeedback?.ratings && Object.keys(companyFeedback.ratings).length > 0 ? (
                <div className="space-y-5">
                  {Object.entries(companyFeedback.ratings).map(([key, value]) => (
                    <RatingBar key={key} label={formatMetricLabel(key)} value={value} color="primary" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No metric ratings submitted yet.</p>
              )}
            </div>

            <div className="space-y-5 mb-8">
              <h3 className="text-lg font-bold text-foreground">Detailed Feedback</h3>

              <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Strengths</h3>
                </div>
                <p className="text-foreground leading-relaxed">{companyFeedback?.strengths || "No strengths shared yet."}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-md">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Areas for Growth</h3>
                </div>
                <p className="text-foreground leading-relaxed">{companyFeedback?.improvements || "No growth areas shared yet."}</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Overall Comments</h3>
                </div>
                <p className="text-foreground leading-relaxed">{companyComments || "Awaiting overall comments from supervisor."}</p>
              </motion.div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Hiring Recommendation</h3>
                    <p className="text-sm text-muted-foreground">Would you hire this intern for a full-time position?</p>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/40">
                    <CheckCircle2 className="w-5 h-5" />
                    {companyFeedback?.recommendation || "Pending"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "student" && (
          <motion.div
            key="student-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Feedback About Company</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your internship experience at {profile?.company_name || profile?.companyName || "your organization"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-sky-100 text-sky-800 rounded-xl text-xs font-bold uppercase tracking-wide border border-sky-200">
                  Average: {average === null ? "0.00" : average.toFixed(2)} / 5
                </div>
                {isSubmitted && (
                  <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wide border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Submitted
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                <Label className="font-semibold">Department *</Label>
                <Input
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  disabled={isSubmitted}
                  placeholder="Enter your department"
                />
              </div>

              {sections.map((section) => (
                <div key={section.id} className="border border-border rounded-xl p-4 sm:p-5 space-y-4 bg-muted/10">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  {section.questions.map((question) => (
                    <div key={question.id} className="space-y-2">
                      <Label>
                        {question.label}
                        {question.required ? " *" : ""}
                      </Label>
                      {renderControl(question)}
                    </div>
                  ))}
                </div>
              ))}

              {!isSubmitted && (
                <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Submit Feedback"}
                </Button>
              )}

              {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

              {isSubmitted && (
                <div className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Thank you for your feedback.
                </div>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
