import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>DocVerse Terms of Service</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last Updated: January 2026 · Standard Terms & Conditions
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using DocVerse (https://docverse.cloud), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              2. Acceptable Use Policy
            </h2>
            <p>
              DocVerse provides 100% free document conversion, optimization, and page management tools. You agree not to upload any content that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Violates copyright, trademark, or intellectual property laws.</li>
              <li>Contains malware, viruses, trojans, or malicious code.</li>
              <li>Promotes illegal activities or unlawful content.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              3. Service Availability & Limitations
            </h2>
            <p>
              While DocVerse strives to maintain 99.9% service uptime, we provide services on an "as is" and "as available" basis. Upload file size is capped at 100 MB per file to ensure optimal server performance for all users.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              4. Disclaimer of Warranty & Liability
            </h2>
            <p>
              DocVerse shall not be liable for any indirect, incidental, or consequential damages resulting from document conversion or use of the web application. Users are recommended to maintain backups of their original documents.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              5. Questions & Legal Inquiries
            </h2>
            <p className="mb-4">
              For legal questions regarding terms or copyright inquiries, reach out to our team via our support page.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors">
              Contact Legal & Support <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
