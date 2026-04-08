
import { Link } from 'react-router-dom';

export default function CompanyConfirmation() {
  return (
    <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
      <div className="bg-surface-container-lowest rounded-3xl p-10 md:p-16 border border-surface-variant text-center max-w-2xl w-full relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/20 blur-[100px] -z-10 -m-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-fixed/20 blur-[100px] -z-10 -m-32"></div>

        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 scale-110">
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">Feedback Recorded</h1>
        <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-lg mx-auto mb-10">
          Your evaluation has been successfully submitted to the institution. A copy of the receipt has been emailed to you.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/company/feedback-form" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full sm:w-auto">
            Submit Another
          </Link>
          <Link to="/login" className="px-8 py-4 border-2 border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-low transition-colors w-full sm:w-auto">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
