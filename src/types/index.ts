export type ToolCategory = 'convert' | 'optimize' | 'organize';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  iconName: string;
  gradient: string;
  inputFormat: string;
  outputFormat: string;
  popular: boolean;
  acceptTypes: string;
  multiple: boolean;
  steps: string[];
  clientSide: boolean;
  comingSoon: boolean;
  seoTitle?: string;
  seoDescription?: string;
  subtitle?: string;
  trustBadges?: { icon: string; text: string }[];
  seoContent?: string;
  keyFeatures?: string[];
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  toolSlug: string;
  createdAt: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  resultUrl?: string;
  resultName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'business';
}
