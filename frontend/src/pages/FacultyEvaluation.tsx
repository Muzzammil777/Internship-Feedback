export default function FacultyEvaluation() {
  return (
    <div className="p-8 space-y-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Evaluation Portal</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Assign marks and remarks to student performance.</p>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden pb-8">
        {/* Student Selection Panel */}
        <div className="w-1/3 bg-surface-container-lowest rounded-2xl border border-surface-variant flex flex-col overflow-hidden hidden lg:flex">
          <div className="p-4 border-b border-surface-variant bg-surface-container-low/30">
            <h2 className="font-bold">Students Awaiting Evaluation</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {['Alex Chen', 'Maria Garcia', 'James Wilson', 'Nina Patel'].map((name, i) => (
              <button key={i} className={`w-full text-left p-4 rounded-xl transition-colors flex items-center gap-3 ${i === 0 ? 'bg-primary-container/20 border-l-4 border-primary' : 'hover:bg-surface-container-low'}`}>
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{name}</p>
                  <p className="text-[10px] text-outline leading-none mt-1">Mid-Term Report</p>
                </div>
                {i === 0 && <span className="material-symbols-outlined text-primary ml-auto text-sm">arrow_forward_ios</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Rubric */}
        <div className="flex-1 bg-surface-container-lowest rounded-2xl border border-surface-variant flex flex-col overflow-hidden">
          <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-container-low/30">
            <div>
              <h2 className="text-xl font-bold">Grading: Alex Chen</h2>
              <p className="text-xs text-outline mt-1 font-medium">Evaluation Type: Mid-Term Presentation</p>
            </div>
            <button className="text-primary hover:bg-primary-container px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              View Student Submission
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="space-y-6">
              {/* Company Feedback Read-Only */}
              <div className="bg-surface-container-low border border-surface-variant rounded-xl p-5 mb-8">
                <h3 className="font-bold text-sm tracking-widest uppercase text-outline mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-secondary">corporate_fare</span>
                  Company Mentor Feedback
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-variant/50">
                     <p className="text-[10px] uppercase font-bold text-outline">Overall Performance</p>
                     <p className="font-bold text-lg text-secondary">4.5 / 5.0</p>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-variant/50">
                     <p className="text-[10px] uppercase font-bold text-outline">Technical Skills</p>
                     <p className="font-bold text-lg text-secondary">4.0 / 5.0</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-variant/50 text-sm italic text-on-surface-variant">
                   "Alex has shown great potential and quickly adapted to our tech stack. Some improvement needed in code documentation."
                </div>
              </div>

              <h3 className="font-bold text-lg mb-4 border-b border-surface-variant pb-2">Faculty Evaluation Template</h3>

              {/* Grading Criteria 1 */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="font-bold text-sm">Technical Implementation</label>
                  <span className="text-sm font-black text-primary">0 / 20</span>
                </div>
                <input type="range" className="w-full accent-primary" min="0" max="20" defaultValue="0" />
                <div className="flex justify-between text-[10px] text-outline font-bold mt-2 uppercase">
                  <span>Needs Improvement (0-10)</span>
                  <span>Proficient (11-16)</span>
                  <span>Excellent (17-20)</span>
                </div>
              </div>

              {/* Grading Criteria 2 */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="font-bold text-sm">Communication & Presentation</label>
                  <span className="text-sm font-black text-primary">0 / 10</span>
                </div>
                <input type="range" className="w-full accent-primary" min="0" max="10" defaultValue="0" />
              </div>

              {/* Remarks Box */}
              <div>
                <label className="font-bold text-sm block mb-3">Faculty Remarks</label>
                <textarea 
                  className="w-full h-32 bg-surface-container-low border border-surface-variant rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Enter constructive feedback and observations here..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-surface-variant bg-surface-container-lowest flex justify-between items-center">
            <div className="text-sm font-bold">
              Total Score: <span className="text-2xl font-black text-primary ml-2">0/30</span>
            </div>
            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Submit Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
