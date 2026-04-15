import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import StarRating from "../../components/shared/StarRating";
import StudentAvatar from "../../components/shared/StudentAvatar";
import { Slider } from "../../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Send,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building2,
  Briefcase,
  Calendar,
  GraduationCap,
  SquarePen,
  MessageSquare,
} from "lucide-react";

interface Student {
  id: string;
  email: string;
  name: string;
  Role: string;
  COLLEGE: string;
  COLLEGE_DEPARTMENT?: string;
  projectTitle: string;
  duration: string;
  startDate: string;
  endDate: string;
  profilePhoto?: string;
}

interface BackendStudent {
  id: string;
  email?: string;
  name: string;
  Role?: string;
  COLLEGE?: string;
  COLLEGE_DEPARTMENT?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  tasks?: Array<{ title?: string }>;
  profilePhoto?: string;
}

interface FormTemplateField {
  id: string;
  label: string;
  type: "text" | "slider" | "textarea" | "rating" | "boolean" | "enum";
  required: boolean;
  options?: string[];
}

interface FormTemplate {
  id: string;
  name: string;
  formType: "companyToStudent" | "studentToCompany";
  fields: FormTemplateField[];
}

const TEMPLATE_STORAGE_KEY = "company-form-templates";
const STUDENT_LIST_CACHE_KEY = "company-feedback-students-cache";
const SELECTED_STUDENT_CACHE_KEY = "company-feedback-selected-student";

const HIRING_RECOMMENDATION_OPTIONS = [
  "Highly Recommended",
  "Recommended",
  "Consider with Improvement",
] as const;

const getRecommendationButtonClass = (option: string, selected: boolean): string => {
  if (!selected) {
    return "bg-white text-foreground border-border hover:bg-secondary/40";
  }

  if (option === "Highly Recommended") {
    return "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-500/30";
  }

  if (option === "Recommended") {
    return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/30";
  }

  return "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent shadow-lg shadow-amber-500/30";
};

interface FeedbackStatus {
  [studentId: string]: {
    submitted: boolean;
    ratings: {
      technicalKnowledge: number;
      codeQualityImplementation: number;
      taskCompletion: number;
      productivity: number;
      attentionToDetail: number;
      communicationClarity: number;
      reportingUpdates: number;
      punctuality: number;
      responsibility: number;
      discipline: number;
      collaboration: number;
      adaptability: number;
      opennessToFeedback: number;
      learningAbility: number;
      skillImprovement: number;
      initiativeToLearnNewThings: number;
      contributionToTeamProject: number;
      ownershipOfTasks: number;
    };
    typeOfWorkHandled: string;
    difficultyLevel: string;
    overallRating: number;
    strengths: string;
    improvements: string;
    comments: string;
    recommendation: string;
    technicalImprovementObserved: boolean;
    workedIndependently: boolean;
    explainedWorkClearly: boolean;
    communicationResponsive: boolean;
    professionalismMaintained: boolean;
    openToFeedback: boolean;
    positiveTeamContribution: boolean;
    initiativeForNewSkills: boolean;
    proactiveChallenges: boolean;
    meaningfulProjectContribution: boolean;
    considerForFullTime: boolean;
  };
}

interface StudentSubmittedFeedback {
  studentEmail: string;
  studentName: string;
  companyName: string;
  learningExperience?: number;
  mentorship?: number;
  workEnvironment?: number;
  communication?: number;
  strengths?: string;
  improvements?: string;
  overallComments?: string;
  sections?: Array<{
    sectionId: string;
    title: string;
    questions: Array<{
      questionId: string;
      label: string;
      type: "rating" | "boolean" | "enum" | "text";
      value: number | boolean | string;
    }>;
  }>;
}

const formatStudentAnswerText = (
  question: NonNullable<StudentSubmittedFeedback["sections"]>[number]["questions"][number]
): string => {
  if (question.type === "boolean" && typeof question.value === "boolean") {
    return question.value ? "Yes" : "No";
  }

  if (typeof question.value === "string") {
    return question.value.trim() || "N/A";
  }

  return String(question.value ?? "N/A");
};

const STUDENT_METRIC_QUESTION_IDS = {
  learningExperience: ["overallInternshipExperience", "learningOutcomesSatisfaction"],
  mentorship: ["mentorGuidance", "teamMentorSupport"],
  workEnvironment: ["workCulture", "workloadManageable"],
  communication: ["communicationClear"],
} as const;

const getFirstNumericRating = (
  sections: StudentSubmittedFeedback["sections"],
  questionIds: readonly string[]
): number | undefined => {
  if (!sections?.length) {
    return undefined;
  }

  for (const section of sections) {
    for (const question of section.questions) {
      if (!questionIds.includes(question.questionId)) {
        continue;
      }
      if (question.type !== "rating") {
        continue;
      }
      if (typeof question.value === "number" && Number.isFinite(question.value)) {
        return question.value;
      }
    }
  }

  return undefined;
};

const resolveStudentSubmittedFeedback = (
  feedback: StudentSubmittedFeedback
): StudentSubmittedFeedback => {
  if (!feedback.sections?.length) {
    return feedback;
  }

  return {
    ...feedback,
    learningExperience:
      feedback.learningExperience ??
      getFirstNumericRating(feedback.sections, STUDENT_METRIC_QUESTION_IDS.learningExperience),
    mentorship:
      feedback.mentorship ??
      getFirstNumericRating(feedback.sections, STUDENT_METRIC_QUESTION_IDS.mentorship),
    workEnvironment:
      feedback.workEnvironment ??
      getFirstNumericRating(feedback.sections, STUDENT_METRIC_QUESTION_IDS.workEnvironment),
    communication:
      feedback.communication ??
      getFirstNumericRating(feedback.sections, STUDENT_METRIC_QUESTION_IDS.communication),
  };
};

