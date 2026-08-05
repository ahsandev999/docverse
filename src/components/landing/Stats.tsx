import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const stats = [
  { value: '15+', label: 'Powerful PDF Tools' },
  { value: '100%', label: 'Client-Side Privacy' },
  { value: 'Zero', label: 'Data Stored on Servers' },
  { value: 'Free', label: 'To Get Started' },
];

export function Stats() {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/60" aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent mb-2 font-heading">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50" aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 sm:p-16 text-center">
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 font-heading">Start Transforming<br />Documents in Seconds</h2>
            <p className="text-lg text-indigo-100 max-w-xl mx-auto mb-10">No signup. No credit card. No hidden limits. Just powerful PDF tools that work — for free, forever.</p>
            <div className="flex items-center justify-center">
              <Link to={user ? "/dashboard" : "/sign-up"} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 transition-colors shadow-xl">
                Try DocVerse Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
