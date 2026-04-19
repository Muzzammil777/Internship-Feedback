import { motion, AnimatePresence, Reorder } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus, Trash2, Save, GripVertical, Eye, Settings2, Type, AlignLeft, Sliders, Star, Building2, GraduationCap, CheckCircle2, MessageSquare, Maximize2, Minimize2 } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "slider" | "textarea" | "rating" | "boolean" | "enum";
  required: boolean;
  options?: string[];
}

type FormType = "companyToStudent" | "studentToCompany";

interface FormTemplate {
  id: string;
  name: string;
  formType: FormType;
  fields: FormField[];
}

const TEMPLATE_STORAGE_KEY = "company-form-templates";

export default function CompanyFormEditor() {
  const [activeFormType, setActiveFormType] = useState<FormType>("companyToStudent");

  // Company → Student Feedback Form (Company evaluates students)
  const [companyToStudentFields, setCompanyToStudentFields] = useState<FormField[]>([
    { id: "1", label: "Overall Performance", type: "rating", required: true },
    { id: "2", label: "Technical Knowledge", type: "slider", required: true },
    { id: "3", label: "Code Quality / Implementation", type: "slider", required: true },
    { id: "4", label: "Task Completion", type: "slider", required: true },
    { id: "5", label: "Productivity", type: "slider", required: true },
    { id: "6", label: "Attention to Detail", type: "slider", required: true },
    { id: "7", label: "Communication Clarity", type: "slider", required: true },
    { id: "8", label: "Reporting / Updates", type: "slider", required: true },
    { id: "9", label: "Punctuality", type: "slider", required: true },
    { id: "10", label: "Responsibility", type: "slider", required: true },
    { id: "11", label: "Discipline", type: "slider", required: true },
    { id: "12", label: "Collaboration", type: "slider", required: true },
    { id: "13", label: "Adaptability", type: "slider", required: true },
    { id: "14", label: "Openness to Feedback", type: "slider", required: true },
    { id: "15", label: "Learning Ability", type: "slider", required: true },
    { id: "16", label: "Skill Improvement", type: "slider", required: true },
    { id: "17", label: "Initiative to Learn New Things", type: "slider", required: true },
    { id: "18", label: "Contribution to Team/Project", type: "slider", required: true },
    { id: "19", label: "Ownership of Tasks", type: "slider", required: true },
    { id: "20", label: "Type of Work Handled", type: "text", required: true },
    { id: "21", label: "Difficulty Level of Tasks (Basic / Intermediate / Advanced)", type: "text", required: true },
    { id: "22", label: "Key Strengths", type: "text", required: true },
    { id: "23", label: "Areas for Improvement", type: "text", required: true },
    { id: "24", label: "Hiring Recommendation (Highly Recommended / Recommended / Consider with Improvement)", type: "enum", required: true, options: ["Highly Recommended", "Recommended", "Consider with Improvement"] },
  ]);

  // Student → Company Feedback Form (Students evaluate company)
  const [studentToCompanyFields, setStudentToCompanyFields] = useState<FormField[]>([
    { id: "1", label: "How would you rate your overall internship experience?", type: "rating", required: true },
    { id: "2", label: "How relevant was the internship to your field of study?", type: "rating", required: true },
    { id: "3", label: "How satisfied are you with the learning outcomes?", type: "rating", required: true },
    { id: "4", label: "How would you rate the onboarding process?", type: "rating", required: true },
    { id: "5", label: "How supportive was the team or mentor?", type: "rating", required: true },
    { id: "6", label: "Did you gain practical knowledge during the internship?", type: "boolean", required: true },
    { id: "7", label: "What new skills did you learn?", type: "textarea", required: true },
    { id: "8", label: "How confident do you feel applying these skills?", type: "rating", required: true },
    { id: "9", label: "Were you given opportunities to work on real-time projects?", type: "boolean", required: true },
    { id: "10", label: "How would you rate your mentor's guidance?", type: "rating", required: true },
    { id: "11", label: "Was feedback provided regularly?", type: "boolean", required: true },
    { id: "12", label: "Was communication clear and effective?", type: "rating", required: true },
    { id: "13", label: "Did you feel comfortable asking questions?", type: "boolean", required: true },
    { id: "14", label: "How would you rate the work culture?", type: "rating", required: true },
    { id: "15", label: "Were tasks clearly assigned?", type: "boolean", required: true },
    { id: "16", label: "Was the workload manageable?", type: "rating", required: true },
    { id: "17", label: "Did the internship meet your expectations?", type: "boolean", required: true },
    { id: "18", label: "Were project requirements clearly explained?", type: "boolean", required: true },
    { id: "19", label: "How challenging was your project?", type: "enum", required: true, options: ["easy", "moderate", "difficult"] },
    { id: "20", label: "Did the project help improve your skills?", type: "boolean", required: true },
    { id: "21", label: "Rate your project experience.", type: "rating", required: true },
    { id: "22", label: "Would you recommend this internship to others?", type: "boolean", required: true },
    { id: "23", label: "Are you interested in future opportunities with us?", type: "boolean", required: true },
    { id: "24", label: "Rate your overall satisfaction.", type: "rating", required: true },
    { id: "25", label: "What did you like most about the internship?", type: "textarea", required: true },
    { id: "26", label: "What challenges did you face?", type: "textarea", required: true },
    { id: "27", label: "What improvements would you suggest?", type: "textarea", required: true },
    { id: "28", label: "Any additional comments?", type: "textarea", required: false },
    { id: "29", label: "Do you feel the internship duration was sufficient for learning?", type: "boolean", required: true },
    { id: "30", label: "Do you think performance-based stipend after 3 months is fair?", type: "boolean", required: true },
    { id: "31", label: "Would you continue if offered a stipend after evaluation?", type: "boolean", required: true },
  ]);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<FormTemplate[]>([]);
  const [saveFeedback, setSaveFeedback] = useState<string>("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as FormTemplate[];
      if (Array.isArray(parsed)) {
        setSavedTemplates(parsed);

        const savedCompanyForm = parsed.find(
          (entry) => entry.id === "active-companyToStudent" && entry.formType === "companyToStudent"
        );
        const savedStudentForm = parsed.find(
          (entry) => entry.id === "active-studentToCompany" && entry.formType === "studentToCompany"
        );

        if (savedCompanyForm?.fields?.length) {
          setCompanyToStudentFields(savedCompanyForm.fields.map((field) => ({ ...field })));
        }

        if (savedStudentForm?.fields?.length) {
          setStudentToCompanyFields(savedStudentForm.fields.map((field) => ({ ...field })));
        }
      }
    } catch {
      // Ignore malformed local storage payloads and start clean.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(savedTemplates));
  }, [savedTemplates]);

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  // Get current fields based on active form type
  const fields = activeFormType === "companyToStudent" ? companyToStudentFields : studentToCompanyFields;
  const setFields = activeFormType === "companyToStudent" ? setCompanyToStudentFields : setStudentToCompanyFields;

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "New Field",
      type: "text",
      required: false,
    };
    setFields([...fields, newField]);
    setEditingField(newField.id);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const handleSaveCurrentForm = () => {
    const confirmed = window.confirm("Save changes to this form?");
    if (!confirmed) {
      return;
    }

    const fixedId = `active-${activeFormType}`;
    const fixedName = activeFormType === "companyToStudent" ? "Company to Student Form" : "Student to Company Form";
    const nextRecord: FormTemplate = {
      id: fixedId,
      name: fixedName,
      formType: activeFormType,
      fields: fields.map((field) => ({ ...field })),
    };

    setSavedTemplates((previous) => {
      const withoutCurrentType = previous.filter((entry) => entry.formType !== activeFormType);
      return [nextRecord, ...withoutCurrentType];
    });

    setShowSaveSuccess(true);
    setSaveFeedback("Form saved successfully.");
    window.setTimeout(() => {
      setSaveFeedback("");
      setShowSaveSuccess(false);
    }, 2500);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case "text": return Type;
      case "textarea": return AlignLeft;
      case "slider": return Sliders;
      case "rating": return Star;
      case "boolean": return CheckCircle2;
      case "enum": return MessageSquare;
      default: return Type;
    }
  };

  const panelHeightClass = isFullscreen
    ? "max-h-[calc(100vh-250px)]"
    : "max-h-[calc(100vh-300px)]";

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6 pb-3 sm:pt-8 sm:pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Form Editor</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                  Form Editor
                </h1>
                <p className="text-muted-foreground text-lg">
                  Customize feedback form fields and evaluation criteria
                </p>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Form Type
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-1.5 shadow-md inline-flex gap-1 flex-wrap w-full sm:w-auto">
                    <button
                      onClick={() => setActiveFormType("companyToStudent")}
                      className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 whitespace-nowrap ${
                        activeFormType === "companyToStudent"
                          ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Company → Student
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveFormType("studentToCompany")}
                      className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 whitespace-nowrap ${
                        activeFormType === "studentToCompany"
                          ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Student → Company
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
                size="lg"
                onClick={() => setIsFullscreen((previous) => !previous)}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullscreen ? "Exit Fullscreen" : "Open Fullscreen"}
              </Button>

              <Button className="flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto" size="lg" onClick={handleSaveCurrentForm}>
                <Save className="w-4 h-4" />
                Save Form
              </Button>

              <AnimatePresence>
                {showSaveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold"
                  >
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 16 }}
                      className="inline-flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.span>
                    Saved
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {saveFeedback && (
              <div className="mb-2 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 inline-block">
                {saveFeedback}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px]"
            onClick={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>

      {/* Two-Panel Layout */}
      <div
        className={
          isFullscreen
            ? "fixed inset-4 z-50 bg-background border border-border rounded-2xl shadow-2xl overflow-y-auto p-4 sm:p-6"
            : "max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8"
        }
      >
        {/* Form Type Indicator */}
        <motion.div
          key={activeFormType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              {activeFormType === "companyToStudent" ? (
                <>
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Editing: Company → Student Feedback Form
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This form is used by companies to evaluate student interns
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <GraduationCap className="w-5 h-5 text-teal-600" />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Editing: Student → Company Feedback Form
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This form is used by students to evaluate their internship experience
                    </p>
                  </div>
                </>
              )}
            </div>

            {isFullscreen && (
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleSaveCurrentForm}
                  size="sm"
                  className="w-full sm:w-auto flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Form
                </Button>
                <Button
                  onClick={() => setIsFullscreen(false)}
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Minimize2 className="w-4 h-4" />
                  Exit Fullscreen
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] gap-6 xl:gap-8">
          {/* Left Panel - Field Configuration */}
          <motion.div
            key={`config-${activeFormType}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl shadow-lg"
          >
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-md">
                    <Settings2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Field Configuration
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {fields.length} field{fields.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={addField}
                  size="sm"
                  className="flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Field
                </Button>
              </div>
            </div>

            <div className={`p-6 ${panelHeightClass} overflow-y-auto`}>
              <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {fields.map((field, index) => {
                    const FieldIcon = getFieldIcon(field.type);
                    return (
                      <Reorder.Item
                        value={field}
                        key={field.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-r from-secondary/30 to-secondary/50 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <div className="flex items-start gap-3">
                          {/* Drag Handle */}
                          <button
                            type="button"
                            className="mt-2 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="w-5 h-5" />
                          </button>

                          {/* Field Icon */}
                          <div className="mt-2 p-2 bg-primary/10 rounded-lg">
                            <FieldIcon className="w-4 h-4 text-primary" />
                          </div>

                          {/* Field Content */}
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Field Label</Label>
                                {editingField === field.id ? (
                                  <Input
                                    value={field.label}
                                    onChange={(e) =>
                                      updateField(field.id, {
                                        label: e.target.value,
                                      })
                                    }
                                    onBlur={() => setEditingField(null)}
                                    autoFocus
                                    className="font-semibold"
                                  />
                                ) : (
                                  <div
                                    onClick={() => setEditingField(field.id)}
                                    className="px-3 py-2 bg-card border border-border rounded-lg cursor-text hover:border-primary transition-colors font-semibold"
                                  >
                                    {field.label}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Field Type</Label>
                                <Select
                                  value={field.type}
                                  onValueChange={(value) =>
                                    updateField(field.id, {
                                      type: value as FormField["type"],
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">📝 Text Input</SelectItem>
                                    <SelectItem value="textarea">📄 Text Area</SelectItem>
                                    <SelectItem value="slider">📊 Rating Slider</SelectItem>
                                    <SelectItem value="rating">⭐ Star Rating</SelectItem>
                                    <SelectItem value="boolean">✅ Yes / No</SelectItem>
                                    <SelectItem value="enum">📋 Multiple Choice</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      required: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-foreground">
                                  Required field
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeField(field.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Reorder.Item>
                    );
                  })}
                </AnimatePresence>

                {fields.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground bg-secondary/30 rounded-xl border-2 border-dashed border-border">
                    <Settings2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">No fields yet</p>
                    <p className="text-sm mt-1">Click "Add Field" to get started</p>
                  </div>
                )}
              </Reorder.Group>
            </div>
          </motion.div>

          {/* Right Panel - Live Preview */}
          <motion.div
            key={`preview-${activeFormType}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl shadow-lg"
          >
            <div className="p-6 border-b border-border bg-gradient-to-r from-teal-50 to-cyan-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow-md">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Live Preview
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    How the form will appear
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 ${panelHeightClass} overflow-y-auto`}>
              <div className="space-y-6">
                {fields.map((field) => (
                  <motion.div
                    key={field.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 p-4 rounded-xl bg-secondary/20 border border-border/50"
                  >
                    <Label className="font-semibold">
                      {field.label}
                      {field.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </Label>
                    {field.type === "text" && (
                      <Input placeholder={`Enter ${field.label.toLowerCase()}`} />
                    )}
                    {field.type === "textarea" && (
                      <textarea
                        className="flex min-h-[100px] w-full rounded-lg border border-input bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                    {field.type === "slider" && (
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          defaultValue="3"
                          className="flex-1"
                        />
                        <span className="text-sm font-bold text-primary w-12">
                          3/5
                        </span>
                      </div>
                    )}
                    {field.type === "rating" && (
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-6 h-6 text-amber-400 fill-amber-400"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    {field.type === "boolean" && (
                      <div className="flex gap-2">
                        <button type="button" className="px-3 py-2 rounded-lg border border-border bg-secondary/40 text-sm font-semibold">Yes</button>
                        <button type="button" className="px-3 py-2 rounded-lg border border-border bg-secondary/40 text-sm font-semibold">No</button>
                      </div>
                    )}
                    {field.type === "enum" && (
                      <div className="flex flex-wrap gap-2">
                        {(field.options ?? ["easy", "moderate", "difficult"]).map((option) => (
                          <button
                            key={option}
                            type="button"
                            className="px-3 py-2 rounded-lg border border-border bg-secondary/40 text-sm font-semibold hover:bg-secondary transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {fields.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground bg-secondary/30 rounded-xl border-2 border-dashed border-border">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Preview will appear here</p>
                    <p className="text-sm mt-1">Add fields to see the preview</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
