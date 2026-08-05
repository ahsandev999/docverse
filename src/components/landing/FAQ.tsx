import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const homepageFaqs = [
  {
    question: 'Is DocVerse really free?',
    answer: 'Yes, DocVerse is 100% free forever with no hidden fees, no watermarks, and no signup required. Use all 15+ tools without limits.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No signup or registration needed. Simply upload your file and start using any tool instantly.'
  },
  {
    question: 'Are my files safe when I use DocVerse?',
    answer: 'Absolutely. All processing occurs in temporary memory or locally in your browser, and temporary server files are deleted immediately after completion.'
  },
  {
    question: 'What is the maximum file size I can upload?',
    answer: 'DocVerse supports files up to 100 MB per upload across all tools.'
  },
  {
    question: 'Does DocVerse work on mobile devices?',
    answer: 'Yes. DocVerse works flawlessly in any modern browser on Windows, Mac, Linux, iOS, and Android.'
  },
  {
    question: 'How many tools does DocVerse offer?',
    answer: 'DocVerse currently offers 15+ powerful PDF tools including converters, mergers, splitters, compressors, and page editors.'
  },
  {
    question: 'Will there be watermarks on my files?',
    answer: 'No. DocVerse produces clean, professional files with zero watermarks or branding.'
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No installation required. DocVerse works entirely in your browser — no downloads, no plugins, nothing to install.'
  },
  {
    question: 'Can I process multiple files at once?',
    answer: 'Yes. Most DocVerse tools support batch processing so you can convert, merge, or edit multiple files simultaneously.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'DocVerse supports PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, JPG, JPEG, and PNG formats across various tools.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 id="faq-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 font-heading">
            Frequently Asked Questions
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about DocVerse.
          </motion.p>
        </div>

        <div className="space-y-4">
          {homepageFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={faq.question} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all">
                <button onClick={() => toggleFaq(i)} aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span className="text-base sm:text-lg font-heading">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
