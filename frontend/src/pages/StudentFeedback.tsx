import { useState } from "react";
import FeedbackCard from "./StudentFeedback/FeedbackCard";
import FeedbackFormModal from "./StudentFeedback/FeedbackFormModal";
import ReviewModal from "./StudentFeedback/ReviewModal";

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

export default function StudentFeedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: "midterm",
      title: "Mid-term Logbook",
      description: "Reflect on your first half of the internship. Provide details about assignments and challenges.",
      status: "pending",
      dueDate: "Oct 20, 2024",
    },
    {
      id: "weekly",
      title: "Week 1 Reflection",
      description: "Initial onboarding and orientation reflection details.",
      status: "submitted",
      dueDate: "",
      submittedDate: "Sep 07, 2024",
      answers: {
        tasks: "Completed initial setup and orientation sessions.",
        challenges: "Familiarizing with the codebase.",
        learnings: "Learned about the company's development process.",
        remarks: "Excited to start contributing.",
      },
    },
  ]);

  const [activeModal, setActiveModal] = useState<"form" | "review" | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const openFormModal = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setActiveModal("form");
  };

  const openReviewModal = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setActiveModal("review");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedFeedback(null);
    setSuccessMessage("");
  };

  const submitForm = (answers: FeedbackItem["answers"]) => {
    if (!selectedFeedback) return;

    const submittedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === selectedFeedback.id
          ? { ...fb, status: "submitted", submittedDate, answers }
          : fb
      )
    );

    // Update stages in localStorage
    const savedStages = localStorage.getItem("studentStages");
    if (savedStages) {
      const stages = JSON.parse(savedStages);
      const updatedStages = stages.map((stage: any) =>
        stage.name === "Midterm Feedback" ? { ...stage, completed: true } : stage
      );
      localStorage.setItem("studentStages", JSON.stringify(updatedStages));
    }

    // Add notification
    const savedNotifications = localStorage.getItem("studentNotifications");
    let notifications = [];
    if (savedNotifications) {
      notifications = JSON.parse(savedNotifications);
    }
    const newNotification = {
      icon: "check_circle",
      title: "Feedback Submitted",
      description: `Your ${selectedFeedback.title} has been submitted successfully.`,
      time: "Just now",
    };
    notifications.unshift(newNotification);
    localStorage.setItem("studentNotifications", JSON.stringify(notifications));

    setSuccessMessage("Feedback submitted successfully!");
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Feedback Portal</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Submit and review your weekly logbooks and feedback forms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            onStartForm={openFormModal}
            onViewReview={openReviewModal}
          />
        ))}
      </div>

      {activeModal === "form" && selectedFeedback && (
        <FeedbackFormModal
          feedback={selectedFeedback}
          onSubmit={submitForm}
          onClose={closeModal}
          successMessage={successMessage}
        />
      )}

      {activeModal === "review" && selectedFeedback && (
        <ReviewModal feedback={selectedFeedback} onClose={closeModal} />
      )}
    </div>
  );
}
