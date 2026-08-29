import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ShieldCheck, Lock, Trash2, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last Updated: January 2026 · DocVerse Platform Security Standard
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              1. Our Zero-Retention Guarantee
            </h2>
            <p>
              DocVerse is built on a strict privacy-first principle. We do not sell, rent, monetize, or inspect any files uploaded to our platform. Document processing occurs either locally inside your web browser via JavaScript/WebAssembly or in transient memory on encrypted temporary workers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              2. File Uploads & Instant Auto-Deletion
            </h2>
            <p>
              When you upload files for document conversion or editing, your files are processed in isolated memory. Once processing finishes, any server-processed temporary files are <strong>immediately and permanently deleted</strong> (`fs.unlinkSync`) inside our execution pipeline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs mb-1">
                  <Trash2 className="w-4 h-4 text-emerald-500" /> Instant Purge
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Files are automatically destroyed the moment your download starts.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs mb-1">
                  <EyeOff className="w-4 h-4 text-indigo-500" /> No Content Analysis
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">We do not scan text, extract data for AI training, or view document contents.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              3. Data Encryption in Transit
            </h2>
            <p>
              All traffic between your browser and DocVerse is encrypted using modern 256-bit SSL/TLS protocol. No unencrypted file transfers ever take place across our infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              4. Cookies & Analytics
            </h2>
            <p>
              DocVerse uses strictly necessary session cookies required for authentication and dark mode preference persistence. We do not use intrusive third-party cross-site advertising cookies.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              5. Contact Us Regarding Privacy
            </h2>
            <p className="mb-4">
              If you have any questions or security concerns regarding our privacy policy, please submit an inquiry directly to our team via our secure contact portal.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors">
              Contact Privacy Team <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
