import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "accent";
}

export default function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  color = "primary",
}: StatusCardProps) {
  const colorClasses = {
    primary: {
      icon: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50",
      card: "border-indigo-100",
    },
    success: {
      icon: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50",
      card: "border-emerald-100",
    },
    warning: {
      icon: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/50",
      card: "border-amber-100",
    },
    accent: {
      icon: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/50",
      card: "border-teal-100",
    },
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.2 }
      }}
      className={`bg-card border ${colorClasses[color].card} rounded-2xl p-6 cursor-default shadow-md hover:shadow-xl transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`p-3.5 rounded-xl ${colorClasses[color].icon}`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
}
