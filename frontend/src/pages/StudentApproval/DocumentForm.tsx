import { useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";

type NewDocument = {
  companyName: string;
  roleTitle: string;
  companyEmail: string;
  startDate: string;
  endDate: string;
  docType: string;
  fileName: string;
};

type DocumentFormProps = {
  onSubmit: (document: NewDocument) => void;
};

const initialForm = {
  companyName: "",
  roleTitle: "",
  companyEmail: "",
  startDate: "",
  endDate: "",
  docType: "Offer Letter",
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function DocumentForm({ onSubmit }: DocumentFormProps) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const validationErrors = useMemo(() => {
    const nextErrors: Record<string, string> = {};

    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!form.roleTitle.trim()) nextErrors.roleTitle = "Internship role/title is required.";
    if (!form.companyEmail.trim()) {
      nextErrors.companyEmail = "Company email is required.";
    } else if (!isValidEmail(form.companyEmail.trim())) {
      nextErrors.companyEmail = "Enter a valid email address.";
    }

    if (!file) nextErrors.file = "Please upload a PDF file.";
    return nextErrors;
  }, [form, file]);

  const isFormValid = useMemo(
    () => Object.keys(validationErrors).length === 0,
    [validationErrors]
  );

  const handleInputChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setMessage("");
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, file: "Only PDF files are accepted." }));
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: "Maximum file size is 10MB." }));
      return;
    }

    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: "" }));
    setMessage("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    handleFile(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    handleFile(droppedFile);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validationErrors);

    if (!isFormValid) {
      setMessage("");
      return;
    }

    if (!file) return;

    onSubmit({
      companyName: form.companyName.trim(),
      roleTitle: form.roleTitle.trim(),
      companyEmail: form.companyEmail.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      docType: form.docType,
      fileName: file.name,
    });

    setMessage("Document submitted for approval.");
    setForm(initialForm);
    setFile(null);
    setErrors({});
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant">
      <h2 className="headline text-lg font-bold mb-6">Upload New Document</h2>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Company Name</label>
          <input
            value={form.companyName}
            onChange={(event) => handleInputChange("companyName", event.target.value)}
            className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
            placeholder="e.g. TechCorp Systems"
            type="text"
          />
          {errors.companyName && <p className="mt-2 text-xs text-error">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Internship Role/Title</label>
          <input
            value={form.roleTitle}
            onChange={(event) => handleInputChange("roleTitle", event.target.value)}
            className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
            placeholder="e.g. Frontend Engineering Intern"
            type="text"
          />
          {errors.roleTitle && <p className="mt-2 text-xs text-error">{errors.roleTitle}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Company Email</label>
          <input
            value={form.companyEmail}
            onChange={(event) => handleInputChange("companyEmail", event.target.value)}
            className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
            placeholder="e.g. hr@techcorp.com"
            type="email"
          />
          {errors.companyEmail && <p className="mt-2 text-xs text-error">{errors.companyEmail}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Internship Start Date</label>
            <input
              value={form.startDate}
              onChange={(event) => handleInputChange("startDate", event.target.value)}
              className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
              type="date"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Internship End Date</label>
            <input
              value={form.endDate}
              onChange={(event) => handleInputChange("endDate", event.target.value)}
              className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
              type="date"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">Document Type</label>
          <select
            value={form.docType}
            onChange={(event) => handleInputChange("docType", event.target.value)}
            className="w-full bg-surface-container-low border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-medium"
          >
            <option>Offer Letter</option>
            <option>NOC</option>
            <option>Completion Certificate</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">File Upload</label>
          <input
            id="approval-file-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="approval-file-upload"
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-low/50 hover:bg-primary-fixed/10 transition-colors cursor-pointer text-center ${
              dragActive ? "border-primary bg-primary-fixed/10" : "border-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-3xl text-outline mb-2">upload_file</span>
            <p className="font-bold text-sm text-on-surface">Drag & drop a PDF or click to upload</p>
            <p className="text-[10px] text-outline mt-1 uppercase tracking-wider">Max size 10MB (PDF only)</p>
          </label>
          {file && (
            <p className="mt-3 text-sm text-on-surface font-medium">Selected file: {file.name} ({formatFileSize(file.size)})</p>
          )}
          {errors.file && <p className="mt-2 text-xs text-error">{errors.file}</p>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Submit for Approval
          <span className="material-symbols-outlined text-sm">send</span>
        </button>

        {message && (
          <div className="rounded-2xl bg-secondary-container/20 border border-secondary/30 p-4 text-sm text-secondary">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
