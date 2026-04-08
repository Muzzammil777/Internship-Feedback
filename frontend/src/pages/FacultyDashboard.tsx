export default function FacultyDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Faculty Dashboard</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Overview of student internships and pending evaluations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">group</span>
          </div>
          <div>
            <p className="text-sm font-bold text-outline uppercase tracking-wider mb-1">Active Students</p>
            <p className="text-2xl font-black text-on-surface">142</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <p className="text-sm font-bold text-outline uppercase tracking-wider mb-1">Pending Evaluations</p>
            <p className="text-2xl font-black text-on-surface">18</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <p className="text-sm font-bold text-outline uppercase tracking-wider mb-1">Pending Verifications</p>
            <p className="text-2xl font-black text-on-surface">3</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden">
        <div className="px-6 py-5 border-b border-surface-variant flex justify-between items-center bg-surface-container-low/30">
          <h2 className="text-lg font-bold">Recent Submissions</h2>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-lowest text-xs uppercase tracking-wider text-outline border-b border-surface-variant">
                <th className="px-6 py-4 font-bold">Student Name</th>
                <th className="px-6 py-4 font-bold">Company</th>
                <th className="px-6 py-4 font-bold">Submission Type</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant text-sm">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-bold">Michael Foster</td>
                <td className="px-6 py-4 text-on-surface-variant">Globex Inc.</td>
                <td className="px-6 py-4">Mid-Term Report</td>
                <td className="px-6 py-4 text-on-surface-variant">2 hrs ago</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-secondary text-xs font-bold border border-secondary/20">Pending</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary font-bold hover:underline">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-bold">Sarah Jenkins</td>
                <td className="px-6 py-4 text-on-surface-variant">TechCorp Systems</td>
                <td className="px-6 py-4">Weekly Journal</td>
                <td className="px-6 py-4 text-on-surface-variant">5 hrs ago</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-primary-container/50 text-primary text-xs font-bold border border-primary/20">Reviewed</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-outline font-bold hover:text-primary transition-colors">View</button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-bold">Alex Chen</td>
                <td className="px-6 py-4 text-on-surface-variant">Innova Solutions</td>
                <td className="px-6 py-4">Final Presentation</td>
                <td className="px-6 py-4 text-on-surface-variant">1 day ago</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-secondary text-xs font-bold border border-secondary/20">Pending</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary font-bold hover:underline">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
