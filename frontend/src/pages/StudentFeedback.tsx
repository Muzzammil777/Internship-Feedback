export default function StudentFeedback() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Feedback Portal</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Submit and review your weekly logbooks and feedback forms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Pending Form */}
         <div className="bg-surface-container-lowest rounded-2xl p-6 border border-primary flex flex-col shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="bg-primary-container text-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined">assignment</span>
               </div>
               <span className="bg-error-container text-error text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Action Needed</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Mid-term Logbook</h3>
            <p className="text-xs text-outline mb-6">Reflect on your first half of the internship. Provide details about assignments and challenges.</p>
            <div className="mt-auto pt-4 border-t border-surface-variant flex items-center justify-between">
               <span className="text-xs font-medium text-outline">Due: Oct 20, 2024</span>
               <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90">Start Form</button>
            </div>
         </div>

         {/* Submitted Form */}
         <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant flex flex-col opacity-80">
            <div className="flex justify-between items-start mb-4">
               <div className="bg-secondary-container text-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined">check_circle</span>
               </div>
               <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Submitted</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Week 1 Reflection</h3>
            <p className="text-xs text-outline mb-6">Initial onboarding and orientation reflection details.</p>
            <div className="mt-auto pt-4 border-t border-surface-variant flex items-center justify-between">
               <span className="text-xs font-medium text-outline">Submitted: Sep 07, 2024</span>
               <button className="text-primary text-xs font-bold hover:underline">View Review</button>
            </div>
         </div>
      </div>
    </div>
  );
}
