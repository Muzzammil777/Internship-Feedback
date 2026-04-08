export default function StudentApproval() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Internship Approval Request</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Submit your placement details for official academic approval.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant">
          <h2 className="headline text-lg font-bold mb-6">Upload New Document</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">
                Company Name
              </label>
              <input 
                type="text" 
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
                placeholder="e.g. TechCorp Systems"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">
                Internship Role/Title
              </label>
              <input 
                type="text" 
                className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
                placeholder="e.g. Frontend Engineering Intern"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">
                Document Type (Offer Letter, NOC)
              </label>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-low/50 hover:bg-primary-fixed/10 transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-3xl text-outline mb-2 group-hover:text-primary transition-colors">upload_file</span>
                <p className="font-bold text-sm text-on-surface">Click to upload document</p>
                <p className="text-[10px] text-outline mt-1 uppercase tracking-wider">Max size 10MB (PDF Only)</p>
              </div>
            </div>

            <button 
              type="button" 
              className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all mt-4"
            >
              Submit for Approval
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Document Status Table */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col">
           <h2 className="headline text-lg font-bold mb-6">Document Status</h2>
           <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                 <thead>
                    <tr className="border-b border-surface-variant">
                       <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline">Document</th>
                       <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline">Date</th>
                       <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline text-right">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-surface-variant/50">
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                       <td className="py-4">
                          <div className="font-bold text-on-surface">Offer_Letter_TechCorp.pdf</div>
                          <div className="text-xs text-outline">TechCorp Systems</div>
                       </td>
                       <td className="py-4 text-outline">Oct 12, 2024</td>
                       <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 bg-secondary-container/30 text-secondary border border-secondary/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                             <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                             Approved
                          </span>
                       </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                       <td className="py-4">
                          <div className="font-bold text-on-surface">NOC_Request_Form.pdf</div>
                          <div className="text-xs text-outline">TechCorp Systems</div>
                       </td>
                       <td className="py-4 text-outline">Nov 01, 2024</td>
                       <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 bg-primary-container/30 text-primary border border-primary/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                             Pending
                          </span>
                       </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                       <td className="py-4">
                          <div className="font-bold text-on-surface">Initial_Offer.pdf</div>
                          <div className="text-xs text-outline">Startup Inc.</div>
                       </td>
                       <td className="py-4 text-outline">Sep 15, 2024</td>
                       <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 bg-error-container/30 text-error border border-error/20 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                             <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                             Rejected
                          </span>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
