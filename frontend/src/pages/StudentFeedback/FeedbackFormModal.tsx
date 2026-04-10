import { useState, type FormEvent } from "react";

type FeedbackItem = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "submitted";
  dueDate: string;
  submittedDate?: string;
  answers?: {
    tasks: string;
    challenges: string;
    learnings: string;
    remarks: string;
  };
};

type FeedbackFormModalProps = {
  feedback: FeedbackItem;
  onSubmit: (answers: FeedbackItem["answers"]) => void;
  onClose: () => void;
  successMessage: string;
};

export default function FeedbackFormModal({ feedback, onSubmit, onClose, successMessage }: FeedbackFormModalProps) {
  const [formData, setFormData] = useState({
    tasks: "",
    challenges: "",
    learnings: "",
    remarks: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.tasks.trim()) newErrors.tasks = "This field is required.";
    if (!formData.challenges.trim()) newErrors.challenges = "This field is required.";
    if (!formData.learnings.trim()) newErrors.learnings = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-on-surface">{feedback.title}</h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {successMessage ? (
          <div className="text-center py-8">
            <div className="text-secondary text-lg font-bold mb-2">✓</div>
            <p className="text-secondary font-medium">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">What tasks did you complete?</label>
              <textarea
                value={formData.tasks}
                onChange={(e) => handleChange("tasks", e.target.value)}
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium resize-none"
                rows={3}
                placeholder="Describe the tasks you completed..."
              />
              {errors.tasks && <p className="mt-1 text-xs text-error">{errors.tasks}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">What challenges did you face?</label>
              <textarea
                value={formData.challenges}
                onChange={(e) => handleChange("challenges", e.target.value)}
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium resize-none"
                rows={3}
                placeholder="Describe any challenges you encountered..."
              />
              {errors.challenges && <p className="mt-1 text-xs text-error">{errors.challenges}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">What did you learn?</label>
              <textarea
                value={formData.learnings}
                onChange={(e) => handleChange("learnings", e.target.value)}
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium resize-none"
                rows={3}
                placeholder="Describe what you learned..."
              />
              {errors.learnings && <p className="mt-1 text-xs text-error">{errors.learnings}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Additional remarks (optional)</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium resize-none"
                rows={2}
                placeholder="Any additional comments..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-outline font-medium rounded-lg hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}