export type Category = 'code' | 'notes' | 'experiments' | 'other';

export interface Snippet {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'code', label: 'Code', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  { value: 'notes', label: 'Notes', color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  { value: 'experiments', label: 'Experiments', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  { value: 'other', label: 'Other', color: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30' },
];
