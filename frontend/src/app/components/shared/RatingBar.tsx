import { motion } from "motion/react";
import { Star } from "lucide-react";

interface RatingBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: "primary" | "accent" | "success";
  showStars?: boolean;
}

export default function RatingBar({
  label,
  value,
  maxValue = 5,
  color = "primary",
  showStars = true,
}: RatingBarProps) {
  const percentage = (value / maxValue) * 100;

  const colorClasses = {
    primary: {
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    accent: {
      gradient: "bg-gradient-to-r from-teal-500 to-cyan-600",
      bg: "bg-teal-50",
      text: "text-teal-600",
    },
    success: {
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          {showStars && (
            <div className="flex items-center gap-0.5">
              {[...Array(Math.floor(value))].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          )}
          <span className={`text-sm font-bold ${colorClasses[color].text}`}>
            {value.toFixed(1)}/{maxValue}
          </span>
        </div>
      </div>
      <div className={`h-3 ${colorClasses[color].bg} rounded-full overflow-hidden shadow-inner`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className={`h-full ${colorClasses[color].gradient} rounded-full shadow-sm relative overflow-hidden`}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
