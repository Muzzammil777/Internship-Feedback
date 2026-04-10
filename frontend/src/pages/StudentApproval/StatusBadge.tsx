type StatusBadgeProps = {
  status: "Approved" | "Pending" | "Rejected";
};

const statusClasses: Record<StatusBadgeProps["status"], string> = {
  Approved: "bg-secondary-container/30 text-secondary border border-secondary/20",
  Pending: "bg-primary-container/30 text-primary border border-primary/20",
  Rejected: "bg-error-container/30 text-error border border-error/20",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusClasses[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "Approved"
          ? "bg-secondary"
          : status === "Pending"
          ? "bg-primary"
          : "bg-error"
      }`}></span>
      {status}
    </span>
  );
}
