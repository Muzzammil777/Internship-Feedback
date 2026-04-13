import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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
import { Plus, Trash2, Save, GripVertical, Eye, Settings2, Type, AlignLeft, Sliders, Star, Building2, GraduationCap } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "slider" | "textarea" | "rating";
  required: boolean;
}

type FormType = "companyToStudent" | "studentToCompany";

export default function CompanyFormEditor() {
  const [activeFormType, setActiveFormType] = useState<FormType>("companyToStudent");

  // Company → Student Feedback Form (Company evaluates students)
  const [companyToStudentFields, setCompanyToStudentFields] = useState<FormField[]>([
    { id: "1", label: "Technical Skills", type: "slider", required: true },
    { id: "2", label: "Work Quality", type: "slider", required: true },
    { id: "3", label: "Communication", type: "slider", required: true },
    { id: "4", label: "Teamwork", type: "slider", required: true },
  ]);

  // Student → Company Feedback Form (Students evaluate company)
  const [studentToCompanyFields, setStudentToCompanyFields] = useState<FormField[]>([
    { id: "1", label: "Learning Experience", type: "rating", required: true },
    { id: "2", label: "Mentorship Quality", type: "rating", required: true },
    { id: "3", label: "Work Environment", type: "slider", required: true },
    { id: "4", label: "Communication & Support", type: "slider", required: true },
  ]);

  const [editingField, setEditingField] = useState<string | null>(null);

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

  const getFieldIcon = (type: string) => {
    switch (type) {
      case "text": return Type;
      case "textarea": return AlignLeft;
      case "slider": return Sliders;
      case "rating": return Star;
      default: return Type;
    }
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
              </div>
              <Button className="flex items-center gap-2 shadow-lg" size="lg">
                <Save className="w-4 h-4" />
                Save Templates
              </Button>
            </div>

            {/* Form Type Toggle */}
            <div className="bg-card border border-border rounded-2xl p-1.5 sm:p-2 shadow-md inline-flex gap-1 sm:gap-2 flex-wrap">
              <button
                onClick={() => setActiveFormType("companyToStudent")}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeFormType === "companyToStudent"
                    ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company → Student Form
                </div>
              </button>
              <button
                onClick={() => setActiveFormType("studentToCompany")}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeFormType === "studentToCompany"
                    ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student → Company Form
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two-Panel Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Form Type Indicator */}
        <motion.div
          key={activeFormType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {fields.map((field, index) => {
                    const FieldIcon = getFieldIcon(field.type);
                    return (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        layout
                        className="bg-gradient-to-r from-secondary/30 to-secondary/50 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
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
                      </motion.div>
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
              </div>
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

            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
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
