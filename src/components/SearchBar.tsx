import { Search, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

export default function SearchBar({ value, onChange, resultCount }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search snippets..."
        className={cn(
          'w-full bg-zinc-900/60 border border-zinc-800/60 rounded-xl',
          'text-sm text-zinc-300 placeholder:text-zinc-600',
          'pl-9 pr-10 py-2.5 outline-none',
          'focus:border-zinc-700/80 focus:bg-zinc-900/80 transition-all'
        )}
      />
      {value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {resultCount !== undefined && (
            <span className="text-[10px] text-zinc-600">{resultCount}</span>
          )}
          <button
            onClick={() => onChange('')}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
