import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Palette, Code } from 'lucide-react';

const personas = [
  {
    icon: Briefcase,
    title: 'Business Professionals',
    description: 'Convert contracts, merge quarterly reports, compress slide decks, and share clean PDFs with clients and stakeholders.',
    popularTools: [
      { name: 'PDF to Word', slug: 'pdf-to-word' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: GraduationCap,
    title: 'Students & Educators',
    description: 'Combine research papers, extract specific textbook chapters, convert assignment files, and structure study materials.',
    popularTools: [
      { name: 'Extract Pages', slug: 'extract-pages' },
      { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
      { name: 'PDF to Word', slug: 'pdf-to-word' },
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Palette,
    title: 'Designers & Creatives',
    description: 'Extract graphics from PDFs, convert images into print-ready PDF portfolios, and extract high-res PNG visual assets.',
    popularTools: [
      { name: 'PDF to PNG', slug: 'pdf-to-png' },
      { name: 'PNG to PDF', slug: 'png-to-pdf' },
      { name: 'Extract Pages', slug: 'extract-pages' },
    ],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'Developers & Freelancers',
    description: 'Process client documentation, split large logs into targeted page ranges, and optimize file sizes for web delivery.',
    popularTools: [
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Rotate PDF', slug: 'rotate-pdf' },
      { name: 'Organize Pages', slug: 'organize-pages' },
    ],
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function UseCases() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="use-cases-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="use-cases-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            Built for Professionals
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whatever your role, DocVerse has the tools to power your document workflow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona, i) => (
            <motion.div key={persona.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center text-white mb-6 shadow-md`}>
                  <persona.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">{persona.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{persona.description}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Popular tools for this role:</p>
                <div className="flex flex-wrap gap-2">
                  {persona.popularTools.map(tool => (
                    <Link key={tool.slug} to={`/tools/${tool.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
