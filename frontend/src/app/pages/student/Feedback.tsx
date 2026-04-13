import { motion } from "motion/react";
import { useState } from "react";
import RatingBar from "../../components/shared/RatingBar";
import StarRating from "../../components/shared/StarRating";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Building2, MessageSquare, TrendingUp, Award, CheckCircle2, Send, Star, Users, Coffee, Lightbulb, GraduationCap } from "lucide-react";

export default function StudentFeedback() {
  const [activeTab, setActiveTab] = useState<"company" | "student">("company");

  const [studentFeedback, setStudentFeedback] = useState({
    learningExperience: 0,
    mentorship: 0,
    workEnvironment: 0,
    communication: 0,
    strengths: "",
    improvements: "",
    overallComments: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (category: string, value: number) => {
    setStudentFeedback({ ...studentFeedback, [category]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the feedback to your backend
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
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Feedback</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Internship Feedback
            </h1>
            <p className="text-muted-foreground text-lg">
              View company evaluation and share your internship experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Toggle Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-2xl p-2 shadow-md inline-flex gap-2">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "company"
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Feedback
              </div>
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Feedback
              </div>
            </button>
          </div>
        </motion.div>

        {/* Company Feedback - READ ONLY */}
        {activeTab === "company" && (
          <motion.div
            key="company-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg shadow-primary/50">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Company Evaluation
                </h2>
                <p className="text-sm text-muted-foreground mt-1">TechCorp Inc.</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold uppercase tracking-wide border border-blue-200">
              Read Only
            </div>
          </div>

          {/* Overall Rating */}
          <div className="mb-10 pb-8 border-b border-border">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Overall Performance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Evaluated by Sarah Mitchell, Engineering Manager
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating value={5} readonly size="lg" />
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                      5.0
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Outstanding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Categories */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-foreground mb-6">Performance Metrics</h3>
            <div className="space-y-5">
              <RatingBar label="Technical Skills" value={5} color="primary" />
              <RatingBar label="Work Quality" value={5} color="primary" />
              <RatingBar label="Communication" value={4} color="accent" />
              <RatingBar label="Teamwork" value={5} color="primary" />
              <RatingBar label="Problem Solving" value={5} color="primary" />
              <RatingBar label="Initiative" value={4} color="accent" />
              <RatingBar label="Professionalism" value={5} color="primary" />
              <RatingBar label="Learning Ability" value={5} color="success" />
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-5 mb-8">
            <h3 className="text-lg font-bold text-foreground">Detailed Feedback</h3>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Strengths</h3>
              </div>
              <p className="text-foreground leading-relaxed">
                Alex demonstrated exceptional technical skills throughout the
                internship. Their ability to quickly learn new technologies and
                apply them effectively was impressive. The quality of code produced
                was consistently high, following best practices and maintaining
                excellent documentation. Alex also showed strong problem-solving
                abilities and took initiative on several key features.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-md">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Areas for Growth
                </h3>
              </div>
              <p className="text-foreground leading-relaxed">
                While Alex's technical abilities are strong, there's room for
                improvement in cross-team communication. Participating more
                actively in team meetings and being more proactive in asking
                questions would benefit future professional development.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Overall Comments
                </h3>
              </div>
              <p className="text-foreground leading-relaxed">
                Alex has been an outstanding intern and a valuable member of our
                team. We would highly recommend them for future opportunities and
                would welcome them back for a full-time position. Their
                contributions to the e-commerce platform redesign were significant,
                and they consistently exceeded expectations.
              </p>
            </motion.div>
          </div>

          {/* Recommendation */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Hiring Recommendation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Would you hire this intern for a full-time position?
                  </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/50">
                  <CheckCircle2 className="w-5 h-5" />
                  Highly Recommended
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        )}

        {/* Student Feedback About Company - EDITABLE */}
        {activeTab === "student" && (
          <motion.div
            key="student-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg shadow-teal-500/50">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Feedback About Company
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your internship experience at TechCorp Inc.
                </p>
              </div>
            </div>
            {isSubmitted && (
              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wide border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Submitted
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Categories */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Rate Your Experience
              </h3>
              <div className="space-y-6">
                {/* Learning Experience */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">
                        Learning Experience
                      </span>
                    </div>
                    <StarRating
                      value={studentFeedback.learningExperience}
                      onChange={(value) => handleRatingChange("learningExperience", value)}
                      readonly={isSubmitted}
                      size="md"
                    />
                  </div>
                </div>

                {/* Mentorship */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">
                        Mentorship Quality
                      </span>
                    </div>
                    <StarRating
                      value={studentFeedback.mentorship}
                      onChange={(value) => handleRatingChange("mentorship", value)}
                      readonly={isSubmitted}
                      size="md"
                    />
                  </div>
                </div>

                {/* Work Environment */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 rounded-lg">
                        <Coffee className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">
                        Work Environment
                      </span>
                    </div>
                    <StarRating
                      value={studentFeedback.workEnvironment}
                      onChange={(value) => handleRatingChange("workEnvironment", value)}
                      readonly={isSubmitted}
                      size="md"
                    />
                  </div>
                </div>

                {/* Communication */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">
                        Communication & Support
                      </span>
                    </div>
                    <StarRating
                      value={studentFeedback.communication}
                      onChange={(value) => handleRatingChange("communication", value)}
                      readonly={isSubmitted}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Feedback */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Detailed Feedback
              </h3>

              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-base font-bold text-foreground">
                    What did the company do well?
                  </Label>
                </div>
                <Textarea
                  value={studentFeedback.strengths}
                  onChange={(e) =>
                    setStudentFeedback({ ...studentFeedback, strengths: e.target.value })
                  }
                  placeholder="Describe the company's strengths, positive aspects of the internship, what you appreciated..."
                  rows={4}
                  className="leading-relaxed text-base"
                  disabled={isSubmitted}
                />
              </div>

              {/* Improvements */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-base font-bold text-foreground">
                    What could be improved?
                  </Label>
                </div>
                <Textarea
                  value={studentFeedback.improvements}
                  onChange={(e) =>
                    setStudentFeedback({ ...studentFeedback, improvements: e.target.value })
                  }
                  placeholder="Suggest areas for improvement, challenges faced, constructive feedback..."
                  rows={4}
                  className="leading-relaxed text-base"
                  disabled={isSubmitted}
                />
              </div>

              {/* Overall Comments */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-base font-bold text-foreground">
                    Overall Experience
                  </Label>
                </div>
                <Textarea
                  value={studentFeedback.overallComments}
                  onChange={(e) =>
                    setStudentFeedback({
                      ...studentFeedback,
                      overallComments: e.target.value,
                    })
                  }
                  placeholder="Share your overall thoughts about the internship, key takeaways, recommendations..."
                  rows={5}
                  className="leading-relaxed text-base"
                  disabled={isSubmitted}
                />
              </div>
            </div>

            {/* Submit Button */}
            {!isSubmitted && (
              <div className="flex justify-end pt-6 border-t border-border">
                <Button
                  type="submit"
                  size="lg"
                  className="flex items-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </div>
            )}

            {isSubmitted && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Thank you for your feedback!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your feedback has been submitted successfully and will help improve future internship programs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
