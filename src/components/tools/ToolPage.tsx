import { useState, useCallback, useEffect, useRef, useId } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Download, Loader2, CheckCircle, AlertCircle, RotateCcw, ArrowRight, Clock } from 'lucide-react';
import { getToolBySlug, tools, iconMap } from '../../lib/tools';
import { mergePDFs, rotatePDF, deletePages, extractPages, imagesToPDF, compressPDF, splitPDF, getPDFPageCount, convertDocumentToPDF, PDFProcessingError } from '../../lib/pdf-utils';
import { addRecentFile, generateId } from '../../lib/storage';
import { logFileProcessing } from '../../lib/api-client';
import { convertPdfToImages } from '../../lib/pdf-renderer';
import OrganizePagesUI from './OrganizePagesUI';
import DropZone from '../ui/DropZone';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

type ProcessingState = 'idle' | 'processing' | 'done' | 'error';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || '');
  const gradientId = useId();
  useDocumentTitle(tool ? tool.name : 'Tool Not Found');

  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessingState>('idle');
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [pageInput, setPageInput] = useState<string>('');
  const [imageQuality, setImageQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup blob URL on unmount or when resultUrl changes
  const prevResultUrl = useRef<string | null>(null);
  useEffect(() => {
    if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current);
    prevResultUrl.current = resultUrl;
    return () => { if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current); };
  }, [resultUrl]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, []);

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    const valid = (newFiles || []).filter((f): f is File => Boolean(f && f.name));
    if (valid.length === 0) return;
    setFiles(prev => tool?.multiple ? [...(prev || []), ...valid] : valid);
    setState('idle'); setResultUrl(null); setResultName(null); setErrorMsg('');
    if (valid[0]?.type === 'application/pdf') {
      try { setPageCount(await getPDFPageCount(valid[0])); } catch { setPageCount(0); }
    }
  }, [tool?.multiple]);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const parsePageNumbers = (input: string, maxPage: number): number[] => {
    const result: number[] = [];
    for (const part of input.split(',')) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [s, e] = trimmed.split('-').map(x => parseInt(x.trim(), 10) - 1);
        if (!isNaN(s) && !isNaN(e)) for (let i = Math.max(0, s); i <= Math.min(e, maxPage - 1); i++) result.push(i);
      } else {
        const n = parseInt(trimmed, 10) - 1;
        if (!isNaN(n) && n >= 0 && n < maxPage) result.push(n);
      }
    }
    return [...new Set(result)].sort((a, b) => a - b);
  };

  const processFiles = useCallback(async () => {
    if (!tool || files.length === 0) return;
    setState('processing'); setProgress(0); setErrorMsg('');
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => setProgress(p => Math.min(p + Math.random() * 15, 90)), 300);

    try {
      let result: Uint8Array | null = null;
      let outputName = '';

      switch (tool.slug) {
        case 'merge-pdf': { result = await mergePDFs(files); outputName = 'merged.pdf'; break; }
        case 'rotate-pdf': { result = await rotatePDF(files[0], rotationAngle); outputName = `rotated-${rotationAngle}.pdf`; break; }
        case 'delete-pages': {
          const indices = parsePageNumbers(pageInput, pageCount);
          if (indices.length === 0) throw new PDFProcessingError('Please enter page numbers to delete (e.g., 1, 3, 5-7)', 'empty');
          result = await deletePages(files[0], indices); outputName = 'pages-deleted.pdf'; break;
        }
        case 'extract-pages': {
          const indices = parsePageNumbers(pageInput, pageCount);
          if (indices.length === 0) throw new PDFProcessingError('Please enter page numbers to extract (e.g., 1, 3, 5-7)', 'empty');
          result = await extractPages(files[0], indices); outputName = 'extracted.pdf'; break;
        }
        case 'split-pdf': {
          const indices = parsePageNumbers(pageInput, pageCount);
          const ranges = indices.length === 0 ? Array.from({ length: pageCount }, (_, i) => [i]) : [indices];
          const results = await splitPDF(files[0], ranges);
          if (results.length > 0) { result = results[0]; outputName = 'split.pdf'; }
          break;
        }
        case 'jpg-to-pdf': case 'png-to-pdf': { result = await imagesToPDF(files); outputName = 'images.pdf'; break; }
        case 'compress-pdf': { result = await compressPDF(files[0]); outputName = 'compressed.pdf'; break; }
        case 'word-to-pdf': case 'excel-to-pdf': case 'powerpoint-to-pdf': {
          result = await convertDocumentToPDF(files[0], tool.slug.split('-')[0]);
          outputName = `${files[0].name.split('.')[0]}.pdf`;
          break;
        }
        case 'pdf-to-word': {
          throw new PDFProcessingError('PDF to Word requires server-side processing engine.', 'unknown');
        }
        case 'pdf-to-jpg': case 'pdf-to-png': {
          const isJpeg = tool.slug === 'pdf-to-jpg';
          const scale = imageQuality === 'low' ? 1.0 : imageQuality === 'high' ? 2.0 : 1.5;
          const imgResult = await convertPdfToImages(files[0], {
            format: isJpeg ? 'jpeg' : 'png',
            qualityScale: scale,
            onProgress: (curr, total) => setProgress(Math.round((curr / total) * 90)),
          });
          const url = URL.createObjectURL(imgResult.blob);
          setResultUrl(url);
          setResultName(imgResult.filename);
          addRecentFile({
            id: generateId(),
            name: imgResult.filename,
            size: imgResult.blob.size,
            type: imgResult.mimeType,
            toolSlug: tool.slug,
            createdAt: new Date().toISOString(),
            status: 'completed',
          });
          logFileProcessing(tool.slug, imgResult.filename, imgResult.blob.size);
          if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
          setProgress(100);
          setState('done');
          return;
        }
        case 'organize-pages': {
          result = await rotatePDF(files[0], 0);
          outputName = 'organized.pdf';
          break;
        }
        default: {
          result = await compressPDF(files[0]);
          outputName = 'processed.pdf';
          break;
        }
      }

      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
      setProgress(100);

      if (result) {
        const blob = new Blob([result.buffer as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResultUrl(url); setResultName(outputName);
        addRecentFile({ id: generateId(), name: outputName, size: result.length, type: 'application/pdf', toolSlug: tool.slug, createdAt: new Date().toISOString(), status: 'completed' });
        logFileProcessing(tool.slug, outputName, result.length);
      }
      setState('done');
    } catch (err) {
      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
      if (err instanceof PDFProcessingError) { setErrorMsg(err.message); }
      else {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('encrypted') || msg.includes('password')) setErrorMsg('This PDF is password-protected and cannot be processed.');
        else if (msg.includes('Invalid PDF') || msg.includes('parse')) setErrorMsg('The file appears to be corrupted or is not a valid PDF.');
        else setErrorMsg('An error occurred while processing your file. Please try again.');
      }
      console.error('[DocVerse] Processing error:', err);
      setState('error');
    }
  }, [tool, files, pageCount, pageInput, rotationAngle, imageQuality]);

  const handleDownload = () => {
    if (resultUrl && resultName) {
      const a = document.createElement('a'); a.href = resultUrl; a.download = resultName;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    setFiles([]); setState('idle'); setProgress(0); setResultUrl(null); setResultName(null);
    setErrorMsg(''); setPageCount(0); setPageInput(''); setRotationAngle(90);
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-heading">Tool Not Found</h1>
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const relatedTools = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  // Coming soon state
  if (tool.comingSoon) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <Link to="/#tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tools</Link>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <span className="text-slate-900 dark:text-white font-medium">{tool.name}</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                {iconMap[tool.iconName] || '📄'}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">{tool.name}</h1>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">Coming Soon</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl">{tool.longDescription}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
              <Clock className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-heading">This Tool Is Coming Soon</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              We're working hard to bring you {tool.name}. This tool requires server-side processing and will be available in a future update.
            </p>
            <Link to="/#tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
              Browse Available Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link to="/#tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tools</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-slate-900 dark:text-white font-medium">{tool.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
              {iconMap[tool.iconName] || '📄'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 font-heading">{tool.name}</h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">{tool.longDescription}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">{tool.inputFormat} → {tool.outputFormat}</span>
                {tool.popular && <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">Popular</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DropZone onFilesSelected={handleFilesSelected} accept={tool.acceptTypes} multiple={tool.multiple} files={files} onRemoveFile={handleRemoveFile} />
                {files.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                    {tool.slug === 'rotate-pdf' && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Rotation Angle</label>
                        <div className="flex items-center gap-2" role="radiogroup" aria-label="Rotation angle">
                          {[90, 180, 270].map(angle => (
                            <button key={angle} onClick={() => setRotationAngle(angle)} role="radio" aria-checked={rotationAngle === angle}
                              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${rotationAngle === angle ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-300'}`}>
                              {angle}°
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {['delete-pages', 'extract-pages', 'split-pdf'].includes(tool.slug) && pageCount > 0 && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label htmlFor="page-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {tool.slug === 'delete-pages' ? 'Pages to Delete' : tool.slug === 'extract-pages' ? 'Pages to Extract' : 'Pages to Split'}
                        </label>
                        <input id="page-input" type="text" value={pageInput} onChange={e => setPageInput(e.target.value)}
                          placeholder={`e.g., 1, 3, 5-7 (PDF has ${pageCount} page${pageCount !== 1 ? 's' : ''})`}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
                        <p className="text-xs text-slate-400 mt-1.5">
                          This PDF has {pageCount} page{pageCount !== 1 ? 's' : ''}. Enter page numbers separated by commas, or ranges like 1-5.
                          {tool.slug === 'split-pdf' && ' Leave empty to split every page into separate files.'}
                        </p>
                      </div>
                    )}
                    {['pdf-to-jpg', 'pdf-to-png'].includes(tool.slug) && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Image Quality & Resolution</label>
                        <div className="flex items-center gap-2" role="radiogroup" aria-label="Image resolution quality">
                          {(['low', 'medium', 'high'] as const).map(q => (
                            <button key={q} onClick={() => setImageQuality(q)} role="radio" aria-checked={imageQuality === q}
                              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${imageQuality === q ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-300'}`}>
                              {q} ({q === 'low' ? '150 DPI' : q === 'medium' ? '300 DPI' : '600 DPI'})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {tool.slug === 'organize-pages' ? (
                      <OrganizePagesUI
                        file={files[0]}
                        onSave={(resultBytes, name) => {
                          const blob = new Blob([resultBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
                          const url = URL.createObjectURL(blob);
                          setResultUrl(url);
                          setResultName(name);
                          addRecentFile({
                            id: generateId(),
                            name,
                            size: resultBytes.length,
                            type: 'application/pdf',
                            toolSlug: tool.slug,
                            createdAt: new Date().toISOString(),
                            status: 'completed',
                          });
                          logFileProcessing(tool.slug, name, resultBytes.length);
                          setState('done');
                        }}
                        onError={(msg) => {
                          setErrorMsg(msg);
                          setState('error');
                        }}
                      />
                    ) : (
                      <div className="flex justify-center">
                        <button onClick={processFiles} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 hover:-translate-y-0.5">
                          Process {files.length} File{files.length > 1 ? 's' : ''} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
            {state === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 text-center" aria-live="polite" role="status">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
                  <svg className="absolute inset-0 w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="40" r="36" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${progress * 2.26} 226`} className="transition-all duration-300" />
                    <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin" /></div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading">Processing your document...</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">This usually takes a few seconds</p>
              </motion.div>
            )}
            {state === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-8 text-center" aria-live="polite">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" /></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading">Processing Complete!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your file is ready to download</p>
                {resultName && (
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center"><span className="text-lg" aria-hidden="true">📄</span></div>
                    <div className="text-left"><p className="text-sm font-medium text-slate-900 dark:text-white">{resultName}</p><p className="text-xs text-slate-400">Ready to download</p></div>
                  </div>
                )}
                <div className="flex items-center justify-center gap-3">
                  <button onClick={handleDownload} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5"><Download className="w-4 h-4" />Download</button>
                  <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><RotateCcw className="w-4 h-4" />Process Another</button>
                </div>
              </motion.div>
            )}
            {state === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center" aria-live="assertive">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"><AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" /></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading">Processing Failed</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">{errorMsg}</p>
                <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><RotateCcw className="w-4 h-4" />Try Again</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-heading">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tool.steps.map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center flex-shrink-0"><span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{i + 1}</span></div>
                <p className="text-sm text-slate-600 dark:text-slate-400 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {relatedTools.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 font-heading">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map(rt => (
                <Link key={rt.id} to={`/tools/${rt.slug}`} onClick={handleReset} className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rt.gradient} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>{iconMap[rt.iconName] || '📄'}</div>
                  <div><p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{rt.name}</p><p className="text-xs text-slate-500 dark:text-slate-400">{rt.shortName}</p></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
