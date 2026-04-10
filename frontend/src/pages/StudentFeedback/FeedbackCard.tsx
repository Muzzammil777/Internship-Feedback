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

type FeedbackCardProps = {
  feedback: FeedbackItem;
  onStartForm: (feedback: FeedbackItem) => void;
  onViewReview: (feedback: FeedbackItem) => void;
};

export default function FeedbackCard({ feedback, onStartForm, onViewReview }: FeedbackCardProps) {
  const isPending = feedback.status === "pending";

  return (
    <div className={`bg-surface-container-lowest rounded-2xl p-6 border flex flex-col shadow-sm ${
      isPending ? "border-primary" : "border-surface-variant opacity-80"
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${isPending ? "bg-primary-container text-primary" : "bg-secondary-container text-secondary"}`}>
          <span className="material-symbols-outlined">{isPending ? "assignment" : "check_circle"}</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
          isPending ? "bg-error-container text-error" : "bg-secondary/10 text-secondary"
        }`}>
          {isPending ? "Action Needed" : "Submitted"}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-1">{feedback.title}</h3>
      <p className="text-xs text-outline mb-6">{feedback.description}</p>
      <div className="mt-auto pt-4 border-t border-surface-variant flex items-center justify-between">
        <span className="text-xs font-medium text-outline">
          {isPending ? `Due: ${feedback.dueDate}` : `Submitted: ${feedback.submittedDate}`}
        </span>
        <button
          className={`text-xs font-bold px-4 py-2 rounded-lg ${
            isPending
              ? "bg-primary text-white hover:opacity-90"
              : "text-primary hover:underline"
          }`}
          onClick={() => (isPending ? onStartForm(feedback) : onViewReview(feedback))}
        >
          {isPending ? "Start Form" : "View Review"}
        </button>
      </div>
    </div>
  );
}