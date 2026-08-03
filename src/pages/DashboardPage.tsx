import Navbar from '../components/layout/Navbar';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardPageContent from '../components/dashboard/DashboardPage';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FileText } from 'lucide-react';
import Button from '../components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  useDocumentTitle('Dashboard');

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 font-heading">
              Sign in to access your Dashboard
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
              Your dashboard gives you access to recent files, quick actions, and all your document tools.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button to="/sign-in" size="lg">Sign In</Button>
              <Button to="/sign-up" variant="outline" size="lg">Create Account</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardPageContent />
    </DashboardLayout>
  );
}
