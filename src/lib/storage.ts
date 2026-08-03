import { FileItem, User } from '../types';

const STORAGE_KEYS = {
  RECENT_FILES: 'docverse-recent-files',
  USER: 'docverse-user',
  THEME: 'docverse-theme',
};

export function getRecentFiles(): FileItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECENT_FILES);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.warn('[DocVerse] Failed to read recent files:', err);
    return [];
  }
}

export function addRecentFile(file: FileItem): void {
  try {
    const files = getRecentFiles();
    const updated = [file, ...files.filter(f => f.id !== file.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.RECENT_FILES, JSON.stringify(updated));
  } catch (err) {
    console.warn('[DocVerse] Failed to save recent file:', err);
  }
}

export function removeRecentFile(id: string): void {
  try {
    const files = getRecentFiles().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECENT_FILES, JSON.stringify(files));
  } catch (err) {
    console.warn('[DocVerse] Failed to remove recent file:', err);
  }
}

export function clearRecentFiles(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_FILES);
  } catch (err) {
    console.warn('[DocVerse] Failed to clear recent files:', err);
  }
}

export function getUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.warn('[DocVerse] Failed to read user:', err);
    return null;
  }
}

export function setUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (err) {
    console.warn('[DocVerse] Failed to save user:', err);
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (err) {
    console.warn('[DocVerse] Failed to clear user:', err);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function generateId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // Fall through to fallback
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}
