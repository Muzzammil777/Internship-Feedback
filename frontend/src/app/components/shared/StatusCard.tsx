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
      icon: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40",
      card: "border-indigo-100",
    },
    success: {
      icon: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40",
      card: "border-emerald-100",
    },
    warning: {
      icon: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/40",
      card: "border-amber-100",
    },
    accent: {
      icon: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/40",
      card: "border-teal-100",
    },
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={`relative bg-card border ${colorClasses[color].card} rounded-2xl p-5 cursor-default shadow-md hover:shadow-xl transition-shadow duration-200 h-[148px] flex flex-col justify-center overflow-visible`}
    >
      {/* Icon — absolutely pinned top-right, isolated from text flow */}
      <motion.div
        whileHover={{ scale: 1.12, rotate: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`absolute top-4 right-4 p-3 rounded-xl ${colorClasses[color].icon}`}
        style={{ transformOrigin: "center" }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>

      {/* Text — padded right so it never overlaps the icon */}
      <div className="pr-14 flex flex-col gap-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide leading-tight">
          {title}
        </p>
        <p className="text-2xl font-bold text-foreground leading-tight">
          {value}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground leading-snug">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
