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

type ReviewModalProps = {
  feedback: FeedbackItem;
  onClose: () => void;
};

export default function ReviewModal({ feedback, onClose }: ReviewModalProps) {
  if (!feedback.answers) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-on-surface">{feedback.title} - Review</h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-sm text-outline">
            Submitted on: {feedback.submittedDate}
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-2">What tasks did you complete?</h3>
            <p className="text-sm text-outline bg-surface-container-low p-4 rounded-lg">{feedback.answers.tasks}</p>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-2">What challenges did you face?</h3>
            <p className="text-sm text-outline bg-surface-container-low p-4 rounded-lg">{feedback.answers.challenges}</p>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-2">What did you learn?</h3>
            <p className="text-sm text-outline bg-surface-container-low p-4 rounded-lg">{feedback.answers.learnings}</p>
          </div>

          {feedback.answers.remarks && (
            <div>
              <h3 className="font-bold text-on-surface mb-2">Additional remarks</h3>
              <p className="text-sm text-outline bg-surface-container-low p-4 rounded-lg">{feedback.answers.remarks}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}