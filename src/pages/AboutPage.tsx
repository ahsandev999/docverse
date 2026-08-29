import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FileText, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6">
            <FileText className="w-4 h-4" />
            <span>The DocVerse Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-6">
            About DocVerse
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            DocVerse was created to eliminate the frustration of paywalled, ad-cluttered, and slow online PDF tools. We believe document tools should be instant, secure, and 100% free for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">High Speed</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Client-side processing & web assembly deliver instant conversions.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">100% Private</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Zero persistent file retention. Files purged immediately after completion.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">Free Forever</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">No mandatory sign-ups, no hidden payments, zero watermarks.</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link to="/#tools" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors">
            Explore All 15 Tools
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
