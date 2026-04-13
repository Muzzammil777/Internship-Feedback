import { motion } from "motion/react";
import { X } from "lucide-react";

interface SkillTagProps {
  skill: string;
  onRemove?: (skill: string) => void;
  variant?: "default" | "primary" | "accent";
}

export default function SkillTag({
  skill,
  onRemove,
  variant = "default",
}: SkillTagProps) {
  const variantClasses = {
    default: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 shadow-sm",
    primary: "bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-md",
    accent: "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-200 shadow-sm",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05, y: -2, shadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)" }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold ${variantClasses[variant]} transition-shadow`}
    >
      <span>{skill}</span>
      {onRemove && (
        <motion.button
          type="button"
          onClick={() => onRemove(skill)}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </motion.div>
  );
}
