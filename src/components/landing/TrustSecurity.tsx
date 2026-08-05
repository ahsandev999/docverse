import { motion } from 'framer-motion';
import { ShieldCheck, Trash2, EyeOff } from 'lucide-react';

const trustPillars = [
  {
    icon: ShieldCheck,
    title: 'End-to-End Encryption',
    description: 'Every file is encrypted during upload and transfer using industry-standard SSL/TLS protocols.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Trash2,
    title: 'Instant Auto-Deletion',
    description: 'All temporary files are permanently purged from servers immediately upon completion. Zero residual file storage.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    icon: EyeOff,
    title: 'Zero Data Collection',
    description: 'We never track, sell, or inspect document contents. Your private files belong strictly to you.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function TrustSecurity() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="trust-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            Your Privacy, Our Priority
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade security you can trust — with the simplicity you deserve.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 text-white shadow-lg`}>
                <pillar.icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">{pillar.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
