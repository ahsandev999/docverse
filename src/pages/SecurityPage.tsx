import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ShieldCheck, Lock, Trash2, Server, Key, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecurityPage() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise Infrastructure Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-4">
            Security Architecture
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            How DocVerse protects your data, documents, and privacy at every layer.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">TLS 1.3 Encryption</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">All data in transit is encrypted using modern TLS 1.3 with Perfect Forward Secrecy.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">Instant Purge Protocol</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Temporary server processing files are immediately unlinked (`fs.unlinkSync`) after task completion.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">Isolated Sandbox Memory</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Processes run in ephemeral, non-persistent sandboxed memory containers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2">No Content Logging</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">We never store, log, or index document contents, metadata, or rendered text.</p>
            </div>
          </div>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Security Disclosures & Contact
            </h2>
            <p className="mb-4">
              If you discover a security vulnerability or have questions about our infrastructure, please submit vulnerability reports directly to our security team.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors">
              Submit Security Disclosure <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
