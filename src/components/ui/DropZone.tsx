import { useCallback, useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFileSize } from '../../lib/storage';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  maxSize?: number;
  files?: File[];
  onRemoveFile?: (index: number) => void;
}

export default function DropZone({
  onFilesSelected,
  accept,
  multiple = false,
  maxSize = 100 * 1024 * 1024,
  files = [],
  onRemoveFile,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<{ name: string; size: number }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      const allFiles = Array.from(e.dataTransfer.files);
      const accepted = allFiles.filter(f => f.size <= maxSize);
      const rejected = allFiles.filter(f => f.size > maxSize).map(f => ({ name: f.name, size: f.size }));

      if (rejected.length > 0) {
        setRejectedFiles(rejected);
        setTimeout(() => setRejectedFiles([]), 5000);
      }

      if (accepted.length > 0) {
        onFilesSelected(multiple ? accepted : [accepted[0]]);
      }
    },
    [onFilesSelected, multiple, maxSize]
  );

  const handleClick = () => inputRef.current?.click();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allSelected = Array.from(e.target.files || []);
    const accepted = allSelected.filter(f => f.size <= maxSize);
    const rejected = allSelected.filter(f => f.size > maxSize).map(f => ({ name: f.name, size: f.size }));

    if (rejected.length > 0) {
      setRejectedFiles(rejected);
      setTimeout(() => setRejectedFiles([]), 5000);
    }

    if (accepted.length > 0) {
      onFilesSelected(multiple ? accepted : [accepted[0]]);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Upload file. Click or drag and drop to select files."
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900/50'
        }`}
        style={{ minHeight: files.length > 0 ? '120px' : '200px' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              isDragging
                ? 'bg-indigo-100 dark:bg-indigo-900/50'
                : 'bg-slate-100 dark:bg-slate-800'
            }`}
          >
            <Upload className={`w-7 h-7 ${isDragging ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
          </motion.div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {isDragging ? 'Drop your files here' : 'Drag & drop your files here'}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            or <span className="text-indigo-600 dark:text-indigo-400 font-medium">browse files</span> from your computer
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Max file size: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {/* Rejected files feedback */}
      <AnimatePresence>
        {rejectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  {rejectedFiles.length} file{rejectedFiles.length > 1 ? 's' : ''} exceeded the {formatFileSize(maxSize)} limit:
                </p>
                <ul className="mt-1 text-xs text-amber-700 dark:text-amber-400 space-y-0.5">
                  {rejectedFiles.map(f => (
                    <li key={f.name}>{f.name} ({formatFileSize(f.size)})</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accepted file list */}
      <AnimatePresence>
        {files && files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.filter((f): f is File => Boolean(f && f.name)).map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center flex-shrink-0">
                  <File className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatFileSize(file.size)}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" aria-label="File ready" />
                {onRemoveFile && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveFile(i); }}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex-shrink-0"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
