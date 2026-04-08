
import { useNavigate } from "react-router-dom";

export default function CompanyFeedback() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/company/confirmation');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col md:flex-row justify-between md:items-end gap-6 shadow-sm">
        <div>
          <span className="font-bold uppercase tracking-widest text-primary mb-2 block text-xs">
            Intern Performance Evaluation
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
            Review for Alex Rivera
          </h1>
          <p className="text-outline mt-2font-medium text-sm">Product Design Intern • Summer Cohort 2024</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl border border-surface-variant/50">
          <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-outline tracking-wider">Student ID</p>
            <p className="text-sm font-bold">ARC-2024-08</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant shadow-sm space-y-10">
        
        <div>
           <h2 className="text-xl font-bold mb-6 pb-2 border-b border-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">assessment</span>
              Performance Ratings
           </h2>
           <div className="space-y-6">
              {/* Technical Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/30 p-4 rounded-xl border border-surface-variant/50">
                 <div className="max-w-md">
                    <h3 className="font-bold text-base">Technical Aptitude</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">Rate the intern's proficiency with tools, technologies, and problem-solving abilities.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-outline">Poor</span>
                    <input type="range" min="1" max="10" defaultValue="8" className="w-32 accent-primary cursor-pointer" />
                    <span className="text-xs font-bold text-primary">Excellent</span>
                 </div>
              </div>

              {/* Collaboration Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/30 p-4 rounded-xl border border-surface-variant/50">
                 <div className="max-w-md">
                    <h3 className="font-bold text-base">Collaboration & Teamwork</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">Rate their ability to communicate effectively and work within a team environment.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-outline">Poor</span>
                    <input type="range" min="1" max="10" defaultValue="9" className="w-32 accent-primary cursor-pointer" />
                    <span className="text-xs font-bold text-primary">Excellent</span>
                 </div>
              </div>

              {/* Reliability Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/30 p-4 rounded-xl border border-surface-variant/50">
                 <div className="max-w-md">
                    <h3 className="font-bold text-base">Reliability & Professionalism</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">Rate their adherence to deadlines, attendance, and general workplace behavior.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-outline">Poor</span>
                    <input type="range" min="1" max="10" defaultValue="10" className="w-32 accent-primary cursor-pointer" />
                    <span className="text-xs font-bold text-primary">Excellent</span>
                 </div>
              </div>
           </div>
        </div>

        <div>
           <h2 className="text-xl font-bold mb-6 pb-2 border-b border-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">forum</span>
              Detailed Comments
           </h2>
           <div className="space-y-6">
              <div>
                 <label className="block text-sm font-bold mb-2">Strengths & Achievements</label>
                 <textarea 
                    className="w-full bg-surface-container-low border border-surface-variant rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-y"
                    placeholder="Describe what the intern performed exceptionally well..."
                 ></textarea>
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Areas for Improvement</label>
                 <textarea 
                    className="w-full bg-surface-container-low border border-surface-variant rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-y"
                    placeholder="Specify areas where the intern can focus on growing their skills..."
                 ></textarea>
              </div>
           </div>
        </div>

        <div className="pt-6 mt-6 border-t border-surface-variant flex justify-end gap-4">
           <button type="button" className="px-6 py-3 border-2 border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-low transition-colors text-sm">
             Save Draft
           </button>
           <button type="submit" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2 text-sm">
             Submit Evaluation
             <span className="material-symbols-outlined text-[18px]">send</span>
           </button>
        </div>
      </form>
    </div>
  );
}
