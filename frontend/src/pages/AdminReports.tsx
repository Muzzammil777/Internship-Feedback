export default function AdminReports() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Reports & Analytics</h1>
          <p className="text-on-surface-variant mt-1 font-medium">System-wide monitoring and analytical reports for the academic year.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-high font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Fall 2024
          </button>
          <button className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant">
          <h3 className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Total Placements</h3>
          <p className="text-3xl font-black text-on-surface">842</p>
          <span className="text-[10px] text-primary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> +14% vs Last Year
          </span>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant">
          <h3 className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Evaluations Received</h3>
          <p className="text-3xl font-black text-on-surface">621</p>
          <span className="text-[10px] text-primary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> 73% Completion rate
          </span>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant">
          <h3 className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Partnered Companies</h3>
          <p className="text-3xl font-black text-on-surface">156</p>
          <span className="text-[10px] text-secondary font-bold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">add</span> 12 New this semester
          </span>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant bg-gradient-to-br from-primary to-primary-container text-white border-transparent">
          <h3 className="text-[10px] uppercase font-bold tracking-wider text-on-primary-container mb-2">Average Score</h3>
          <p className="text-3xl font-black">4.2/5</p>
          <span className="text-[10px] font-bold mt-2 flex items-center gap-1 text-on-primary-container opacity-90">
            Across all departments
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant h-96 flex flex-col">
          <h3 className="text-sm font-bold mb-6">Placement by Department</h3>
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

        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant flex flex-col">
          <h3 className="text-sm font-bold mb-6">Recent Activity Log</h3>
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