const DEFAULT_RATINGS: FeedbackStatus[string]["ratings"] = {
  technicalKnowledge: 3,
  codeQualityImplementation: 3,
  taskCompletion: 3,
  productivity: 3,
  attentionToDetail: 3,
  communicationClarity: 3,
  reportingUpdates: 3,
  punctuality: 3,
  responsibility: 3,
  discipline: 3,
  collaboration: 3,
  adaptability: 3,
  opennessToFeedback: 3,
  learningAbility: 3,
  skillImprovement: 3,
  initiativeToLearnNewThings: 3,
  contributionToTeamProject: 3,
  ownershipOfTasks: 3,
};

const SYSTEM_META_MARKER = "[SYSTEM_META]";

type SystemMeta = Omit<
  FeedbackStatus[string],
  "submitted" | "ratings" | "typeOfWorkHandled" | "difficultyLevel" | "overallRating" | "strengths" | "improvements" | "comments" | "recommendation"
>;

const DEFAULT_SYSTEM_META: SystemMeta = {
  technicalImprovementObserved: false,
  workedIndependently: false,
  explainedWorkClearly: false,
  communicationResponsive: false,
  professionalismMaintained: false,
  openToFeedback: false,
  positiveTeamContribution: false,
  initiativeForNewSkills: false,
  proactiveChallenges: false,
  meaningfulProjectContribution: false,
  considerForFullTime: false,
};

const buildCommentsWithMeta = (comments: string, meta: SystemMeta) => {
  const cleaned = comments.split(`\n${SYSTEM_META_MARKER}`)[0].trim();
  return `${cleaned}\n${SYSTEM_META_MARKER}${JSON.stringify(meta)}`;
};

const parseMetaFromComments = (comments: string): { cleanedComments: string; meta: SystemMeta } => {
  const markerIndex = comments.indexOf(`\n${SYSTEM_META_MARKER}`);
  if (markerIndex < 0) {
    return { cleanedComments: comments, meta: { ...DEFAULT_SYSTEM_META } };
  }

  const cleanedComments = comments.slice(0, markerIndex).trim();
  const jsonPart = comments.slice(markerIndex + (`\n${SYSTEM_META_MARKER}`).length);
  try {
    const parsed = JSON.parse(jsonPart) as Partial<SystemMeta>;
    return {
      cleanedComments,
      meta: { ...DEFAULT_SYSTEM_META, ...parsed },
    };
  } catch {
    return { cleanedComments, meta: { ...DEFAULT_SYSTEM_META } };
  }
};

