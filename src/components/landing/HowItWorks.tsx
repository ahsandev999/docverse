import { motion } from 'framer-motion';
import { Upload, Settings, Download } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Upload,
    title: '1. Upload',
    description: 'Drag & drop your document or browse files directly from your computer or mobile device.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    number: '2',
    icon: Settings,
    title: '2. Process',
    description: 'Select your target format or settings and let our high-speed engine handle the conversion.',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    number: '3',
    icon: Download,
    title: '3. Download',
    description: 'Save your transformed PDF or Office document in seconds with zero loss in visual quality.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/60 dark:border-slate-800/60" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="how-it-works-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            How DocVerse Works
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform your documents in three simple steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <step.icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
