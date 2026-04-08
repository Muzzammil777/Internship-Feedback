export default function FacultyVerification() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Document Verification</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Verify validity of offer letters and student submissions.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden">
        <ul className="divide-y divide-surface-variant">
          {[
            { student: "David Miller", type: "Offer Letter", doc: "Offer_Letter_Amazon.pdf", date: "Today", status: "Unverified" },
            { student: "Anna Smith", type: "Completion Certificate", doc: "Certificate_IBM.pdf", date: "Yesterday", status: "Unverified" },
            { student: "John Doe", type: "Offer Letter", doc: "Offer_Letter_Google.pdf", date: "3 Days Ago", status: "Verified" },
          ].map((item, idx) => (
            <li key={idx} className="p-6 hover:bg-surface-container-low transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.status === 'Verified' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'}`}>
                  <span className="material-symbols-outlined text-2xl">{item.type.includes('Offer') ? 'work' : 'workspace_premium'}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">{item.doc}</h3>
                  <p className="text-xs mt-1 text-on-surface-variant font-medium">Submitted by: <span className="font-bold text-on-surface">{item.student}</span></p>
                  <p className="text-[10px] text-outline uppercase tracking-wider mt-1">{item.type} • {item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.status === 'Verified' ? (
                  <span className="px-4 py-2 flex items-center gap-2 text-xs font-bold text-primary bg-primary-container/20 rounded-lg">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Verified
                  </span>
                ) : (
                  <>
                    <button className="px-3 py-2 border border-outline-variant hover:bg-surface-container-high transition-colors rounded-lg text-sm font-bold flex items-center gap-1 text-outline hover:text-on-surface">
                      <span className="material-symbols-outlined text-[16px]">visibility</span> View
                    </button>
                    <button className="px-3 py-2 bg-error-container text-error hover:bg-error hover:text-white transition-colors rounded-lg text-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">cancel</span> Reject
                    </button>
                    <button className="px-3 py-2 bg-primary text-white hover:opacity-90 transition-opacity rounded-lg text-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span> Approve
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
