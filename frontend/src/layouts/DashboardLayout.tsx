import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isStudent = location.pathname.includes('/student/');
  const isFaculty = location.pathname.includes('/faculty/');
  const isCompany = location.pathname.includes('/company/');
  const isDashboardRoute = location.pathname.includes('/dashboard');

  const getSearchPlaceholder = (path: string) => {
    if (path.includes("templates")) return "Search templates...";
    if (path.includes("users")) return "Search users...";
    if (path.includes("reports")) return "Search reports...";
    if (path.includes("students")) return "Search students...";
    if (path.includes("form-builder")) return "Search forms...";
    if (path.includes("evaluation")) return "Search evaluations...";
    if (path.includes("verification")) return "Search documents...";
    if (path.includes("approval")) return "Search approvals...";
    if (path.includes("feedback")) return "Search feedback...";
    if (path.includes("confirmation")) return "Search confirmations...";
    if (path.includes("student/dashboard")) return "Search internships...";
    return "Search dashboard...";
  };
  const searchPlaceholder = getSearchPlaceholder(location.pathname);

  let navigation = [];
  if (isStudent) {
    navigation = [
      { name: "Dashboard", href: "/student/dashboard", icon: "dashboard" },
      { name: "Approval", href: "/student/approval", icon: "assignment_turned_in" },
      { name: "Feedback", href: "/student/feedback", icon: "rate_review" },
    ];
  } else if (isFaculty) {
    navigation = [
      { name: "Dashboard", href: "/faculty/dashboard", icon: "dashboard" },
      { name: "Form Builder", href: "/faculty/form-builder", icon: "school" },
      { name: "Student Management", href: "/faculty/students", icon: "group" },
      { name: "Evaluation Page", href: "/faculty/evaluation", icon: "grading" },
      { name: "Document Verifier", href: "/faculty/verification", icon: "verified" },
    ];
  } else if (isCompany) {
    navigation = [
      { name: "Feedback Form", href: "/company/feedback-form", icon: "corporate_fare" },
      { name: "Confirmation", href: "/company/confirmation", icon: "check_circle" },
    ];
  } else {
    // Admin or default
    navigation = [
      { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
      { name: "User Management", href: "/admin/users", icon: "group" },
      { name: "Templates", href: "/admin/templates", icon: "assignment" },
      { name: "Reports", href: "/admin/reports", icon: "analytics" },
    ];
  }

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* Sidebar Navigation */}
      <aside className={`h-screen ${isSidebarCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 bg-indigo-50 dark:bg-slate-900 flex flex-col py-6 z-[60] transition-all duration-300`}>
        <div className="text-indigo-700 dark:text-indigo-300 font-bold px-6 h-16 shrink-0 font-headline flex items-center overflow-hidden relative">
          <div className={`flex flex-col min-w-0 transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100'}`}>
            <div className="text-lg leading-tight truncate">
              Internship Feedback
            </div>
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1 truncate">
              Internship Portal
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`absolute w-8 h-8 border border-indigo-200 dark:border-slate-700 hover:bg-indigo-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center shrink-0 text-indigo-700 dark:text-indigo-300 shadow-sm transition-all duration-300 ${isSidebarCollapsed ? 'left-[24px]' : 'left-[190px]'}`}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}>chevron_left</span>
          </button>
        </div>
        <nav className="flex-1 mt-4">
          {navigation.map((item) => {
            // Check if current path starts with the href or matches exactly
            const isActive = location.pathname.startsWith(item.href) && (item.href !== '/' || location.pathname === '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                title={isSidebarCollapsed ? item.name : undefined}
                className={`py-3 flex items-center transition-all duration-300 overflow-hidden border-l-4 px-6 ${
                  isActive
                    ? "text-slate-900 dark:text-white font-bold border-indigo-600 bg-indigo-100/30"
                    : "text-slate-500 dark:text-slate-400 font-medium hover:bg-indigo-100/50 dark:hover:bg-slate-800 border-transparent"
                }`}
              >
                <span className={`material-symbols-outlined shrink-0 text-[1.4rem]`}>
                  {item.icon}
                </span>
                <span className={`font-label text-sm uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100 ml-3'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        {!isStudent && (
          <div className="px-4 mt-auto">
            <button 
              className={`w-full bg-primary-container text-white py-3 rounded-xl font-bold flex items-center overflow-hidden transition-all duration-300 active:scale-95 px-3`}
              title={isSidebarCollapsed ? "New Feedback" : undefined}
            >
              <span className="material-symbols-outlined shrink-0 mr-2">add_comment</span>
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}`}>
                New Feedback
              </span>
            </button>
          </div>
        )}
      </aside>

      {/* Top App Bar */}
      <header className={`fixed top-0 right-0 ${isSidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} z-50 h-16 glass-header shadow-indigo-900/5 shadow-xl flex justify-between items-center px-8 transition-all duration-300`}>
        <div className="flex items-center flex-1">
          {!isDashboardRoute && (
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-lg">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                search
              </span>
              <input
                className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 outline-none"
                placeholder={searchPlaceholder}
                type="text"
                onChange={(e) => localStorage.setItem("dashboardSearch", e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-300 transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-300 transition-colors relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full pointer-events-none"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-surface-variant overflow-hidden z-50 flex flex-col max-h-96">
                <div className="px-4 py-3 border-b border-surface-variant flex items-center justify-between">
                  <h3 className="font-bold text-sm dark:text-white">Notifications</h3>
                  <button className="text-[10px] text-primary dark:text-indigo-400 font-bold uppercase hover:underline">Mark all read</button>
                </div>
                <div className="overflow-y-auto">
                  <div className="p-4 hover:bg-surface-container-lowest dark:hover:bg-slate-700 transition-colors border-b border-surface-variant/50 cursor-pointer">
                    <p className="text-xs font-bold text-on-surface dark:text-white mb-1">Feedback Submitted</p>
                    <p className="text-[10px] text-outline dark:text-slate-400">Your company mentor has submitted their final review.</p>
                  </div>
                  <div className="p-4 hover:bg-surface-container-lowest dark:hover:bg-slate-700 transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-on-surface dark:text-white mb-1">Form Published</p>
                    <p className="text-[10px] text-outline dark:text-slate-400">A new mid-term evaluation form is available to fill out.</p>
                  </div>
                </div>
                <div className="p-2 border-t border-surface-variant text-center">
                  <button className="text-xs text-primary dark:text-indigo-400 font-bold w-full p-2 rounded-lg hover:bg-primary-fixed/20 dark:hover:bg-indigo-900/40 transition-colors">View All Activities</button>
                </div>
              </div>
            )}
          </div>


          <div className="relative">
            <button 
              className="h-8 w-8 rounded-full overflow-hidden ml-2 ring-2 ring-primary/10 hover:ring-primary/40 transition-all focus:outline-none"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
            >
              <img
                className="w-full h-full object-cover"
                alt="User Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTSnxJcfYaCZcaIES-1qBREpiEy5an-9SAO3CC_EYsLEsY-FMp_236NuAGYXL05VYWKeHfq6dCyT1UL0Ya6qqgRY6ysXHXIj9BncyPU4OCpXqyceaiKBtdP4iSv7kYjJGeGfL_AW4XpbMWECh2wVHcZG3dcrKWGp98_x7VpzaULlceuQouePfAV8_vTaiXPbhMDR56D8qjFeC4Qq7crcvVv6hLVvpgs1ncaHiudu25pawdUqT7afwx9WpteBI6LF9h1jIZvNzL5NkD"
              />
            </button>
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-surface-variant overflow-hidden p-1 z-50">
                <div className="px-3 py-2 border-b border-surface-variant mb-1">
                  <p className="text-xs font-bold text-on-surface dark:text-white">Demo User</p>
                  <p className="text-[10px] text-outline dark:text-slate-400">user@demo.com</p>
                </div>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full text-left px-3 py-2 text-sm text-error dark:text-red-400 hover:bg-error-container dark:hover:bg-red-900/30 hover:text-on-error-container dark:hover:text-red-300 rounded-lg flex items-center gap-2 transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} pt-16 min-h-screen bg-surface transition-all duration-300`}>
        <Outlet />
      </main>

      {/* Feedback Ribbon Decor */}
      <div className={`fixed bottom-0 ${isSidebarCollapsed ? 'left-20' : 'left-64'} right-0 h-1 bg-gradient-to-r from-secondary via-primary-container to-primary z-50 transition-all duration-300`}></div>
    </div>
  );
}
