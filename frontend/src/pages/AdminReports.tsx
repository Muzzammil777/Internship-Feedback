export default function AdminReports() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Reports & Analytics</h1>
          <p className="text-outline mt-1 font-medium">System-wide monitoring and analytical reports for the academic year.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-high font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Fall 2024
          </button>
          <button className="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low border border-surface-variant/50">
          <p className="text-outline uppercase tracking-[0.05em] text-[10px] font-bold">Total Placements</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">842</h3>
          </div>
          <span className="text-[11px] text-primary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> +14% vs Last Year
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low border border-surface-variant/50">
          <p className="text-outline uppercase tracking-[0.05em] text-[10px] font-bold">Evaluations Received</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">621</h3>
          </div>
          <span className="text-[11px] text-primary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> 73% Completion rate
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low border border-surface-variant/50">
          <p className="text-outline uppercase tracking-[0.05em] text-[10px] font-bold">Partnered Companies</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">156</h3>
          </div>
          <span className="text-[11px] text-secondary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">add</span> 12 New this semester
          </span>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:opacity-90 border-transparent bg-gradient-to-br from-primary to-primary-container text-white">
          <p className="text-on-primary-container/80 uppercase tracking-[0.05em] text-[10px] font-bold">Average Score</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-white tracking-tight">4.2<span className="text-xl text-white/70">/5</span></h3>
          </div>
          <span className="text-[11px] font-bold mt-2 flex items-center gap-1 text-on-primary-container opacity-90">
            Across all departments
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest rounded-[24px] p-8 border border-surface-variant/50 h-96 flex flex-col">
          <h2 className="headline text-xl font-bold mb-6">Placement by Department</h2>
          {/* Mock Bar Chart */}
          <div className="flex-1 flex items-end gap-4 justify-between relative px-4">
            {/* Grid lines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between z-0 pointer-events-none opacity-20">
              <div className="border-b border-outline-variant w-full"></div>
              <div className="border-b border-outline-variant w-full"></div>
              <div className="border-b border-outline-variant w-full"></div>
              <div className="border-b border-outline-variant w-full"></div>
            </div>
            
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors h-[80%] rounded-t-xl relative z-10 group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">80%</div>
              <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-outline">CS</div>
            </div>
            <div className="w-full bg-secondary/20 hover:bg-secondary/40 transition-colors h-[40%] rounded-t-xl relative z-10 group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">40%</div>
              <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-outline">EEE</div>
            </div>
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors h-[60%] rounded-t-xl relative z-10 group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">60%</div>
              <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-outline">MECH</div>
            </div>
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors h-[50%] rounded-t-xl relative z-10 group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">50%</div>
              <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-outline">CIVIL</div>
            </div>
            <div className="w-full bg-secondary/20 hover:bg-secondary/40 transition-colors h-[90%] rounded-t-xl relative z-10 group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">90%</div>
              <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-outline">IT</div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-8 border border-surface-variant/50 flex flex-col">
          <h2 className="headline text-xl font-bold mb-6">Recent Activity Log</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex items-start gap-4 p-3 hover:bg-surface-container-low rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">file_download</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">CSV Export Generated</p>
                <p className="text-[10px] text-outline mt-1">Admin 'Jane Doe' generated a department-wide report.</p>
                <p className="text-[8px] text-outline uppercase tracking-widest mt-2 font-bold">10 Mins Ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 hover:bg-surface-container-low rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">50 Evaluations Submitted</p>
                <p className="text-[10px] text-outline mt-1">Batch #4 from TechCorp Systems was processed successfully.</p>
                <p className="text-[8px] text-outline uppercase tracking-widest mt-2 font-bold">2 Hours Ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 hover:bg-surface-container-low rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]">warning</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">System Alert</p>
                <p className="text-[10px] text-outline mt-1">Failed to send 3 email notifications. Retry pending in queue.</p>
                <p className="text-[8px] text-outline uppercase tracking-widest mt-2 font-bold">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
