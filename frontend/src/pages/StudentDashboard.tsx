import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Stage = {
  name: string;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  action: string;
  buttonText: string;
  buttonAction: () => void;
};

type Notification = {
  icon: string;
  title: string;
  description: string;
  time: string;
};

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [stages, setStages] = useState<Stage[]>([
    { name: "Docs Submitted", completed: true },
    { name: "Docs Approved", completed: true },
    { name: "Midterm Feedback", completed: false },
    { name: "Final Evaluation", completed: false },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      icon: "check_circle",
      title: "Offer Letter Approved",
      description: "Your initial document was verified by Dr. Robert Miller.",
      time: "2 hours ago",
    },
    {
      icon: "edit_document",
      title: "Feedback Form Assigned",
      description: "You have a new \"Midterm Logbook\" assigned.",
      time: "1 day ago",
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: "midterm",
      title: "Midterm Logbook",
      description: "Due in 2 days",
      dueDate: "Oct 20, 2024",
      action: "Midterm Logbook",
      buttonText: "Start",
      buttonAction: () => navigate("/student/feedback"),
    },
    {
      id: "noc",
      title: "Updated NOC Upload",
      description: "Requested by faculty",
      dueDate: "",
      action: "Updated NOC Upload",
      buttonText: "Upload",
      buttonAction: () => navigate("/student/approval"),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load from localStorage
    const savedStages = localStorage.getItem("studentStages");
    if (savedStages) {
      setStages(JSON.parse(savedStages));
    }

    const savedNotifications = localStorage.getItem("studentNotifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    // Save stages to localStorage whenever they change
    localStorage.setItem("studentStages", JSON.stringify(stages));
  }, [stages]);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem("studentNotifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    // Periodically check for updates from other pages
    const interval = setInterval(() => {
      const savedStages = localStorage.getItem("studentStages");
      if (savedStages) {
        const newStages = JSON.parse(savedStages);
        setStages((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(newStages)) {
            return newStages;
          }
          return prev;
        });
      }

      const savedNotifications = localStorage.getItem("studentNotifications");
      if (savedNotifications) {
        const newNotifications = JSON.parse(savedNotifications);
        setNotifications((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(newNotifications)) {
            return newNotifications;
          }
          return prev;
        });
      }

      const savedSearch = localStorage.getItem("dashboardSearch") || "";
      setSearchTerm(savedSearch);
    }, 500); // Check every 500ms for search

    return () => clearInterval(interval);
  }, []);

  const completedStages = stages.filter((stage) => stage.completed).length;
  const progressWidth = `${(completedStages / stages.length) * 100}%`;

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageIcon = (stage: Stage, index: number) => {
    if (stage.completed) {
      return { icon: "check", color: "bg-secondary", textColor: "text-secondary" };
    } else if (index === completedStages) {
      return { icon: "timer", color: "bg-primary", textColor: "text-primary" };
    } else {
      return { icon: "grading", color: "bg-surface-container-high", textColor: "text-outline" };
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Internship Portfolio</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Summer 2024 Cycle • Full-stack Development Track</p>
        </div>
      </div>

      {/* Milestone Progress Tracker (Bento Style) */}
      <section className="bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden border border-surface-variant">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/10 blur-[100px] -z-10"></div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="headline text-lg font-bold">Internship Status Overview</h2>
          <span className="text-sm font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full">Active Internship</span>
        </div>
        <div className="relative flex justify-between items-start w-full">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-high -z-0">
            <div className={`h-full bg-gradient-to-r from-secondary via-secondary to-primary rounded-full`} style={{ width: progressWidth }}></div>
          </div>
          {/* Milestones */}
          {stages.map((stage, index) => {
            const { icon, color, textColor } = getStageIcon(stage, index);
            return (
              <div key={stage.name} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white ring-8 ring-white shadow-md ${stage.completed ? "" : "shadow-lg shadow-primary/30"}`}>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${textColor} text-center`}>
                  {stage.name.split(" ").map((word: string, i: number) => (
                    <span key={i}>{word}<br /></span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pending Tasks and Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pending Tasks */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-error-container/30 rounded-lg flex items-center justify-center text-error">
                <span className="material-symbols-outlined">assignment_late</span>
             </div>
             <h3 className="headline text-lg font-bold">Pending Tasks</h3>
          </div>
          <div className="space-y-4">
             {filteredTasks.length > 0 ? (
               filteredTasks.map((task) => (
                 <div key={task.id} className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border-l-4 border-error">
                   <div>
                     <p className="font-bold text-sm text-on-surface">{task.title}</p>
                     <p className="text-xs text-outline mt-1">{task.description}</p>
                   </div>
                   <button
                     className="text-xs font-bold bg-error text-white px-3 py-1.5 rounded-lg hover:opacity-90"
                     onClick={task.buttonAction}
                   >
                     {task.buttonText}
                   </button>
                 </div>
               ))
             ) : (
               <p className="text-center text-outline py-4">No results found</p>
             )}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-secondary-container/30 rounded-lg flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">notifications_active</span>
             </div>
             <h3 className="headline text-lg font-bold">Recent Notifications</h3>
          </div>
          <div className="space-y-4">
             {filteredNotifications.length > 0 ? (
               filteredNotifications.map((notification, index) => (
                 <div key={index} className="flex gap-4 items-start">
                   <span className={`material-symbols-outlined ${notification.icon === "check_circle" ? "text-secondary" : "text-primary"} bg-${notification.icon === "check_circle" ? "secondary" : "primary"}-container/20 p-2 rounded-full text-sm mt-1`}>
                     {notification.icon}
                   </span>
                   <div>
                     <p className="font-bold text-sm">{notification.title}</p>
                     <p className="text-xs text-on-surface-variant mt-1">{notification.description}</p>
                     <p className="text-[10px] text-outline mt-2">{notification.time}</p>
                   </div>
                 </div>
               ))
             ) : (
               <p className="text-center text-outline py-4">No results found</p>
             )}
          </div>
        </div>

      </section>
    </div>
  );
}

