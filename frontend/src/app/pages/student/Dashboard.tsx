import { motion } from "motion/react";
import StatusCard from "../../components/shared/StatusCard";
import SkillTag from "../../components/shared/SkillTag";
import {
  CheckCircle2,
  Clock,
  Code,
  Briefcase,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function StudentDashboard() {
  const skills = ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"];

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary">Good morning!</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome back, Alex
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your internship progress and feedback
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatusCard
            title="Profile Status"
            value="Complete"
            description="All details filled"
            icon={CheckCircle2}
            color="success"
          />
          <StatusCard
            title="Feedback Status"
            value="Pending"
            description="Awaiting company review"
            icon={Clock}
            color="warning"
          />
          <StatusCard
            title="Internship Duration"
            value="12 weeks"
            description="Jan - Mar 2026"
            icon={Briefcase}
            color="accent"
          />
          <StatusCard
            title="Skills Acquired"
            value={skills.length}
            description="Technical skills"
            icon={Code}
            color="primary"
          />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/50">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Skills Developed
              </h2>
              <p className="text-sm text-muted-foreground">
                Technical competencies acquired during internship
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} variant="primary" />
            ))}
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/50">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Project Summary
              </h2>
              <p className="text-sm text-muted-foreground">
                Your main internship contribution
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold text-foreground mb-3">
                E-Commerce Platform Redesign
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Led the frontend development for a complete redesign of the company's
                e-commerce platform, implementing modern React patterns and improving
                page load times by 40%. Collaborated with the design team to create
                a responsive, accessible interface serving 100K+ daily users.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Company</p>
                <p className="font-bold text-foreground text-lg">TechCorp Inc.</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Role</p>
                <p className="font-bold text-foreground text-lg">Frontend Developer</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Team Size</p>
                <p className="font-bold text-foreground text-lg">8 members</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
