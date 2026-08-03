import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tools, iconMap } from '../../lib/tools';
import { getRecentFiles, removeRecentFile, clearRecentFiles, formatFileSize } from '../../lib/storage';
import { fetchUserFileHistory } from '../../lib/api-client';
import { useState, useEffect } from 'react';
import { FileItem } from '../../types';
import { File, Clock, Trash2, ArrowRight, Zap, FolderOpen } from 'lucide-react';

const quickTools = tools.filter(t => t.popular && !t.comingSoon).slice(0, 6);

export default function DashboardPage() {
  const [recentFiles, setRecentFiles] = useState<FileItem[]>(() => getRecentFiles());

  useEffect(() => {
    fetchUserFileHistory().then(remoteFiles => {
      if (remoteFiles.length > 0) {
        setRecentFiles(prev => {
          const merged = [...prev];
          remoteFiles.forEach(rf => {
            if (!merged.some(m => m.id === rf.id)) {
              merged.push({
                id: rf.id,
                name: rf.originalName,
                size: rf.fileSize,
                type: rf.mimeType,
                toolSlug: rf.toolSlug,
                createdAt: rf.createdAt,
                status: rf.status as FileItem['status'],
              });
            }
          });
          return merged;
        });
      }
    });
  }, []);

  const handleRemove = (id: string) => { removeRecentFile(id); setRecentFiles(getRecentFiles()); };
  const handleClearAll = () => { clearRecentFiles(); setRecentFiles([]); };

  const getStatusBadge = (status: FileItem['status']) => {
    switch (status) {
      case 'completed': return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase">Done</span>;
      case 'processing': return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 uppercase">Processing</span>;
      case 'error': return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 uppercase">Error</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 font-heading">Welcome back 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your documents and access your favorite tools.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Quick Actions</h2>
          <Link to="/#tools" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickTools.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/tools/${tool.slug}`} className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>{iconMap[tool.iconName] || '📄'}</div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">{tool.shortName}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: File, label: 'Files Processed', value: recentFiles.length.toString(), color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
          { icon: Zap, label: 'Tools Available', value: tools.filter(t => !t.comingSoon).length.toString(), color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50' },
          { icon: FolderOpen, label: 'Storage Used', value: formatFileSize(recentFiles.reduce((acc, f) => acc + f.size, 0)), color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
              <div><p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">{stat.value}</p><p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Recent Files</h2>
          {recentFiles.length > 0 && <button onClick={handleClearAll} className="text-sm text-slate-400 hover:text-red-500 transition-colors">Clear all</button>}
        </div>
        {recentFiles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No recent files</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Start by processing a document with one of the tools above</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentFiles.slice(0, 10).map(file => {
                const tool = tools.find(t => t.slug === file.toolSlug);
                return (
                  <div key={file.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool?.gradient || 'from-slate-400 to-slate-500'} flex items-center justify-center text-sm flex-shrink-0`}>{iconMap[tool?.iconName || ''] || '📄'}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{tool?.name || 'Unknown'} · {formatFileSize(file.size)} · {new Date(file.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(file.status)}
                      <button onClick={() => handleRemove(file.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" title="Remove" aria-label={`Remove ${file.name}`}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
