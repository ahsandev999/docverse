import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

type StatusType = 'yes' | 'partial' | 'varies';

interface FeatureRow {
  feature: string;
  docverse: StatusType;
  ilovepdf: StatusType;
  smallpdf: StatusType;
}

const featuresList: FeatureRow[] = [
  { feature: '100% Free Core Tools', docverse: 'yes', ilovepdf: 'partial', smallpdf: 'partial' },
  { feature: 'No Mandatory Signup', docverse: 'yes', ilovepdf: 'partial', smallpdf: 'varies' },
  { feature: 'Dark Mode Interface', docverse: 'yes', ilovepdf: 'varies', smallpdf: 'varies' },
  { feature: 'Client-Side Browser Processing', docverse: 'yes', ilovepdf: 'varies', smallpdf: 'varies' },
  { feature: 'Zero Watermarks', docverse: 'yes', ilovepdf: 'partial', smallpdf: 'partial' },
  { feature: 'No Daily Task Limits', docverse: 'yes', ilovepdf: 'partial', smallpdf: 'partial' },
  { feature: 'Modern Clean UI', docverse: 'yes', ilovepdf: 'yes', smallpdf: 'yes' },
  { feature: 'Instant Auto-Deletion Policy', docverse: 'yes', ilovepdf: 'partial', smallpdf: 'partial' },
];

function StatusBadge({ status }: { status: StatusType }) {
  if (status === 'yes') {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
        <Check className="w-3.5 h-3.5" /> Full Support
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-medium text-xs bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200/50 dark:border-amber-800/40">
        Limited / Premium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
      Varies by Tool
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950" aria-labelledby="comparison-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="comparison-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            Compare DocVerse with Other PDF Tools
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Review features, privacy policies, and accessibility options across document platforms.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  <th className="py-5 px-6">Feature</th>
                  <th className="py-5 px-6 text-indigo-600 dark:text-indigo-400 font-extrabold">DocVerse</th>
                  <th className="py-5 px-6">iLovePDF</th>
                  <th className="py-5 px-6">Smallpdf</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {featuresList.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                    <td className="py-4 px-6 font-bold bg-indigo-50/20 dark:bg-indigo-950/20"><StatusBadge status={row.docverse} /></td>
                    <td className="py-4 px-6"><StatusBadge status={row.ilovepdf} /></td>
                    <td className="py-4 px-6"><StatusBadge status={row.smallpdf} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 text-indigo-500 mt-0.5" aria-hidden="true" />
            <p>
              Comparison is based on publicly available features as of 2026. Features, plan tiers, and daily limits may vary or change over time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
