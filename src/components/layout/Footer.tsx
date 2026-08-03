import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';
import { tools } from '../../lib/tools';

const footerLinks = {
  product: [
    { label: 'Features', to: '/#features' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
  tools: tools.filter(t => t.popular).map(t => ({ label: t.name, to: `/tools/${t.slug}` })),
  company: [
    { label: 'About', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Contact', to: '#' },
  ],
  legal: [
    { label: 'Privacy', to: '#' },
    { label: 'Terms', to: '#' },
    { label: 'Security', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="DocVerse home">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-heading">DocVerse</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
              The modern document platform for professionals. Convert, optimize, and organize with ease.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label={['Twitter', 'GitHub', 'LinkedIn'][i]}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}><Link to={link.to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} DocVerse. All rights reserved.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Made with care for document professionals.</p>
        </div>
      </div>
    </footer>
  );
}
