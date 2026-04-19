import { motion } from "motion/react";

type LoadingAnimationProps = {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

type LoadingSpinnerProps = {
  className?: string;
};

export function LoadingSpinner({ className = "w-6 h-6" }: LoadingSpinnerProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600"
      />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[16%] rounded-full bg-blue-100/80"
      />
      <motion.span
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-2.5 w-2.5 rounded-full bg-blue-600"
      />
    </div>
  );
}

export default function LoadingAnimation({
  title = "Loading",
  description = "Please wait...",
  compact = false,
  className = "",
}: LoadingAnimationProps) {
  return (
    <div
      className={`flex items-center justify-center ${compact ? "min-h-[220px] py-8" : "min-h-[400px] px-4"} ${className}`}
    >
      <div className="text-center">
        <LoadingSpinner className="mx-auto mb-4 h-14 w-14" />

        <motion.h2
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-base font-semibold text-blue-700"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-1.5 text-sm text-blue-500"
        >
          {description}
        </motion.p>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
            className="h-2 w-2 rounded-full bg-blue-600"
          />
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.15 }}
            className="h-2 w-2 rounded-full bg-blue-400"
          />
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}
            className="h-2 w-2 rounded-full bg-blue-300"
          />
        </div>
      </div>
    </div>
  );
}