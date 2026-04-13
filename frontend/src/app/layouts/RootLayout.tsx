import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Download,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Logo from "../components/shared/Logo";
import { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentRole = user?.role || "student";

  const studentNav = [
    { path: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/student/profile", label: "Profile & Details", icon: User },
    { path: "/student/feedback", label: "Feedback", icon: MessageSquare },
    { path: "/student/downloads", label: "Downloads", icon: Download },
  ];

  const companyNav = [
    { path: "/company/student-details", label: "Student Details", icon: Users },
    { path: "/company/feedback-form", label: "Feedback Form", icon: ClipboardList },
    { path: "/company/form-editor", label: "Form Editor", icon: Settings },
  ];

  const navItems = currentRole === "student" ? studentNav : companyNav;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: isCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className="bg-card border-r border-border flex flex-col shadow-lg relative"
      >
        {/* Logo / Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative p-6 border-b border-border overflow-hidden"
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-50 to-transparent opacity-60" />

          {/* Logo content and collapse button */}
          <div className="relative z-10 flex items-center justify-between">
            <div className={isCollapsed ? "mx-auto" : ""}>
              <Logo size="md" variant={isCollapsed ? "icon" : "full"} />
            </div>
            {!isCollapsed && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            )}
          </div>

          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-transparent opacity-30" />
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: isCollapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 ${
                    isCollapsed ? "px-0 justify-center" : "px-4"
                  } py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {active && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-semibold text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 ${
              isCollapsed ? "px-0 justify-center" : "px-4"
            } py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-red-50 hover:text-red-600`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-semibold text-sm whitespace-nowrap overflow-hidden"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Expand Button (when collapsed) */}
        <AnimatePresence>
          {isCollapsed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCollapsed(false)}
              className="absolute top-6 -right-3 p-1.5 rounded-full bg-card border border-border shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-colors z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
