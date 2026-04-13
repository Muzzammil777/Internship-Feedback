import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { Download, FileText, Award, Building2, File } from "lucide-react";

export default function StudentDownloads() {
  const downloadItems = [
    {
      title: "Company Feedback Report",
      description: "Complete evaluation from TechCorp Inc. including ratings and comments",
      icon: Building2,
      fileType: "PDF",
      size: "245 KB",
      color: "primary",
    },
    {
      title: "Internship Certificate",
      description: "Official completion certificate from your internship",
      icon: Award,
      fileType: "PDF",
      size: "180 KB",
      color: "accent",
    },
    {
      title: "Detailed Feedback Analysis",
      description: "Comprehensive breakdown of all evaluation metrics and progress",
      icon: FileText,
      fileType: "PDF",
      size: "320 KB",
      color: "success",
    },
  ];

  const colorClasses = {
    primary: {
      bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
      shadow: "shadow-indigo-500/50",
    },
    accent: {
      bg: "bg-gradient-to-br from-teal-500 to-cyan-600",
      shadow: "shadow-teal-500/50",
    },
    success: {
      bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/50",
    },
  };

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Downloads</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Downloads</h1>
                <p className="text-muted-foreground text-lg">
                  Download your feedback reports and certificates
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                <File className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">{downloadItems.length} files</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="space-y-5">
          {downloadItems.map((item, index) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 rounded-xl ${colors.bg} text-white shadow-lg ${colors.shadow}`}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-secondary rounded-lg text-xs font-semibold text-secondary-foreground">
                          {item.fileType}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button className="flex items-center gap-2 shadow-md" size="lg">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Download All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Button size="lg" variant="outline" className="flex items-center gap-2 shadow-md hover:shadow-lg">
            <Download className="w-5 h-5" />
            Download All Files (745 KB)
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