export default function CompanyFeedbackForm() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [studentSubmittedFeedback, setStudentSubmittedFeedback] = useState<StudentSubmittedFeedback | null>(null);
  const [isLoadingStudentFeedback, setIsLoadingStudentFeedback] = useState(false);
  const [showStudentSubmittedFeedback, setShowStudentSubmittedFeedback] = useState(false);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [templateValues, setTemplateValues] = useState<Record<string, string | number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as FormTemplate[];
      if (Array.isArray(parsed)) {
        const normalized = parsed
          .filter((template) => template.formType === "companyToStudent")
          .map((template) => ({
            ...template,
            fields: template.fields.map((field) => {
              const looksLikeRecommendation = field.label.toLowerCase().includes("recommend");
              if (looksLikeRecommendation && field.type === "text") {
                return {
                  ...field,
                  type: "enum" as const,
                  options: [...HIRING_RECOMMENDATION_OPTIONS],
                };
              }
              return field;
            }),
          }));

        setTemplates(normalized);
      }
    } catch {
      // Ignore malformed template payloads.
    }
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const cachedStudentsRaw = sessionStorage.getItem(STUDENT_LIST_CACHE_KEY);
        const cachedSelectedStudentId = sessionStorage.getItem(SELECTED_STUDENT_CACHE_KEY);
        if (cachedStudentsRaw) {
          const cachedStudents = JSON.parse(cachedStudentsRaw) as Student[];
          if (Array.isArray(cachedStudents) && cachedStudents.length > 0) {
            setStudents(cachedStudents);
            setSelectedStudentId((current) => current || cachedSelectedStudentId || cachedStudents[0].id);
          }
        }
      } catch {
        // Ignore malformed cached students payload.
      }

      setIsLoadingStudents(true);
      try {
        const response = await fetch(`${apiBaseUrl}/students`);
        if (!response.ok) {
          throw new Error("Failed to load students");
        }

        const records = (await response.json()) as BackendStudent[];
        const mappedStudents: Student[] = records.map((student) => ({
          id: student.id,
          email: student.email || "",
          name: student.name,
          Role: student.Role || "Intern",
          COLLEGE: student.COLLEGE || "College",
          COLLEGE_DEPARTMENT: student.COLLEGE_DEPARTMENT || "",
          projectTitle: student.tasks?.[0]?.title || "Internship Project",
          duration: student.duration || "N/A",
          startDate: student.startDate || "",
          endDate: student.endDate || "",
          profilePhoto: student.profilePhoto,
        }));

        setStudents(mappedStudents);
        sessionStorage.setItem(STUDENT_LIST_CACHE_KEY, JSON.stringify(mappedStudents));
        if (mappedStudents.length > 0) {
          setSelectedStudentId((current) => {
            const nextSelected = current || mappedStudents[0].id;
            sessionStorage.setItem(SELECTED_STUDENT_CACHE_KEY, nextSelected);
            return nextSelected;
          });
        }
      } catch {
        setError("Unable to load students from backend.");
      } finally {
        setIsLoadingStudents(false);
      }
    };

    void loadStudents();
  }, [apiBaseUrl]);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/feedback/company`);
        if (!response.ok) {
          return;
        }

        const records: Array<{ studentId: string } & FeedbackStatus[string]> = await response.json();
        const loadedStatus = records.reduce<FeedbackStatus>((accumulator, record) => {
          accumulator[record.studentId] = {
            submitted: true,
            ratings: { ...DEFAULT_RATINGS, ...(record.ratings ?? {}) },
            typeOfWorkHandled: record.typeOfWorkHandled ?? "",
            difficultyLevel: record.difficultyLevel ?? "Intermediate",
            overallRating: record.overallRating,
            strengths: record.strengths,
            improvements: record.improvements,
            comments: parseMetaFromComments(record.comments ?? "").cleanedComments,
            recommendation: record.recommendation,
            ...parseMetaFromComments(record.comments ?? "").meta,
          };
          return accumulator;
        }, {});
        setFeedbackStatus(loadedStatus);
      } catch {
        setError("Unable to load saved company feedback.");
      }
    };

    void loadFeedback();
  }, [apiBaseUrl]);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? null;
  const activeTemplate = templates.find((template) => template.id === selectedTemplateId) ?? null;
  const currentFeedback = feedbackStatus[selectedStudentId] || {
    submitted: false,
    ratings: DEFAULT_RATINGS,
    typeOfWorkHandled: "",
    difficultyLevel: "Intermediate",
    overallRating: 3,
    strengths: "",
    improvements: "",
    comments: "",
    recommendation: "Recommended",
    technicalImprovementObserved: false,
    workedIndependently: false,
    explainedWorkClearly: false,
    communicationResponsive: false,
    professionalismMaintained: false,
    openToFeedback: false,
    positiveTeamContribution: false,
    initiativeForNewSkills: false,
    proactiveChallenges: false,
    meaningfulProjectContribution: false,
    considerForFullTime: false,
  };
  const isEditMode = editingStudentId === selectedStudentId;
  const isReadOnly = currentFeedback.submitted && !isEditMode;

  useEffect(() => {
    const loadSelectedStudentFeedback = async () => {
      if (!selectedStudent?.email) {
        setStudentSubmittedFeedback(null);
        setShowStudentSubmittedFeedback(false);
        return;
      }

      setIsLoadingStudentFeedback(true);
      setShowStudentSubmittedFeedback(false);
      try {
        const response = await fetch(
          `${apiBaseUrl}/feedback/student?student_email=${encodeURIComponent(selectedStudent.email)}`
        );

        if (!response.ok) {
          setStudentSubmittedFeedback(null);
          return;
        }

        const records = (await response.json()) as StudentSubmittedFeedback[];
        const latestRecord = records[0] ? resolveStudentSubmittedFeedback(records[0]) : null;
        setStudentSubmittedFeedback(latestRecord);
      } catch {
        setStudentSubmittedFeedback(null);
      } finally {
        setIsLoadingStudentFeedback(false);
      }
    };

    void loadSelectedStudentFeedback();
  }, [apiBaseUrl, selectedStudent?.email]);

  const getDefaultTemplateValue = (type: FormTemplateField["type"]): string | number => {
    return type === "slider" || type === "rating" ? 3 : "";
  };

  const initializeTemplateValues = (template: FormTemplate) => {
    const defaults = template.fields.reduce<Record<string, string | number>>((accumulator, field) => {
      accumulator[field.id] = getDefaultTemplateValue(field.type);
      return accumulator;
    }, {});
    setTemplateValues(defaults);
  };

  useEffect(() => {
    const savedActiveTemplate = templates.find((template) => template.id === "active-companyToStudent") ?? null;
    if (!savedActiveTemplate) {
      setSelectedTemplateId(null);
      setTemplateValues({});
      return;
    }

    setSelectedTemplateId(savedActiveTemplate.id);
    initializeTemplateValues(savedActiveTemplate);
  }, [templates]);

  const updateTemplateValue = (fieldId: string, value: string | number) => {
    setTemplateValues((previous) => ({
      ...previous,
      [fieldId]: value,
    }));
  };

  const mapTemplateValuesToFeedback = () => {
    if (!activeTemplate) {
      return currentFeedback;
    }

    const mapped = {
      ...currentFeedback,
      ratings: { ...currentFeedback.ratings },
      comments: currentFeedback.comments || "",
    };

    const extraEntries: string[] = [];

    for (const field of activeTemplate.fields) {
      const value = templateValues[field.id];
      const normalizedLabel = field.label.toLowerCase();

      if (field.type === "slider" || field.type === "rating") {
        const numericValue = Number(value ?? 3);
        if (normalizedLabel.includes("technical")) mapped.ratings.technicalKnowledge = numericValue;
        else if (normalizedLabel.includes("code") || normalizedLabel.includes("implementation") || normalizedLabel.includes("quality")) mapped.ratings.codeQualityImplementation = numericValue;
        else if (normalizedLabel.includes("task completion")) mapped.ratings.taskCompletion = numericValue;
        else if (normalizedLabel.includes("productivity")) mapped.ratings.productivity = numericValue;
        else if (normalizedLabel.includes("detail")) mapped.ratings.attentionToDetail = numericValue;
        else if (normalizedLabel.includes("communication")) mapped.ratings.communicationClarity = numericValue;
        else if (normalizedLabel.includes("report")) mapped.ratings.reportingUpdates = numericValue;
        else if (normalizedLabel.includes("punctual")) mapped.ratings.punctuality = numericValue;
        else if (normalizedLabel.includes("responsib")) mapped.ratings.responsibility = numericValue;
        else if (normalizedLabel.includes("discipline")) mapped.ratings.discipline = numericValue;
        else if (normalizedLabel.includes("collaboration") || normalizedLabel.includes("teamwork")) mapped.ratings.collaboration = numericValue;
        else if (normalizedLabel.includes("adapt")) mapped.ratings.adaptability = numericValue;
        else if (normalizedLabel.includes("openness") || normalizedLabel.includes("feedback")) mapped.ratings.opennessToFeedback = numericValue;
        else if (normalizedLabel.includes("learning ability")) mapped.ratings.learningAbility = numericValue;
        else if (normalizedLabel.includes("skill improvement")) mapped.ratings.skillImprovement = numericValue;
        else if (normalizedLabel.includes("initiative")) mapped.ratings.initiativeToLearnNewThings = numericValue;
        else if (normalizedLabel.includes("contribution")) mapped.ratings.contributionToTeamProject = numericValue;
        else if (normalizedLabel.includes("ownership")) mapped.ratings.ownershipOfTasks = numericValue;
        else if (normalizedLabel.includes("overall")) mapped.overallRating = numericValue;
        else extraEntries.push(`${field.label}: ${numericValue}/5`);
      } else {
        const textValue = String(value ?? "").trim();
        if (!textValue) {
          continue;
        }

        if (normalizedLabel.includes("strength")) mapped.strengths = textValue;
        else if (normalizedLabel.includes("improvement") || normalizedLabel.includes("growth")) mapped.improvements = textValue;
        else if (normalizedLabel.includes("recommend")) mapped.recommendation = textValue;
        else if (normalizedLabel.includes("comment") || normalizedLabel.includes("feedback") || normalizedLabel.includes("remark")) mapped.comments = textValue;
        else extraEntries.push(`${field.label}: ${textValue}`);
      }
    }

    if (extraEntries.length > 0) {
      const appendix = `Template Responses:\n${extraEntries.join("\n")}`;
      mapped.comments = mapped.comments ? `${mapped.comments}\n\n${appendix}` : appendix;
    }

    return mapped;
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = Object.values(feedbackStatus).filter((f) => f.submitted).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      return;
    }

    void (async () => {
      setIsSaving(true);
      setError("");

      try {
        const resolvedFeedback = mapTemplateValuesToFeedback();
        const normalizedRatings = {
          ...resolvedFeedback.ratings,
          opennessToFeedback: currentFeedback.openToFeedback ? 5 : 2,
          initiativeToLearnNewThings: currentFeedback.initiativeForNewSkills ? 5 : 2,
          contributionToTeamProject: currentFeedback.meaningfulProjectContribution ? 5 : 2,
        };

        const metaPayload: SystemMeta = {
          technicalImprovementObserved: currentFeedback.technicalImprovementObserved,
          workedIndependently: currentFeedback.workedIndependently,
          explainedWorkClearly: currentFeedback.explainedWorkClearly,
          communicationResponsive: currentFeedback.communicationResponsive,
          professionalismMaintained: currentFeedback.professionalismMaintained,
          openToFeedback: currentFeedback.openToFeedback,
          positiveTeamContribution: currentFeedback.positiveTeamContribution,
          initiativeForNewSkills: currentFeedback.initiativeForNewSkills,
          proactiveChallenges: currentFeedback.proactiveChallenges,
          meaningfulProjectContribution: currentFeedback.meaningfulProjectContribution,
          considerForFullTime: currentFeedback.considerForFullTime,
        };

        const commentsWithMeta = buildCommentsWithMeta(resolvedFeedback.comments || "", metaPayload);

        const response = await fetch(`${apiBaseUrl}/feedback/company`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: selectedStudent.id,
            studentEmail: selectedStudent.email,
            studentName: selectedStudent.name,
            role: selectedStudent.Role,
            college: selectedStudent.COLLEGE,
            projectTitle: selectedStudent.projectTitle,
            duration: selectedStudent.duration,
            startDate: selectedStudent.startDate,
            endDate: selectedStudent.endDate,
            typeOfWorkHandled: resolvedFeedback.typeOfWorkHandled,
            difficultyLevel: resolvedFeedback.difficultyLevel,
            overallRating: resolvedFeedback.overallRating,
            ratings: normalizedRatings,
            strengths: resolvedFeedback.strengths,
            improvements: resolvedFeedback.improvements,
            comments: commentsWithMeta,
            recommendation: resolvedFeedback.recommendation,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save company feedback");
        }

        const saved = await response.json();
        const updatedStatus: FeedbackStatus = {
          ...feedbackStatus,
          [selectedStudentId]: {
            submitted: true,
            ratings: saved.ratings,
            typeOfWorkHandled: saved.typeOfWorkHandled,
            difficultyLevel: saved.difficultyLevel,
            overallRating: saved.overallRating,
            strengths: saved.strengths,
            improvements: saved.improvements,
            comments: parseMetaFromComments(saved.comments ?? "").cleanedComments,
            recommendation: saved.recommendation,
            ...metaPayload,
          },
        };

        setFeedbackStatus(updatedStatus);
        setEditingStudentId(null);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          const nextStudent = students.find(
            (student) => !updatedStatus[student.id]?.submitted && student.id !== selectedStudentId
          );
          if (nextStudent) {
            setSelectedStudentId(nextStudent.id);
            sessionStorage.setItem(SELECTED_STUDENT_CACHE_KEY, nextStudent.id);
          }
        }, 2000);
      } catch {
        setError("Could not save company feedback right now.");
      } finally {
        setIsSaving(false);
      }
    })();
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

  const handleEditFeedback = () => {
    if (!selectedStudentId || !currentFeedback.submitted) {
      return;
    }

    const confirmed = window.confirm(
      "Do you want to edit this submitted feedback? You will need to resubmit after making changes."
    );
    if (!confirmed) {
      return;
    }

    setEditingStudentId(selectedStudentId);
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
    showLabel = true,
  }: {
    label: React.ReactNode;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    showLabel?: boolean;
  }) => (
    <div className="space-y-3">
      {showLabel ? (
        <div className="flex items-center justify-between">
          <Label className="font-semibold">{label}</Label>
          <span className="text-sm font-bold text-foreground">
            {value}/5
          </span>
        </div>
      ) : (
        <div className="flex justify-end">
          <span className="text-sm font-bold text-foreground">{value}/5</span>
        </div>
      )}
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

  const YesNoSection = ({
    label,
    value,
    onChange,
    disabled = false,
  }: {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
  }) => (
    <div className="space-y-3">
      <Label className="font-semibold">{label}</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={value ? "default" : "outline"}
          onClick={() => !disabled && onChange(true)}
          disabled={disabled}
        >
          Yes
        </Button>
        <Button
          type="button"
          variant={!value ? "default" : "outline"}
          onClick={() => !disabled && onChange(false)}
          disabled={disabled}
        >
          No
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-full bg-background">
      {/* LEFT PANEL - Student List */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex w-96 bg-card border-r border-border flex-col shadow-lg"
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
                width: `${students.length > 0 ? (completedCount / students.length) * 100 : 0}%`,
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
        <div className="flex-1 p-4 space-y-2">
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
                  onClick={() => {
                    setSelectedStudentId(student.id);
                    sessionStorage.setItem(SELECTED_STUDENT_CACHE_KEY, student.id);
                  }}
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
                        photoUrl={student.profilePhoto}
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
                        {student.Role}
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

      {/* MOBILE - Horizontal Student Selector */}
      <div className="md:hidden bg-card border-b border-border p-4">
        <div className="mb-3">
          <h2 className="text-sm font-bold text-foreground">
            Student Evaluations — {completedCount}/{students.length} done
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {students.map((student, index) => {
            const isSelected = student.id === selectedStudentId;
            const isCompleted = feedbackStatus[student.id]?.submitted;
            const gradient = avatarGradients[index % avatarGradients.length];
            return (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedStudentId(student.id);
                  sessionStorage.setItem(SELECTED_STUDENT_CACHE_KEY, student.id);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                    : "bg-secondary/50 text-foreground"
                }`}
              >
                <StudentAvatar
                  name={student.name}
                  size="sm"
                  gradient={gradient}
                  withRing={false}
                  photoUrl={student.profilePhoto}
                />
                <span className="text-xs font-semibold whitespace-nowrap">{student.name.split(' ')[0]}</span>
                {isCompleted && <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL - Feedback Form */}
      <div className="flex-1">
        {isLoadingStudents && students.length === 0 ? (
          <div className="p-4 sm:p-8 space-y-6">
            <div className="flex justify-end">
              <p className="text-sm text-muted-foreground">Loading students...</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm animate-pulse">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="w-20 h-20 rounded-full bg-secondary/70" />
                <div className="flex-1 space-y-3 w-full">
                  <div className="h-7 w-56 rounded-md bg-secondary/70" />
                  <div className="h-4 w-40 rounded-md bg-secondary/60" />
                  <div className="h-4 w-64 rounded-md bg-secondary/60" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm animate-pulse space-y-4">
              <div className="h-5 w-48 rounded-md bg-secondary/70" />
              <div className="h-4 w-full rounded-md bg-secondary/50" />
              <div className="h-4 w-5/6 rounded-md bg-secondary/50" />
              <div className="h-4 w-4/6 rounded-md bg-secondary/50" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm animate-pulse space-y-4">
              <div className="h-5 w-40 rounded-md bg-secondary/70" />
              <div className="h-11 w-full rounded-xl bg-secondary/60" />
              <div className="h-11 w-full rounded-xl bg-secondary/60" />
            </div>
          </div>
        ) : students.length === 0 ? (
          <div className="h-full flex items-center justify-center p-6 text-center">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">No students available</h2>
              <p className="text-muted-foreground">Add students in Student Details to start feedback.</p>
            </div>
          </div>
        ) : !selectedStudent ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Select a student to continue.</p>
          </div>
        ) : (
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
              className="p-4 sm:p-8"
            >
              {/* Student Profile Header */}
              <div className="mb-6 sm:mb-8 bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-border shadow-md">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
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
                    photoUrl={selectedStudent.profilePhoto}
                  />
                  <div className="flex-1 w-full text-left">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                      <div className="min-w-0 w-full">
                        <h1 className="text-lg sm:text-3xl font-bold text-foreground mb-2 break-words leading-tight">
                          {selectedStudent.name}
                        </h1>
                        <div className="flex items-center justify-start gap-2 mb-3">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-foreground break-words leading-tight">
                            {selectedStudent.Role}
                          </span>
                        </div>
                      </div>
                      {currentFeedback.submitted ? (
                        <div className="flex items-center gap-2 m-auto sm:m-0">
                          {isEditMode && (
                            <div className="px-4 py-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold text-sm flex items-center gap-2">
                              <SquarePen className="w-4 h-4" />
                              Editing
                            </div>
                          )}
                          <div className="px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                          </div>
                          {!isEditMode && (
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={handleEditFeedback}
                            >
                              <SquarePen className="w-4 h-4" />
                              Edit
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold text-sm flex items-center gap-2 m-auto sm:m-0">
                          <Clock className="w-4 h-4" />
                          Pending
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="mt-0.5 p-1.5 bg-purple-100 rounded-md">
                          <Briefcase className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Project</p>
                          <p className="text-sm font-bold text-foreground break-words leading-tight">
                            {selectedStudent.projectTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="mt-0.5 p-1.5 bg-blue-100 rounded-md">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Department</p>
                          <p className="text-sm font-bold text-foreground break-words leading-tight">
                            {selectedStudent.COLLEGE_DEPARTMENT || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="mt-0.5 p-1.5 bg-emerald-100 rounded-md">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Duration</p>
                          <p className="text-sm font-bold text-foreground break-words leading-tight">
                            {selectedStudent.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Student Submitted Feedback</h2>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => setShowStudentSubmittedFeedback((current) => !current)}
                      disabled={isLoadingStudentFeedback || !studentSubmittedFeedback}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${showStudentSubmittedFeedback ? "rotate-90" : ""}`} />
                      {showStudentSubmittedFeedback ? "Hide Student Feedback" : "View Student Feedback"}
                    </Button>
                  </div>

                  {isLoadingStudentFeedback ? (
                    <p className="text-sm text-muted-foreground">Loading student feedback...</p>
                  ) : studentSubmittedFeedback ? (
                    showStudentSubmittedFeedback ? (
                      <div className="space-y-4">
                        {studentSubmittedFeedback.sections?.length ? (
                          <div className="space-y-4">
                            {studentSubmittedFeedback.sections.map((section) => (
                              <div key={section.sectionId} className="p-4 rounded-lg bg-secondary/20 border border-border">
                                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3">{section.title}</h3>
                                <div className="space-y-2">
                                  {section.questions.map((question) => (
                                    <div
                                      key={`${section.sectionId}-${question.questionId}`}
                                      className="p-3 rounded-md bg-background border border-border"
                                    >
                                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                        {question.label}
                                      </p>
                                      {question.type === "rating" && typeof question.value === "number" ? (
                                        <div className="flex items-center gap-2">
                                          <StarRating value={question.value} readonly size="sm" />
                                          <span className="text-sm font-semibold text-foreground">{question.value}/5</span>
                                        </div>
                                      ) : (
                                        <p className="text-sm font-semibold text-foreground whitespace-pre-wrap break-words">
                                          {formatStudentAnswerText(question)}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}

                            {(studentSubmittedFeedback.strengths ||
                              studentSubmittedFeedback.improvements ||
                              studentSubmittedFeedback.overallComments) && (
                              <div className="space-y-3">
                                <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Strengths</p>
                                  <p className="text-sm text-foreground whitespace-pre-wrap">
                                    {studentSubmittedFeedback.strengths || "No strengths shared."}
                                  </p>
                                </div>
                                <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Improvements</p>
                                  <p className="text-sm text-foreground whitespace-pre-wrap">
                                    {studentSubmittedFeedback.improvements || "No improvement notes shared."}
                                  </p>
                                </div>
                                <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overall Comments</p>
                                  <p className="text-sm text-foreground whitespace-pre-wrap">
                                    {studentSubmittedFeedback.overallComments || "No overall comments shared."}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Learning Experience</p>
                                <p className="font-bold text-foreground">{typeof studentSubmittedFeedback.learningExperience === "number" ? `${studentSubmittedFeedback.learningExperience}/5` : "N/A"}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Mentorship</p>
                                <p className="font-bold text-foreground">{typeof studentSubmittedFeedback.mentorship === "number" ? `${studentSubmittedFeedback.mentorship}/5` : "N/A"}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Work Environment</p>
                                <p className="font-bold text-foreground">{typeof studentSubmittedFeedback.workEnvironment === "number" ? `${studentSubmittedFeedback.workEnvironment}/5` : "N/A"}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Communication</p>
                                <p className="font-bold text-foreground">{typeof studentSubmittedFeedback.communication === "number" ? `${studentSubmittedFeedback.communication}/5` : "N/A"}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Strengths</p>
                                <p className="text-sm text-foreground whitespace-pre-wrap">
                                  {studentSubmittedFeedback.strengths || "No strengths shared."}
                                </p>
                              </div>
                              <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Improvements</p>
                                <p className="text-sm text-foreground whitespace-pre-wrap">
                                  {studentSubmittedFeedback.improvements || "No improvement notes shared."}
                                </p>
                              </div>
                              <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overall Comments</p>
                                <p className="text-sm text-foreground whitespace-pre-wrap">
                                  {studentSubmittedFeedback.overallComments || "No overall comments shared."}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Click the button above to view the student's submitted feedback.
                      </p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">This student has not submitted feedback yet.</p>
                  )}
                </div>

                {/* Section 1: Overall Performance */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                  <h2 className="text-lg font-bold text-foreground mb-5">Section 1: Overall Performance</h2>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="font-semibold">How would you rate the intern's overall performance?</Label>
                      <StarRating value={currentFeedback.overallRating} onChange={(value) => updateField("overallRating", value)} size="lg" readonly={isReadOnly} />
                    </div>
                    <RatingSection
                      label="How well did the intern meet expectations?"
                      value={currentFeedback.ratings.taskCompletion}
                      onChange={(val) => updateRating("taskCompletion", val)}
                      disabled={isReadOnly}
                    />
                    <RatingSection
                      label="How consistent was the intern's performance throughout the internship?"
                      value={currentFeedback.ratings.discipline}
                      onChange={(val) => updateRating("discipline", val)}
                      disabled={isReadOnly}
                    />
                  </div>
                </div>

                {activeTemplate ? (
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                    <h2 className="text-lg font-bold text-foreground mb-5">Template Form</h2>
                    <div className="space-y-4">
                      {activeTemplate.fields.map((field) => {
                        const currentValue = templateValues[field.id] ?? getDefaultTemplateValue(field.type);
                        return (
                          <div key={field.id} className="space-y-1.5">
                            {field.type === "text" && (
                              <>
                                <Label className="font-semibold">
                                  {field.label}
                                  {field.required ? <span className="text-destructive ml-1">*</span> : null}
                                </Label>
                                <Input
                                  value={String(currentValue)}
                                  onChange={(event) => updateTemplateValue(field.id, event.target.value)}
                                  disabled={isReadOnly}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                              </>
                            )}
                            {field.type === "textarea" && (
                              <>
                                <Label className="font-semibold">
                                  {field.label}
                                  {field.required ? <span className="text-destructive ml-1">*</span> : null}
                                </Label>
                                <Textarea
                                  rows={4}
                                  value={String(currentValue)}
                                  onChange={(event) => updateTemplateValue(field.id, event.target.value)}
                                  disabled={isReadOnly}
                                  className="resize-none"
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                              </>
                            )}
                            {(field.type === "slider" || field.type === "rating") && (
                              <RatingSection
                                label={
                                  <>
                                    {field.label}
                                    {field.required ? <span className="text-destructive ml-1">*</span> : null}
                                  </>
                                }
                                value={Number(currentValue)}
                                onChange={(value) => updateTemplateValue(field.id, value)}
                                disabled={isReadOnly}
                                showLabel={true}
                              />
                            )}
                            {field.type === "enum" && (
                              <>
                                <Label className="font-semibold">
                                  {field.label}
                                  {field.required ? <span className="text-destructive ml-1">*</span> : null}
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                  {(field.options && field.options.length > 0 ? field.options : [...HIRING_RECOMMENDATION_OPTIONS]).map((option) => (
                                    <button
                                      key={option}
                                      type="button"
                                      disabled={isReadOnly}
                                      onClick={() => updateTemplateValue(field.id, option)}
                                      className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                                        field.label.toLowerCase().includes("recommend")
                                          ? getRecommendationButtonClass(option, String(currentValue) === option)
                                          : String(currentValue) === option
                                          ? "bg-primary text-white border-primary"
                                          : "bg-white text-foreground border-border hover:bg-secondary/40"
                                      } ${isReadOnly ? "opacity-60 cursor-not-allowed" : ""}`}
                                    >
                                      <span className="flex items-center gap-2">
                                        {String(currentValue) === option ? <CheckCircle2 className="w-4 h-4" /> : null}
                                        {option}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                            {field.type === "boolean" && (
                              <>
                                <Label className="font-semibold">
                                  {field.label}
                                  {field.required ? <span className="text-destructive ml-1">*</span> : null}
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                  {["Yes", "No"].map((option) => {
                                    const boolValue = option === "Yes";
                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        disabled={isReadOnly}
                                        onClick={() => updateTemplateValue(field.id, boolValue ? 1 : 0)}
                                        className={`px-3 py-2 rounded-full text-sm font-semibold border transition-colors ${
                                          Number(currentValue) === (boolValue ? 1 : 0)
                                            ? "bg-primary text-white border-primary"
                                            : "bg-secondary/70 text-foreground border-border hover:bg-secondary"
                                        } ${isReadOnly ? "opacity-60 cursor-not-allowed" : ""}`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Section 2: Technical Skills */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 2: Technical Skills</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How would you rate the intern's technical knowledge?"
                          value={currentFeedback.ratings.technicalKnowledge}
                          onChange={(val) => updateRating("technicalKnowledge", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How effective was the intern in applying technical skills?"
                          value={currentFeedback.ratings.codeQualityImplementation}
                          onChange={(val) => updateRating("codeQualityImplementation", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How would you rate the quality of work delivered?"
                          value={currentFeedback.ratings.attentionToDetail}
                          onChange={(val) => updateRating("attentionToDetail", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Did the intern demonstrate improvement in technical skills over time?"
                          value={currentFeedback.technicalImprovementObserved}
                          onChange={(val) => updateField("technicalImprovementObserved", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 3: Work Execution */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 3: Work Execution</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How effectively did the intern complete assigned tasks?"
                          value={currentFeedback.ratings.taskCompletion}
                          onChange={(val) => updateRating("taskCompletion", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How would you rate the intern's productivity?"
                          value={currentFeedback.ratings.productivity}
                          onChange={(val) => updateRating("productivity", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How well did the intern manage deadlines?"
                          value={currentFeedback.ratings.reportingUpdates}
                          onChange={(val) => updateRating("reportingUpdates", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Was the intern able to work independently when required?"
                          value={currentFeedback.workedIndependently}
                          onChange={(val) => updateField("workedIndependently", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 4: Communication Skills */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 4: Communication Skills</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How would you rate the intern's communication skills?"
                          value={currentFeedback.ratings.communicationClarity}
                          onChange={(val) => updateRating("communicationClarity", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Was the intern able to clearly explain their work?"
                          value={currentFeedback.explainedWorkClearly}
                          onChange={(val) => updateField("explainedWorkClearly", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How effectively did the intern report progress?"
                          value={currentFeedback.ratings.reportingUpdates}
                          onChange={(val) => updateRating("reportingUpdates", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Was the intern responsive to communication?"
                          value={currentFeedback.communicationResponsive}
                          onChange={(val) => updateField("communicationResponsive", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 5: Professional Behavior */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 5: Professional Behavior</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How would you rate the intern's punctuality?"
                          value={currentFeedback.ratings.punctuality}
                          onChange={(val) => updateRating("punctuality", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How responsible was the intern in handling tasks?"
                          value={currentFeedback.ratings.responsibility}
                          onChange={(val) => updateRating("responsibility", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How would you rate the intern's discipline and work ethics?"
                          value={currentFeedback.ratings.discipline}
                          onChange={(val) => updateRating("discipline", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Did the intern maintain professionalism in the workplace?"
                          value={currentFeedback.professionalismMaintained}
                          onChange={(val) => updateField("professionalismMaintained", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 6: Teamwork & Collaboration */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 6: Teamwork and Collaboration</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How well did the intern collaborate with team members?"
                          value={currentFeedback.ratings.collaboration}
                          onChange={(val) => updateRating("collaboration", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Was the intern open to feedback and suggestions?"
                          value={currentFeedback.openToFeedback}
                          onChange={(val) => updateField("openToFeedback", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How adaptable was the intern to team dynamics?"
                          value={currentFeedback.ratings.adaptability}
                          onChange={(val) => updateRating("adaptability", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Did the intern contribute positively to the team?"
                          value={currentFeedback.positiveTeamContribution}
                          onChange={(val) => updateField("positiveTeamContribution", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 7: Learning & Growth */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 7: Learning and Growth</h2>
                      <div className="space-y-5">
                        <RatingSection
                          label="How would you rate the intern's learning ability?"
                          value={currentFeedback.ratings.learningAbility}
                          onChange={(val) => updateRating("learningAbility", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Did the intern show initiative to learn new skills?"
                          value={currentFeedback.initiativeForNewSkills}
                          onChange={(val) => updateField("initiativeForNewSkills", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How much improvement did you observe during the internship?"
                          value={currentFeedback.ratings.skillImprovement}
                          onChange={(val) => updateRating("skillImprovement", val)}
                          disabled={isReadOnly}
                        />
                        <YesNoSection
                          label="Was the intern proactive in taking up new challenges?"
                          value={currentFeedback.proactiveChallenges}
                          onChange={(val) => updateField("proactiveChallenges", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>

                    {/* Section 8: Contribution & Impact */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 8: Contribution and Impact</h2>
                      <div className="space-y-5">
                        <YesNoSection
                          label="Did the intern contribute meaningfully to projects?"
                          value={currentFeedback.meaningfulProjectContribution}
                          onChange={(val) => updateField("meaningfulProjectContribution", val)}
                          disabled={isReadOnly}
                        />
                        <RatingSection
                          label="How would you rate the intern's ownership of assigned tasks?"
                          value={currentFeedback.ratings.ownershipOfTasks}
                          onChange={(val) => updateRating("ownershipOfTasks", val)}
                          disabled={isReadOnly}
                        />
                        <div className="space-y-2">
                          <Label className="font-semibold">What level of work did the intern handle?</Label>
                          <Select
                            value={currentFeedback.difficultyLevel}
                            onValueChange={(value) => updateField("difficultyLevel", value)}
                            disabled={isReadOnly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select work level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Section 9: Strengths & Improvements */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 9: Strengths and Improvements</h2>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label className="font-semibold">What are the key strengths of the intern?</Label>
                          <Textarea
                            rows={4}
                            placeholder="Describe the intern's key strengths and accomplishments."
                            value={currentFeedback.strengths}
                            onChange={(e) => updateField("strengths", e.target.value)}
                            disabled={isReadOnly}
                            className="resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold">In which areas does the intern need improvement?</Label>
                          <Textarea
                            rows={4}
                            placeholder="Suggest areas where the intern could improve."
                            value={currentFeedback.improvements}
                            onChange={(e) => updateField("improvements", e.target.value)}
                            disabled={isReadOnly}
                            className="resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Additional Comments</h2>
                      <Textarea
                        rows={4}
                        placeholder="Any additional evaluator comments."
                        value={currentFeedback.comments}
                        onChange={(e) => updateField("comments", e.target.value)}
                        disabled={isReadOnly}
                        className="resize-none"
                      />
                    </div>

                    {/* Section 10: Final Evaluation */}
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
                      <h2 className="text-lg font-bold text-foreground mb-5">Section 10: Final Evaluation</h2>
                      <div className="space-y-4">
                        <Label className="font-semibold">Hiring Recommendation (Highly Recommended / Recommended / Consider with Improvement)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {["Highly Recommended", "Recommended", "Consider with Improvement"].map(
                            (option) => (
                              <motion.button
                                key={option}
                                type="button"
                                whileHover={{ scale: isReadOnly ? 1 : 1.02 }}
                                whileTap={{ scale: isReadOnly ? 1 : 0.98 }}
                                onClick={() => !isReadOnly && updateField("recommendation", option)}
                                disabled={isReadOnly}
                                className={`px-4 py-3 rounded-xl font-bold transition-all duration-200 border ${
                                  getRecommendationButtonClass(option, currentFeedback.recommendation === option)
                                } ${isReadOnly ? "opacity-75 cursor-not-allowed" : ""}`}
                              >
                                <span className="flex items-center justify-center gap-2">
                                  {currentFeedback.recommendation === option ? <CheckCircle2 className="w-4 h-4" /> : null}
                                  {option}
                                </span>
                              </motion.button>
                            )
                          )}
                        </div>

                        <YesNoSection
                          label="Would you consider this intern for a full-time role?"
                          value={currentFeedback.considerForFullTime}
                          onChange={(val) => updateField("considerForFullTime", val)}
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                {(!currentFeedback.submitted || isEditMode) && (
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="flex items-center gap-2 shadow-lg"
                      disabled={isSaving}
                    >
                      <Send className="w-4 h-4" />
                      {isSaving ? "Saving..." : isEditMode ? "Update Feedback" : "Submit Feedback"}
                    </Button>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
                    {error}
                  </div>
                )}

                {currentFeedback.submitted && !isEditMode && (
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
        )}
      </div>
    </div>
  );
}
