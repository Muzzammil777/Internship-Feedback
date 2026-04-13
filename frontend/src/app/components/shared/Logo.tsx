import { motion } from "motion/react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  clickable?: boolean;
  onClick?: () => void;
}

export default function Logo({
  size = "md",
  variant = "full",
  clickable = false,
  onClick,
}: LogoProps) {
  const sizeClasses = {
    sm: { width: 32, height: 32, fontSize: "text-sm" },
    md: { width: 40, height: 40, fontSize: "text-base" },
    lg: { width: 48, height: 48, fontSize: "text-lg" },
  };

  const dimensions = sizeClasses[size];

  const content = (
    <>
      {/* Logo Icon — company favicon from /public/favicon.png */}
      <motion.div
        whileHover={clickable ? { scale: 1.05 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative flex-shrink-0"
      >
        <img
          src="/favicon.png"
          alt="MoviCloud Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="drop-shadow-lg object-contain"
          style={{ width: dimensions.width, height: dimensions.height }}
        />
      </motion.div>

      {/* Logo Text */}
      {variant === "full" && (
        <div className="flex flex-col">
          <span
            className={`font-bold text-foreground ${dimensions.fontSize} leading-tight tracking-tight`}
          >
            MoviCloud
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            Internship Platform
          </span>
        </div>
      )}
    </>
  );

  if (clickable && onClick) {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-1 -m-1"
      >
        {content}
      </motion.button>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}
