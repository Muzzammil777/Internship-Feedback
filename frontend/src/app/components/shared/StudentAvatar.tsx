import { motion } from "motion/react";

interface StudentAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  gradient: string;
  withRing?: boolean;
  photoUrl?: string | null;
}

export default function StudentAvatar({
  name,
  size = "md",
  gradient,
  withRing = false,
  photoUrl,
}: StudentAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
    xl: "w-32 h-32 text-4xl",
  };

  return (
    <div className="relative">
      {withRing && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity`}
        />
      )}
      <motion.div
        whileHover={withRing ? { scale: 1.05 } : {}}
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl`}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${name} profile`}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="font-bold text-white">{initials}</span>
        )}
      </motion.div>
    </div>
  );
}
