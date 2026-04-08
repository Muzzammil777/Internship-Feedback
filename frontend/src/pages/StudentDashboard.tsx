export default function StudentDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Internship Portfolio</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Summer 2024 Cycle • Full-stack Development Track</p>
        </div>
      </div>

      {/* Milestone Progress Tracker (Bento Style) */}
      <section className="bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden border border-surface-variant">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/10 blur-[100px] -z-10"></div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="headline text-lg font-bold">Internship Status Overview</h2>
          <span className="text-sm font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full">Active Internship</span>
        </div>
        <div className="relative flex justify-between items-start w-full">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-high -z-0">
            <div className="h-full bg-gradient-to-r from-secondary via-secondary to-primary w-2/5 rounded-full"></div>
          </div>
          {/* Milestones */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white ring-8 ring-white shadow-md">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary text-center">Docs<br/>Submitted</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white ring-8 ring-white shadow-md">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary text-center">Docs<br/>Approved</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary text-center">Midterm<br/>Feedback</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline ring-8 ring-white">
              <span className="material-symbols-outlined text-sm">grading</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline text-center">Final<br/>Evaluation</span>
          </div>
        </div>
      </section>

      {/* Pending Tasks and Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pending Tasks */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-error-container/30 rounded-lg flex items-center justify-center text-error">
                <span className="material-symbols-outlined">assignment_late</span>
             </div>
             <h3 className="headline text-lg font-bold">Pending Tasks</h3>
          </div>
          <div className="space-y-4">
             <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border-l-4 border-error">
                <div>
                   <p className="font-bold text-sm text-on-surface">Midterm Logbook</p>
                   <p className="text-xs text-outline mt-1">Due in 2 days</p>
                </div>
                <button className="text-xs font-bold bg-error text-white px-3 py-1.5 rounded-lg hover:opacity-90">Start</button>
             </div>
             <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border-l-4 border-primary">
                <div>
                   <p className="font-bold text-sm text-on-surface">Updated NOC Upload</p>
                   <p className="text-xs text-outline mt-1">Requested by faculty</p>
                </div>
                <button className="text-xs font-bold border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary-container/20">Upload</button>
             </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-secondary-container/30 rounded-lg flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">notifications_active</span>
             </div>
             <h3 className="headline text-lg font-bold">Recent Notifications</h3>
          </div>
          <div className="space-y-4">
             <div className="flex gap-4 items-start">
               <span className="material-symbols-outlined text-secondary bg-secondary-container/20 p-2 rounded-full text-sm mt-1">check_circle</span>
               <div>
                 <p className="font-bold text-sm">Offer Letter Approved</p>
                 <p className="text-xs text-on-surface-variant mt-1">Your initial document was verified by Dr. Robert Miller.</p>
                 <p className="text-[10px] text-outline mt-2">2 hours ago</p>
               </div>
             </div>
             <div className="flex gap-4 items-start">
               <span className="material-symbols-outlined text-primary bg-primary-container/20 p-2 rounded-full text-sm mt-1">edit_document</span>
               <div>
                 <p className="font-bold text-sm">Feedback Form Assigned</p>
                 <p className="text-xs text-on-surface-variant mt-1">You have a new "Midterm Logbook" assigned.</p>
                 <p className="text-[10px] text-outline mt-2">1 day ago</p>
               </div>
             </div>
          </div>
        </div>

      </section>
    </div>
  );
}

