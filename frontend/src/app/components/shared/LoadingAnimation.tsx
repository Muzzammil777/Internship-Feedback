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
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[18%] rounded-full bg-primary/10"
      />
      <motion.span
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-2 w-2 rounded-full bg-primary"
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
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card/95 shadow-2xl px-6 py-7 text-center"
      >
        <LoadingSpinner className="mx-auto mb-5 h-16 w-16" />

        <motion.h2
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-semibold text-foreground"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          {description}
        </motion.p>

        <div className="mt-5 flex items-center justify-center gap-1.5">
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
            className="h-2 w-2 rounded-full bg-primary"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.15 }}
            className="h-2 w-2 rounded-full bg-primary/80"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}
            className="h-2 w-2 rounded-full bg-primary/60"
          />
        </div>
      </motion.div>
    </div>
  );
}