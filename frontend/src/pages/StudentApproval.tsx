import { useState } from "react";
import DocumentForm from "./StudentApproval/DocumentForm";
import DocumentTable from "./StudentApproval/DocumentTable";

type DocumentRow = {
  id: string;
  documentName: string;
  companyName: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

type NewDocument = {
  companyName: string;
  roleTitle: string;
  companyEmail: string;
  startDate: string;
  endDate: string;
  docType: string;
  fileName: string;
};

export default function StudentApproval() {
  const [documents, setDocuments] = useState<DocumentRow[]>([
    {
      id: "doc-1",
      documentName: "Offer_Letter_TechCorp.pdf",
      companyName: "TechCorp Systems",
      date: "Oct 12, 2024",
      status: "Approved",
    },
    {
      id: "doc-2",
      documentName: "NOC_Request_Form.pdf",
      companyName: "TechCorp Systems",
      date: "Nov 01, 2024",
      status: "Pending",
    },
    {
      id: "doc-3",
      documentName: "Initial_Offer.pdf",
      companyName: "Startup Inc.",
      date: "Sep 15, 2024",
      status: "Rejected",
    },
  ]);

  const addDocument = (document: NewDocument) => {
    const newDocument: DocumentRow = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      documentName: document.fileName,
      companyName: document.companyName,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Pending",
    };

    setDocuments((prev) => [newDocument, ...prev]);

    // Update stages: mark "Docs Submitted" as completed
    const savedStages = localStorage.getItem("studentStages");
    if (savedStages) {
      const stages = JSON.parse(savedStages);
      const updatedStages = stages.map((stage: any) =>
        stage.name === "Docs Submitted" ? { ...stage, completed: true } : stage
      );
      localStorage.setItem("studentStages", JSON.stringify(updatedStages));
    }

    // Add notification
    const newNotification = {
      icon: "upload_file",
      title: "Document Submitted",
      description: `Your ${document.docType} for ${document.companyName} has been submitted for approval.`,
      time: "Just now",
    };

    const savedNotifications = localStorage.getItem("studentNotifications");
    const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
    notifications.unshift(newNotification);
    localStorage.setItem("studentNotifications", JSON.stringify(notifications));
  };

  return (
    <div className="p-8 space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Internship Approval Request</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Submit your placement details for official academic approval.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DocumentForm onSubmit={addDocument} />
        <DocumentTable documents={documents} />
      </div>
    </div>
  );
}
