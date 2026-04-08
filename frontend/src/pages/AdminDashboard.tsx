export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Institutional Dashboard</h1>
          <p className="text-outline mt-1 font-body">Academic Cycle: Autumn 2023 - Summer 2024</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-primary font-semibold border-2 border-primary/10 hover:bg-primary/5 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">file_download</span>
            Export Report
          </button>
        </div>
      </header>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-fixed/15 blur-3xl -mr-8 -mt-8"></div>
          <p className="text-outline label-md uppercase tracking-[0.05em] text-[10px] font-bold">Total Students</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">1,248</h3>
            <span className="text-secondary font-bold text-sm flex items-center">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
            </span>
          </div>
          <p className="text-[11px] text-outline mt-2">Active across 14 faculties</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low">
          <p className="text-outline label-md uppercase tracking-[0.05em] text-[10px] font-bold">Active Internships</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">852</h3>
            <span className="text-primary font-bold text-sm">On-track</span>
          </div>
          <p className="text-[11px] text-outline mt-2">Currently in external placement</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low">
          <p className="text-outline label-md uppercase tracking-[0.05em] text-[10px] font-bold">Partner Companies</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">312</h3>
            <span className="material-symbols-outlined text-secondary">verified</span>
          </div>
          <p className="text-[11px] text-outline mt-2">+14 new partners this month</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-[24px] relative overflow-hidden group transition-all hover:bg-surface-container-low">
          <p className="text-outline label-md uppercase tracking-[0.05em] text-[10px] font-bold">Submission Rate</p>
          <div className="flex items-baseline gap-3 mt-4">
            <h3 className="text-4xl font-extrabold headline text-on-surface tracking-tight">94%</h3>
            <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden ml-2">
              <div className="h-full bg-gradient-to-r from-primary to-primary-container" style={{ width: "94%" }}></div>
            </div>
          </div>
          <p className="text-[11px] text-outline mt-2">Mid-term feedback reviews</p>
        </div>
      </section>

      {/* Main Analytics & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-[24px] min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="headline text-xl font-bold">Student Evaluation Trends</h3>
                <p className="text-outline text-sm">Aggregate score performance by faculty</p>
              </div>
              <select className="bg-surface border-none text-sm font-semibold rounded-lg focus:ring-0 text-primary outline-none">
                <option>Last 6 Months</option>
                <option>Academic Year</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-4 w-full h-full relative group">
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-primary-container/20 w-full rounded-t-xl transition-all hover:bg-primary-container/40" style={{ height: "60%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Sept</div>
              </div>
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-primary-container/40 w-full rounded-t-xl transition-all hover:bg-primary-container/60" style={{ height: "75%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Oct</div>
              </div>
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-primary-container/30 w-full rounded-t-xl transition-all hover:bg-primary-container/50" style={{ height: "45%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Nov</div>
              </div>
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-primary w-full rounded-t-xl shadow-lg shadow-primary/20" style={{ height: "90%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Dec</div>
              </div>
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-secondary w-full rounded-t-xl shadow-lg shadow-secondary/20" style={{ height: "85%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Jan</div>
              </div>
              <div className="flex-1 relative flex flex-col justify-end h-full">
                <div className="bg-primary-container/50 w-full rounded-t-xl" style={{ height: "70%" }}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded">Feb</div>
              </div>
            </div>
            <div className="flex justify-between mt-6 pt-6 border-t border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-medium text-outline">Software Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-xs font-medium text-outline">Business Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-container/40"></span>
                <span className="text-xs font-medium text-outline">Average Score</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-surface-container-low p-8 rounded-[24px] h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="headline text-xl font-bold">Recent Activity</h3>
              <button className="text-primary text-xs font-bold uppercase tracking-wider">View All</button>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-100">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-secondary flex items-center justify-center border-4 border-surface-container-low z-10">
                  <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">New Partner Registered</p>
                <p className="text-xs text-outline mt-1">TechNova Systems joined the CS program</p>
                <p className="text-[10px] text-indigo-400 mt-2 font-bold">2 MINUTES AGO</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-primary flex items-center justify-center border-4 border-surface-container-low z-10">
                  <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>rate_review</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Feedback Submitted</p>
                <p className="text-xs text-outline mt-1">Alex Rivera's mid-term supervisor review</p>
                <p className="text-[10px] text-indigo-400 mt-2 font-bold">1 HOUR AGO</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-tertiary-container flex items-center justify-center border-4 border-surface-container-low z-10">
                  <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Missing Evaluation</p>
                <p className="text-xs text-outline mt-1">Marketing Faculty: 12 forms overdue</p>
                <p className="text-[10px] text-indigo-400 mt-2 font-bold">3 HOURS AGO</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-slate-300 flex items-center justify-center border-4 border-surface-container-low z-10">
                  <span className="material-symbols-outlined text-[12px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Student Placement</p>
                <p className="text-xs text-outline mt-1">Elena Costa assigned to Global Banks Ltd</p>
                <p className="text-[10px] text-indigo-400 mt-2 font-bold">YESTERDAY</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Curated Enrollment Table */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="headline text-2xl font-bold tracking-tight">Curated Enrollment</h2>
          <div className="flex gap-4">
            <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">Filters</button>
            <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-container-highest transition-colors">Bulk Action</button>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden p-2">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-outline label-sm uppercase tracking-wider text-[11px]">
                <th className="px-6 py-4 font-bold">Student</th>
                <th className="px-6 py-4 font-bold">Placement Partner</th>
                <th className="px-6 py-4 font-bold">Timeline</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Performance</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="group hover:bg-surface-container-low transition-all">
                <td className="px-6 py-4 rounded-l-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiHge7Omgr4ThlmmxJhpI8L_nwFxoHyaPt4lULjSZXYV1L1FunTzd-PM5s-sAC39Xu590XyOIsW7p2Y4axD9-V0DlIMfWJ5xbbw9SvdxlXKQBPf4jxYGhWrlGt7K0deu6GCdYIr7k7NlaqYALgfrXw18qPlvmM6HS3TzHVlH8lJDvDWupDAODjDIcTPhK1ruhUCk7XrzwDs_cnvMCVShG7Aij71HeV3pUPbZYLeq5BuKEN1JzHdpIReb3JcKY9FTv7rWDPWrlvsQQl" alt="Student" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Julian Thorne</p>
                      <p className="text-[11px] text-outline">Software Engineering</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-on-surface">Vanguard AI Solutions</p>
                  <p className="text-[11px] text-outline">San Francisco (Remote)</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface">Sep - Dec 2023</p>
                  <p className="text-[11px] text-secondary font-bold">Week 12 of 16</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">Active</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold headline">4.8</span>
                    <div className="w-20 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: "96%" }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right rounded-r-xl">
                  <button className="text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
