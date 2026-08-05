import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sun, Moon, Sparkles, ChevronDown, Wrench } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { tools, iconMap } from '../../lib/tools';

const convertTools = tools.filter(t => t.category === 'convert');
const optimizeTools = tools.filter(t => t.category === 'optimize');
const organizeTools = tools.filter(t => t.category === 'organize');

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 180);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="DocVerse home">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <FileText className="w-4 h-4 text-white" aria-hidden="true" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white dark:border-slate-950">
                <Sparkles className="w-1.5 h-1.5 text-amber-800 absolute top-0 left-0" aria-hidden="true" />
              </div>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight font-heading">
              DocVerse
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            {/* Tools Hover Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/tools') || toolsDropdownOpen
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
              </button>

              {/* Solid High-Contrast Mega Menu Dropdown */}
              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[820px] max-w-[92vw] z-50"
                  >
                    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/15 dark:shadow-black/80 p-6 grid grid-cols-3 gap-6">
                      {/* Convert Column */}
                      <div>
                        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          <span>Convert ({convertTools.length})</span>
                        </div>
                        <div className="space-y-1">
                          {convertTools.map((tool) => (
                            <Link
                              key={tool.id}
                              to={`/tools/${tool.slug}`}
                              onClick={() => setToolsDropdownOpen(false)}
                              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
                            >
                              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xs text-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                {iconMap[tool.iconName] || '📄'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                                  {tool.shortName}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  {tool.inputFormat} → {tool.outputFormat}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Organize Column */}
                      <div>
                        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                          <span>Organize ({organizeTools.length})</span>
                        </div>
                        <div className="space-y-1">
                          {organizeTools.map((tool) => (
                            <Link
                              key={tool.id}
                              to={`/tools/${tool.slug}`}
                              onClick={() => setToolsDropdownOpen(false)}
                              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors"
                            >
                              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xs text-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                {iconMap[tool.iconName] || '📄'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">
                                  {tool.shortName}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                  {tool.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Optimize Column & All Tools Button */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            <span>Optimize ({optimizeTools.length})</span>
                          </div>
                          <div className="space-y-1 mb-6">
                            {optimizeTools.map((tool) => (
                              <Link
                                key={tool.id}
                                to={`/tools/${tool.slug}`}
                                onClick={() => setToolsDropdownOpen(false)}
                                className="group flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                              >
                                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xs text-white shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                  {iconMap[tool.iconName] || '📄'}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                                    {tool.shortName}
                                  </p>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                    {tool.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/#tools"
                          onClick={() => {
                            setToolsDropdownOpen(false);
                            document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-600 text-slate-800 dark:text-slate-200 hover:text-white text-xs font-bold transition-all text-center group"
                        >
                          <Wrench className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                          <span>View All 15 Tools</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === '/dashboard'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            {user ? (
              <Link to="/dashboard" className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/sign-in" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2 transition-colors">Sign In</Link>
                <Link to="/sign-up" className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5">Get Started Free</Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link to="/" onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-bold' : 'text-slate-600 dark:text-slate-400'
                }`}>
                Home
              </Link>

              {/* Mobile Tools Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  <span>Tools ({tools.length})</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {mobileToolsOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl my-1 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">All 15 Tools</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {tools.map((tool) => (
                        <Link
                          key={tool.id}
                          to={`/tools/${tool.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          <span className="text-sm">{iconMap[tool.iconName] || '📄'}</span>
                          <span className="font-semibold truncate">{tool.shortName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/dashboard" onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-bold' : 'text-slate-600 dark:text-slate-400'
                }`}>
                Dashboard
              </Link>

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                {user ? (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center py-3">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-center">Sign In</Link>
                    <Link to="/sign-up" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center py-3">Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
