import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, RotateCcw, Trash2, ArrowLeft, ArrowRight, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { renderPdfThumbnails, PageThumbnail } from '../../lib/pdf-renderer';
import { organizePDF, OrganizedPageItem } from '../../lib/pdf-utils';

interface OrganizeItem extends PageThumbnail {
  id: string;
  rotation: number;
}

interface OrganizePagesUIProps {
  file: File;
  onSave: (resultBytes: Uint8Array, resultName: string) => void;
  onError: (msg: string) => void;
}

export default function OrganizePagesUI({ file, onSave, onError }: OrganizePagesUIProps) {
  const [items, setItems] = useState<OrganizeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let isMounted = true;
    renderPdfThumbnails(file)
      .then((thumbs) => {
        if (isMounted) {
          const initialItems: OrganizeItem[] = thumbs.map((t, idx) => ({
            ...t,
            id: `page-${idx}-${Date.now()}`,
            rotation: 0,
          }));
          setItems(initialItems);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          onErrorRef.current(err.message || 'Failed to render PDF page thumbnails.');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleRotate = (index: number, deg: number) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        rotation: (copy[index].rotation + deg + 360) % 360,
      };
      return copy;
    });
  };

  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    setItems((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    handleMove(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleRotateAll = (deg: number) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        rotation: (item.rotation + deg + 360) % 360,
      }))
    );
  };

  const handleReset = () => {
    setLoading(true);
    renderPdfThumbnails(file).then((thumbs) => {
      setItems(
        thumbs.map((t, idx) => ({
          ...t,
          id: `page-${idx}-${Date.now()}`,
          rotation: 0,
        }))
      );
      setLoading(false);
    });
  };

  const handleSaveDocument = async () => {
    if (items.length === 0) {
      onError('Cannot save an empty PDF. Please keep at least one page.');
      return;
    }
    setSaving(true);
    try {
      const payload: OrganizedPageItem[] = items.map((item) => ({
        originalIndex: item.pageNum - 1,
        rotation: item.rotation,
      }));
      const resultBytes = await organizePDF(file, payload);
      const outName = `${file.name.replace(/\.[^/.]+$/, '')}_organized.pdf`;
      onSave(resultBytes, outName);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to save organized PDF.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-600 dark:text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-sm font-medium">Generating high-resolution page previews...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleRotateAll(90)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
            Rotate All CW
          </button>
          <button
            type="button"
            onClick={() => handleRotateAll(-90)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
            Rotate All CCW
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            Reset Order
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {items.length} {items.length === 1 ? 'page' : 'pages'} remaining
          </span>
          <button
            type="button"
            onClick={handleSaveDocument}
            disabled={saving || items.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {saving ? 'Saving PDF...' : 'Save Organized PDF'}
          </button>
        </div>
      </div>

      {/* Drag & Drop Thumbnail Grid */}
      {items.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 mb-4">All pages deleted!</p>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md"
          >
            Restore All Pages
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`group relative flex flex-col items-center p-3 rounded-2xl bg-white dark:bg-slate-900 border ${
                  draggedIndex === idx
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-2xl scale-105'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
                } shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing`}
              >
                {/* Badge Number */}
                <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-slate-900/80 text-white text-[11px] font-bold flex items-center justify-center backdrop-blur-md">
                  {idx + 1}
                </div>

                {/* Page Original Tag */}
                <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800/80 text-[9px] font-medium text-slate-600 dark:text-slate-300">
                  Page {item.pageNum}
                </div>

                {/* Thumbnail Canvas Wrapper with Rotation */}
                <div className="w-full aspect-[3/4] flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden mb-3">
                  <div
                    style={{ transform: `rotate(${item.rotation}deg)` }}
                    className="transition-transform duration-300 shadow-sm max-w-full max-h-full"
                  >
                    <img
                      src={item.dataUrl}
                      alt={`Page ${item.pageNum}`}
                      className="max-h-44 object-contain rounded border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="w-full flex items-center justify-between gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRotate(idx, -90)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Rotate Counter-Clockwise 90°"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRotate(idx, 90)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Rotate Clockwise 90°"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, idx - 1)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
                      title="Move Left"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, idx + 1)}
                      disabled={idx === items.length - 1}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
                      title="Move Right"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
