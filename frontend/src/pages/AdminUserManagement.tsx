export default function AdminUserManagement() {
  return (
    <div className="pt-8 px-8 pb-12">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">
            User Management
          </h2>
          <p className="text-slate-500 font-medium">Coordinate and supervise the academic ecosystem members.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-container text-on-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">person_add</span>
          <span>Provision User</span>
        </button>
      </div>

      {/* Bento Filter Row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Stats Highlight */}
        <div className="col-span-8 bg-surface-container-lowest rounded-[24px] p-6 flex items-center justify-between relative overflow-hidden group transition-all hover:bg-surface-container-low">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-[0.08] rounded-full -mr-16 -mt-16"></div>
          <div className="flex gap-12">
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Total Users</p>
              <p className="headline text-3xl font-bold text-slate-900">2,842</p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Active Now</p>
              <p className="headline text-3xl font-bold text-secondary">412</p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Pending Approval</p>
              <p className="headline text-3xl font-bold text-tertiary">28</p>
            </div>
          </div>
          <div className="flex gap-2 relative z-10">
            <button className="p-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">file_download</span>
            </button>
          </div>
        </div>

        {/* Quick Search Visual */}
        <div className="col-span-4 bg-primary rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-100"></div>
          <div className="relative z-10">
            <p className="text-primary-fixed-dim text-xs font-bold uppercase tracking-widest mb-1">Verification Queue</p>
            <p className="text-xl font-bold">12 New Identities</p>
          </div>
          <a href="#" className="relative z-10 text-xs font-bold underline underline-offset-4 flex items-center gap-1 group">
            Review identities
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Content Area: The Curated Table */}
      <div className="bg-surface-container-low rounded-[24px] p-1">
        {/* Custom Tabs */}
        <div className="flex gap-1 mb-1 p-1 bg-surface-container rounded-xl w-fit">
          <button className="px-6 py-2 rounded-lg text-sm font-bold bg-surface-container-lowest text-primary shadow-sm">Students</button>
          <button className="px-6 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-surface-container-high transition-colors">Faculty</button>
          <button className="px-6 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-surface-container-high transition-colors">Companies</button>
        </div>

        <div className="bg-surface-container-lowest rounded-xl overflow-hidden p-2">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-outline label-sm uppercase tracking-wider text-[11px]">
                <th className="px-6 py-4 font-bold">User Entity</th>
                <th className="px-6 py-4 font-bold">Contact</th>
                <th className="px-6 py-4 font-bold">Department/Role</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {/* Row 1 */}
              <tr className="group hover:bg-surface-container-low transition-all">
                <td className="px-6 py-4 rounded-l-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSNrEDsOZk51HQaRSgw6NGcpWQkCOqkbCUYtI5MLi8ODsbtSOQQ-tEDjiBmZtbCE_NkHuC-C0mZLgO7KJ6jfWC5PTTxokiqkchKTLo-QNZbQMthCBqtWB4alNsvvbUuB5Yp9oln6daRc6B3RKMkm8PWfOgbon9L5ygYOaBG1H3H57twy4os5yKbsscbYVEwSaH_qRRM3_BakZVLZuNR77FX8Ggw3YBergQyKem9vCsGNCduxj-9HC9nETWCHO2kFBQDM6dpuLtjoTL" alt="Student Avatar" className="w-11 h-11 rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-fixed border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Elena Richardson</p>
                      <p className="text-[11px] text-outline">ID: STU-9921-X</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface">elena.r@fluidacademic.edu</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">Interface Design</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span className="text-[11px] font-bold text-secondary uppercase">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right rounded-r-xl">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all" title="Edit User">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-error transition-all" title="Delete User">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group hover:bg-surface-container-low transition-all">
                <td className="px-6 py-4 rounded-l-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7P0RJutYkjlDlGTDdhngrBmKl0YY1WqOzWgJL_Us7TeqeyoI9IJWKUwf-CKmzhhsYYQNIRqlHgEY6usSb4SjfEI75HtAqquO6tX9Iho7oy65814rtQ7-008tK_PuGVHPGPtK9RmczNOK_JuJXKoi5hMQJk-3jBsuhvy7ncTj1asGiSHOTj8uEmK-qeDNbS-THO81roP1w9zyTLLByYlZZUPSjukUHWjIJr3d7rHpTVVb6jr6lC1Yn9dUnY3MfiVsWAx1oeawwbQlQ" alt="Student Avatar" className="w-11 h-11 rounded-xl object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Marcus Thorne</p>
                      <p className="text-[11px] text-outline">ID: STU-1142-M</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface">m.thorne@fluidacademic.edu</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">Data Analytics</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    <span className="text-[11px] font-bold text-tertiary uppercase">Pending</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right rounded-r-xl">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all" title="Edit User">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-error transition-all" title="Delete User">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="group hover:bg-surface-container-low transition-all">
                <td className="px-6 py-4 rounded-l-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIY1XehTusom9gSAAyvA0oDONDQ4BXjcB49sKEF9GTXxcGltOzsNpjinMsuUzALrWRNxJAYliuroIc1D15B2V3nJEKX7N-9aMa5AOT3KWZhboZxZHO4lR3tDJeqeiyY_ESLbo8iqW8tY1DH8UZNBBPnDbpC904J0DgVA4-5XfuPaBT7PEx8GJQ2-o4gqFf9xzBXdSYAPYo9WLtf9BI7M0bPXBZ9OGD7jhCRyK7ScoQ-FgKF704JODrlZbUqNqc-D7lMH7O0h7hskTd" alt="Student Avatar" className="w-11 h-11 rounded-xl object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-fixed border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Amara Okafor</p>
                      <p className="text-[11px] text-outline">ID: STU-8820-A</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-on-surface">amara.o@fluidacademic.edu</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">Blockchain Architecture</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span className="text-[11px] font-bold text-secondary uppercase">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right rounded-r-xl">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary transition-all" title="Edit User">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-error transition-all" title="Delete User">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination Shell */}
          <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center rounded-xl mt-2">
            <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 2,842 curated records</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-8 flex justify-center gap-8 opacity-40 grayscale">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-xs font-bold tracking-widest uppercase">Encryption Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">history</span>
          <span className="text-xs font-bold tracking-widest uppercase">System Logged</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined">database</span>
          <span className="text-xs font-bold tracking-widest uppercase">Central Cluster v2</span>
        </div>
      </div>

      {/* Contextual FAB */}
      <div className="fixed bottom-8 right-8 group z-50">
        <button className="w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>
      </div>
    </div>
  );
}
