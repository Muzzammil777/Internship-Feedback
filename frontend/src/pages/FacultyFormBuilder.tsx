import React from "react";

export default function FacultyFormBuilder() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Actions Toolbar */}
      <div className="h-20 bg-surface px-8 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">Form Builder</h1>
          <p className="text-sm text-outline font-medium">Summer Internship 2024 Final Evaluation</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary-fixed-dim transition-colors duration-200">
            Save Draft
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            Publish Form
          </button>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL: Builder Controls */}
        <aside className="w-80 bg-surface-container-low p-6 overflow-y-auto flex flex-col gap-8 shrink-0">
          {/* Field Tools */}
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">Field Components</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">text_fields</span>
                <span className="text-[10px] font-bold text-on-surface">Short Text</span>
              </button>
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">grade</span>
                <span className="text-[10px] font-bold text-on-surface">Rating Scale</span>
              </button>
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">table_rows</span>
                <span className="text-[10px] font-bold text-on-surface">Data Table</span>
              </button>
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">check_box</span>
                <span className="text-[10px] font-bold text-on-surface">Checkbox Group</span>
              </button>
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">arrow_drop_down_circle</span>
                <span className="text-[10px] font-bold text-on-surface">Dropdown</span>
              </button>
              <button className="bg-surface-container-lowest p-4 rounded-xl flex flex-col items-center gap-2 group hover:ring-2 hover:ring-primary transition-all duration-200">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">upload_file</span>
                <span className="text-[10px] font-bold text-on-surface">File Upload</span>
              </button>
            </div>
          </div>

          {/* Field Settings */}
          <div className="border-t border-outline-variant/30 pt-8">
            <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-6">Field Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-on-surface mb-2 uppercase tracking-tight">Field Label</label>
                <input className="w-full bg-surface-container-lowest border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" type="text" defaultValue="Technical Proficiency" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-on-surface mb-2 uppercase tracking-tight">Help Text</label>
                <textarea className="w-full bg-surface-container-lowest border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 h-20 outline-none" placeholder="Brief instruction for the evaluator..."></textarea>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface">Required Field</span>
                <div className="w-10 h-6 bg-primary rounded-full relative flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL: Live Preview */}
        <section className="flex-1 bg-surface p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-12 pb-24">
            {/* Form Header Card */}
            <div className="relative overflow-hidden bg-surface-container-lowest p-10 rounded-xl shadow-indigo-900/5 shadow-xl border-l-8 border-primary">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-10 rounded-bl-full"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">Summer Internship 2024 Final Evaluation</h2>
                <p className="text-outline max-w-lg leading-relaxed">This comprehensive review assesses the student's technical contributions, soft skills, and overall professionalism during their 12-week placement.</p>
              </div>
            </div>

            {/* Rendered Fields Section */}
            <div className="space-y-10">
              {/* Text Input Section */}
              <div className="group relative bg-surface-container-lowest p-8 rounded-xl hover:ring-2 hover:ring-primary/10 transition-all">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-outline">drag_indicator</span>
                </div>
                <label className="block text-sm font-extrabold text-on-surface mb-4 uppercase tracking-wider">01. Student Full Name</label>
                <input className="w-full p-4 bg-surface-container-low border-none rounded-xl text-lg focus:ring-2 focus:ring-primary transition-all outline-none" placeholder="Enter full legal name" type="text" />
              </div>

              {/* Rating Section */}
              <div className="group relative bg-surface-container-lowest p-8 rounded-xl hover:ring-2 hover:ring-primary/10 transition-all">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-outline">drag_indicator</span>
                </div>
                <label className="block text-sm font-extrabold text-on-surface mb-4 uppercase tracking-wider">02. Technical Proficiency</label>
                <p className="text-xs text-outline mb-6">Rate the intern's ability to apply core academic concepts to real-world tasks.</p>
                <div className="flex justify-between items-center max-w-md">
                  <div className="flex gap-2">
                    <button className="w-12 h-12 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-outline hover:border-primary hover:text-primary transition-colors">1</button>
                    <button className="w-12 h-12 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-outline hover:border-primary hover:text-primary transition-colors">2</button>
                    <button className="w-12 h-12 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-outline hover:border-primary hover:text-primary transition-colors">3</button>
                    <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">4</button>
                    <button className="w-12 h-12 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-outline hover:border-primary hover:text-primary transition-colors">5</button>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase">Excellent</span>
                </div>
              </div>

              {/* Table Section */}
              <div className="group relative bg-surface-container-lowest p-8 rounded-xl hover:ring-2 hover:ring-primary/10 transition-all">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-outline">drag_indicator</span>
                </div>
                <label className="block text-sm font-extrabold text-on-surface mb-6 uppercase tracking-wider">03. Project Milestones</label>
                <div className="overflow-hidden rounded-xl bg-surface-container-low p-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-xs text-outline uppercase font-bold">
                        <th className="px-4 py-3">Task Deliverable</th>
                        <th className="px-4 py-3 text-center">Complexity</th>
                        <th className="px-4 py-3 text-right">Completion</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="bg-white hover:bg-surface-container-high transition-colors">
                        <td className="px-4 py-4 font-medium text-sm">System Backend Module</td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-bold uppercase">High</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-bold text-secondary">95%</span>
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-surface-container-high transition-colors">
                        <td className="px-4 py-4 font-medium text-sm">API Documentation</td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase">Medium</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-bold text-secondary">100%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="mt-4 flex items-center gap-2 text-xs font-bold text-primary uppercase hover:underline">
                  <span className="material-symbols-outlined text-sm">add_circle</span> Add Row
                </button>
              </div>

              {/* Progress Trajectory */}
              <div className="bg-surface-container-lowest p-8 rounded-xl">
                <label className="block text-sm font-extrabold text-on-surface mb-8 uppercase tracking-wider">Internship Progress Trajectory</label>
                <div className="relative h-4 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[75%] bg-gradient-to-r from-secondary to-primary"></div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                  <span>Initial Learning</span>
                  <span className="text-primary">Curated Expertise</span>
                </div>
              </div>

              {/* Checkbox Group */}
              <div className="group relative bg-surface-container-lowest p-8 rounded-xl hover:ring-2 hover:ring-primary/10 transition-all">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-outline">drag_indicator</span>
                </div>
                <label className="block text-sm font-extrabold text-on-surface mb-6 uppercase tracking-wider">04. Areas for Growth</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-sm font-medium">Public Speaking</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors">
                    <input defaultChecked className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-sm font-medium">Test Coverage</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-sm font-medium">UI/UX Design</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-sm font-medium">Agile Scrums</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
