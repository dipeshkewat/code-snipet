export type Category = 'document' | 'notes' | 'other';

export interface Snippet {
  id: string;
  title: string;
  content: string; // Will store the base64 data URL
  category: Category;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'document', label: 'Document', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { value: 'notes', label: 'Notes', color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  { value: 'other', label: 'Other', color: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30' },
];
