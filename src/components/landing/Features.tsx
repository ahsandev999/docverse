import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Layers, Clock, Sparkles } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Process documents in seconds, not minutes. Our optimized engine handles even large files with incredible speed.', gradient: 'from-amber-500 to-orange-500' },
  { icon: Shield, title: 'Bank-Level Security', description: 'Your files are encrypted end-to-end and automatically deleted after processing. Privacy is our priority.', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Globe, title: 'Works Everywhere', description: 'No downloads or installations needed. Access DocVerse from any modern browser on any device.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Layers, title: 'Batch Processing', description: 'Process multiple files at once. Upload, convert, and download in bulk to save valuable time.', gradient: 'from-violet-500 to-purple-500' },
  { icon: Clock, title: 'Instant Results', description: 'No waiting in queues. Your documents are processed immediately with real-time progress updates.', gradient: 'from-pink-500 to-rose-500' },
  { icon: Sparkles, title: 'AI-Powered (Coming Soon)', description: 'Intelligent document analysis, smart OCR, and automated workflows powered by cutting-edge AI.', gradient: 'from-indigo-500 to-violet-500' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="features-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            Why Choose DocVerse?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Built for speed, security, and simplicity. Every feature designed to make your document workflow seamless.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.1, 0.4) }}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading">{feature.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
