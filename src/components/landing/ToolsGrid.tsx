import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchTools, categoryLabels, iconMap, ToolCategory } from '../../lib/tools';

const categories: ('all' | ToolCategory)[] = ['all', 'convert', 'optimize', 'organize'];

export default function ToolsGrid() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | ToolCategory>('all');

  const filtered = useMemo(() => {
    let result = searchTools(search);
    if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory);
    return result;
  }, [search, activeCategory]);

  return (
    <section id="tools" className="py-24 sm:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">All the Tools You Need</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything to convert, optimize, and organize your documents — all in one place.</motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
            <input type="text" placeholder="Search tools..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search tools"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800" role="tablist" aria-label="Filter by category">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} role="tab" aria-selected={activeCategory === cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                {cat === 'all' ? 'All' : categoryLabels[cat as ToolCategory]}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
              <Link to={`/tools/${tool.slug}`} className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[tool.iconName] || '📄'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.name}</h3>
                    {tool.comingSoon && <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">Soon</span>}
                    {tool.popular && !tool.comingSoon && <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Popular</span>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{tool.inputFormat}</span>
                    <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">→</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{tool.outputFormat}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16"><p className="text-slate-500 dark:text-slate-400">No tools found matching your search.</p></div>
        )}
      </div>
    </section>
  );
}
