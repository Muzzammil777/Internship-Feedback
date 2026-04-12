export default function TemplateGallery() {
  return (
    <div className="p-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Template Gallery</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and deploy institutional feedback frameworks across the hub.</p>
        </div>

        {/* Upload Section (Asymmetric Bento Style) */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 border border-transparent flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary-fixed-dim w-12 h-12 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary font-bold">upload_file</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-headline">Upload New Asset</h2>
                <p className="text-sm text-outline">Import existing JSON or PDF template structures</p>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div className="flex-1 border-2 border-dashed border-outline-variant/50 rounded-2xl bg-surface-container-low/30 flex flex-col items-center justify-center py-12 px-6 group hover:border-primary/50 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-5xl text-outline mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
              <div className="text-center">
                <p className="font-semibold text-on-surface mb-1">Drag and drop files here</p>
                <p className="text-xs text-outline">Maximum size: 10MB. Formats: .json, .csv, .pdf</p>
              </div>
              {/* Progress Indicator */}
              <div className="w-full max-w-xs mt-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-primary mb-2">
                  <span>Curating structure...</span>
                  <span>74%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-[74%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-primary-container rounded-2xl p-8 text-on-primary relative overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary-fixed opacity-20 rounded-full -mb-24 -mr-24 blur-3xl"></div>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Curation Tips</h3>
              <p className="text-primary-fixed/80 text-sm leading-relaxed mb-6">
                Standardizing your templates ensures consistent data points across all internship cohorts. Use our "Expertise Growth" ribbon for skill-based metrics.
              </p>
            </div>
            <button className="bg-surface-container-lowest text-primary px-6 py-3 rounded-xl font-bold text-sm w-fit hover:bg-secondary-fixed transition-colors relative z-10">
              Read Documentation
            </button>
          </div>
        </section>

        {/* Template Grid */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-headline">Active Frameworks</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </button>
            <button className="p-2 rounded-lg text-outline hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-xl">list</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Card 1: Standard Mid-Term Review */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden group hover:bg-surface-container-low transition-all duration-300 flex flex-col">
            <div className="h-40 relative overflow-hidden bg-surface-container-high">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
              <img className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyu_6nyf4z1XaPylPgK7T3zwvgK6q6m-t_NxmpAe8PnSTPFH9n9jnN9zwP8p840MLOS77MnC3WfrA56ZfXoEpRueRrMEwnMj9Zx37CQbe7WBvKPUoNJi2fFDSE1VfZqQGFWs3JSy8Jqk9Z12WhCEVPjY0HwAMKuL3NaSacjdEEcBWktFwB8GnzqkpxmZOSsZcDue8BZZMWHFMAVl44Cdq3wdxOEaj84VNBzRj1XAQGwh7SoMr-3g_6LpkqR_Ei1c5opMI3KzDy4zm" alt="Standard Mid-Term Review" />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">Academic</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold font-headline mb-2 text-on-surface">Standard Mid-Term Review</h3>
              <p className="text-sm text-outline mb-6 line-clamp-2">A comprehensive framework focusing on integration, early milestones, and supervisor-mentee rapport.</p>
              {/* Metadata Ribbon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-[8px] font-bold border-2 border-white">JD</div>
                  <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-[8px] font-bold border-2 border-white">AS</div>
                </div>
                <span className="text-[10px] text-outline font-medium uppercase tracking-tighter">Updated 2 days ago</span>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Preview">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-outline hover:text-error transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <button className="text-primary font-bold text-sm px-4 py-2 hover:bg-primary-fixed rounded-xl transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Soft Skills Assessment */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden group hover:bg-surface-container-low transition-all duration-300 flex flex-col">
            <div className="h-40 relative overflow-hidden bg-surface-container-high">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent z-10"></div>
              <img className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEP-biCT4VqCjIap5ViKuze7YUCGkVAIQkd_kbIZrIj2OHwtsHY7n1lwZA2VYsrmw9aPh_TVvltHdFlujz-AFXS5tDNTIKCzO69hd0wF6gGXYq019h-eIJp1FCZ-Ng2BNwcP0UwK603yPr7FSXYUJRk2a-ZgdS39j3ETWIcLsmFSoGeVwyaiyzYiaAOwwyFQ2KU-j-XGI2NmKf4s9164uIuUmHoUWBKZh2ha1ogO4QiY_AM9kH1xF_-v496VTfN6EeCw6o_WLSgdHl" alt="Soft Skills Assessment" />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary">Interpersonal</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold font-headline mb-2 text-on-surface">Soft Skills Assessment</h3>
              <p className="text-sm text-outline mb-6 line-clamp-2">Metrics for communication, emotional intelligence, adaptability, and cultural fit within the organization.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center text-[8px] font-bold border-2 border-white">LC</div>
                </div>
                <span className="text-[10px] text-outline font-medium uppercase tracking-tighter">Updated 1 week ago</span>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Preview">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-outline hover:text-error transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <button className="text-primary font-bold text-sm px-4 py-2 hover:bg-primary-fixed rounded-xl transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Final Performance Report */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden group hover:bg-surface-container-low transition-all duration-300 flex flex-col">
            <div className="h-40 relative overflow-hidden bg-surface-container-high">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/10 to-transparent z-10"></div>
              <img className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjgGIN29fHXEfYdRDMCRAHUIEbwd0WPiwaQJLlF7qUZKBXv4A1-HkUw52qGOoJe_ILMlSpGcf1L4cCz7rDq3fcC_36u1iSl0dAXcKRrYtZXkNPGyPRuT6cSN9LMmC5_fgv5rh-2T4eJRYRF-QdZb_r93YDmax_rLTspIZ04Cvk6Y0RXy5ZJ7LlapgghMDADon-ZmG-Q5PCC1cc5w7K3psAno2GSfadwPwArVDMXo93Abbe6MLp7MG-xEB-9pBcR14-cZJ4Yr2_qta7" alt="Final Performance Report" />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-tertiary">Finalization</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold font-headline mb-2 text-on-surface">Final Performance Report</h3>
              <p className="text-sm text-outline mb-6 line-clamp-2">The concluding evaluation framework encompassing total project impact and long-term hiring potential.</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-on-primary-fixed-variant text-white flex items-center justify-center text-[8px] font-bold border-2 border-white">HQ</div>
                  <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-[8px] font-bold border-2 border-white">AS</div>
                </div>
                <span className="text-[10px] text-outline font-medium uppercase tracking-tighter">Updated 5 hours ago</span>
              </div>
              <div className="mt-auto pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-1">
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Preview">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                  <button className="p-2 text-outline hover:text-primary transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button className="p-2 text-outline hover:text-error transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <button className="text-primary font-bold text-sm px-4 py-2 hover:bg-primary-fixed rounded-xl transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          </div>

          {/* Empty State Card: Create from Scratch */}
          <div className="bg-surface-container-low border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-primary/40 hover:bg-surface-container-high transition-all duration-300 cursor-pointer min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary font-bold">add</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-2">Create from Scratch</h3>
            <p className="text-sm text-outline max-w-[200px]">Start with a blank canvas and build your own custom review logic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
