export default function FacultyStudentManagement() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Student Internship Management</h1>
          <p className="text-on-surface-variant mt-1 font-medium">View and manage your assigned students.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-surface-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <select className="py-2.5 px-4 bg-surface-container-lowest border border-surface-variant rounded-xl text-sm outline-none w-48 font-medium">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending Verify</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/30 text-xs font-bold uppercase tracking-wider text-outline border-b border-surface-variant">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
              {[
                { name: "Eleanor Pena", id: "CS-2024-089", company: "Meta", role: "Frontend Developer", status: "Active" },
                { name: "Guy Hawkins", id: "IT-2024-102", company: "Google", role: "Cloud Infra Intern", status: "Pending Verify" },
                { name: "Jerome Bell", id: "CS-2024-045", company: "Spotify", role: "Data Science Intern", status: "Active" },
                { name: "Courtney Henry", id: "CS-2024-012", company: "Amazon", role: "Backend Developer", status: "Completed" }
              ].map((student, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-container text-primary flex items-center justify-center rounded-full font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">{student.name}</p>
                        <p className="text-xs text-outline">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-on-surface text-sm">{student.company}</p>
                    <p className="text-xs text-outline">{student.role}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        student.status === 'Active' ? 'bg-primary-container/30 text-primary border-primary/20' : 
                        student.status === 'Completed' ? 'bg-secondary-container/30 text-secondary border-secondary/20' : 
                        'bg-error-container/30 text-error border-error/20'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary text-sm font-bold hover:underline">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
