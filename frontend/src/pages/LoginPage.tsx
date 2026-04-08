import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'Admin' | 'Student' | 'Faculty' | 'Company';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const getDemoCredentials = (role: Role) => {
    return {
      email: `${role.toLowerCase()}@demo.com`,
      password: 'password123'
    };
  }

  // Pre-fill demo credentials when role changes
  useEffect(() => {
    const creds = getDemoCredentials(selectedRole);
    setEmail(creds.email);
    setPassword(creds.password);
  }, [selectedRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect based on role
    if (selectedRole === 'Admin') navigate('/admin/dashboard');
    else if (selectedRole === 'Student') navigate('/student/dashboard');
    else if (selectedRole === 'Faculty') navigate('/faculty/dashboard');
    else if (selectedRole === 'Company') navigate('/company/feedback-form');
  };

  return (
    <div className="flex min-h-screen bg-surface font-body w-full">
      {/* Left Side - Hero / Feature Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-[#4d44e3] to-secondary-container text-white p-12 flex-col relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        {/* Network / Nodes Graphic (CSS simulation) */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl w-fit mb-12 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">school</span>
              Internship Portal
            </h2>
          </div>

          <div className="mt-auto mb-16">
            <h1 className="text-5xl font-extrabold font-headline mb-4 tracking-tight leading-tight">
              Welcome to the <br /> Internship Feedback Hub
            </h1>
            <p className="text-lg opacity-90 mb-10 max-w-lg leading-relaxed">
              Our ultimate smart solution for seamless academic monitoring, performance reviews, and administrative excellence.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined">group</span>
                  <h3 className="font-bold text-sm">Role Management</h3>
                </div>
                <p className="text-xs opacity-75">Streamlined access for all stakeholders.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined">analytics</span>
                  <h3 className="font-bold text-sm">Performance Tracking</h3>
                </div>
                <p className="text-xs opacity-75">Real-time metrics and detailed rubrics.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined">assignment</span>
                  <h3 className="font-bold text-sm">Template Engine</h3>
                </div>
                <p className="text-xs opacity-75">Customizable evaluation frameworks.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined">corporate_fare</span>
                  <h3 className="font-bold text-sm">Industry Connect</h3>
                </div>
                <p className="text-xs opacity-75">Direct pathways with partnered companies.</p>
              </div>
            </div>
          </div>
          
          <div className="text-xs opacity-60 text-center mt-auto pt-8 border-t border-white/10">
            &copy; 2026 Internship Feedback System. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative p-8 bg-surface-container-lowest overflow-hidden">
        {/* Soft Background Blobs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-fixed opacity-40 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-fixed opacity-30 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-indigo-900/10 border border-surface-variant">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-container text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 scale-110">
                <span className="material-symbols-outlined text-4xl">fingerprint</span>
              </div>
              <h2 className="text-2xl font-extrabold font-headline text-on-surface">Sign In</h2>
              <p className="text-sm text-outline mt-1">Select your portal role to continue</p>
            </div>

            {/* Role Selection */}
            <div className="bg-surface-container rounded-xl p-1 mb-6 flex flex-wrap gap-1 relative z-20">
              {(['Student', 'Faculty', 'Company', 'Admin'] as Role[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2
                    ${selectedRole === role 
                      ? 'bg-white text-primary shadow-md scale-100 ring-1 ring-black/5 z-10' 
                      : 'text-outline hover:text-on-surface hover:bg-surface-container-high scale-[0.98]'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {role === 'Student' ? 'person' : 
                     role === 'Faculty' ? 'school' : 
                     role === 'Company' ? 'corporate_fare' : 'admin_panel_settings'}
                  </span>
                  <span className="hidden sm:inline">{role}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">
                  {selectedRole} ID / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-primary bg-primary-container p-1.5 rounded-lg text-sm">
                      badge
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-lowest border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-14 pr-4 transition-all text-sm font-medium"
                    placeholder={`Enter your ${selectedRole.toLowerCase()} credentials`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-primary bg-primary-container p-1.5 rounded-lg text-sm">
                      lock
                    </span>
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-lowest border-2 border-surface-container outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-3 pl-14 pr-4 transition-all text-sm font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary border-outline-variant rounded-md w-4 h-4 cursor-pointer" />
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">Remember me</span>
                </label>
                <a href="#" className="flex text-sm font-bold text-primary hover:underline group items-center">
                  Forgot Password?
                </a>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none mt-4"
              >
                Login as {selectedRole}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
