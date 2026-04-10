import StatusBadge from "./StatusBadge";

type DocumentRow = {
  id: string;
  documentName: string;
  companyName: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

type DocumentTableProps = {
  documents: DocumentRow[];
};

export default function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col min-h-[460px]">
      <h2 className="headline text-lg font-bold mb-6">Document Status</h2>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-surface-variant">
              <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline">Document Name</th>
              <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline">Company Name</th>
              <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline">Date</th>
              <th className="pb-3 text-xs font-bold uppercase tracking-wider text-outline text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant/50">
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                <td className="py-4 pr-6 font-bold text-on-surface">{document.documentName}</td>
                <td className="py-4 pr-6 text-on-surface-variant">{document.companyName}</td>
                <td className="py-4 pr-6 text-on-surface-variant">{document.date}</td>
                <td className="py-4 text-right">
                  <StatusBadge status={document.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
