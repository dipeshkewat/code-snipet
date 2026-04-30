import { useState, useCallback } from 'react';
import { Download, Check, FileText, StickyNote, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import { Snippet, Category, CATEGORIES } from '../types';

const categoryIcons: Record<Category, React.ReactNode> = {
  document: <FileText size={12} />,
  notes: <StickyNote size={12} />,
  other: <MoreHorizontal size={12} />,
};

interface Props {
  snippet: Snippet;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function SnippetCard({ snippet }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  const catInfo = CATEGORIES.find((c) => c.value === snippet.category) || CATEGORIES[2]; // index 2 is 'other'

  const handleDownload = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = snippet.content;
      link.download = snippet.title + (snippet.title.toLowerCase().endsWith('.pdf') ? '' : '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Download failed', err);
    }
  }, [snippet.content, snippet.title]);

  return (
    <div
      className={cn(
        'group rounded-xl border transition-all duration-200',
        'bg-zinc-900/50 backdrop-blur-sm border-zinc-800/60',
        'hover:border-zinc-700/80 hover:bg-zinc-900/70'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-3.5 pb-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h3
            className="text-sm font-medium text-zinc-200 truncate"
            title={snippet.title}
          >
            {snippet.title}
          </h3>
          <span
            className={cn(
              'shrink-0 inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border',
              catInfo.color
            )}
          >
            {categoryIcons[snippet.category]}
            {catInfo.label}
          </span>
        </div>

        <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={handleDownload}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-150',
              downloaded
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
            )}
            title="Download PDF"
          >
            {downloaded ? <Check size={14} /> : <Download size={14} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <div
          className={cn(
            'relative rounded-lg bg-zinc-950/60 border border-zinc-800/40 overflow-hidden py-8 flex flex-col items-center justify-center gap-2'
          )}
        >
          <FileText size={28} className="text-zinc-600" />
          <p className="text-xs text-zinc-500 font-medium">PDF Document</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800/30">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
          <Clock size={10} />
          <span>{timeAgo(snippet.createdAt)}</span>
        </div>
        <span className="text-[10px] text-zinc-600">
          {snippet.content.length > 50 ? `${Math.round(snippet.content.length / 1024)} KB` : 'Document'}
        </span>
      </div>
    </div>
  );
}
