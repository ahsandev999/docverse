import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { tools } from '../../lib/tools';

const popularToolsLinks = tools
  .filter(t => t.popular)
  .map(t => ({ label: t.shortName, to: `/tools/${t.slug}` }));

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="DocVerse home">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <FileText className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-heading">DocVerse</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
              The modern document platform for professionals. Convert, optimize, and organize your PDFs with ease.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize font-heading">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#tools" onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  All 15 Tools
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools (Clean Short Names) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize font-heading">Tools</h3>
            <ul className="space-y-2.5">
              {popularToolsLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#tools" onClick={(e) => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1">
                  <span>View All 15 Tools</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize font-heading">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize font-heading">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
                  Security Architecture
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">© 2026 DocVerse. All rights reserved.</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Made with ❤️ for the whole world.</p>
        </div>
      </div>
    </footer>
  );
}
