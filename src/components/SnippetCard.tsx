import { useState, useCallback } from 'react';
import { Copy, Check, Trash2, Code, StickyNote, FlaskConical, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import { Snippet, Category, CATEGORIES } from '../types';

const categoryIcons: Record<Category, React.ReactNode> = {
  code: <Code size={12} />,
  notes: <StickyNote size={12} />,
  experiments: <FlaskConical size={12} />,
  other: <MoreHorizontal size={12} />,
};

interface Props {
  snippet: Snippet;
  onDelete: (id: string) => void;
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

export default function SnippetCard({ snippet, onDelete }: Props) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const catInfo = CATEGORIES.find((c) => c.value === snippet.category) || CATEGORIES[3];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = snippet.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [snippet.content]);

  const handleDelete = useCallback(() => {
    if (confirmDelete) {
      onDelete(snippet.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  }, [confirmDelete, onDelete, snippet.id]);

  const lines = snippet.content.split('\n');
  const previewLines = lines.slice(0, 4).join('\n');
  const isLong = lines.length > 4 || snippet.content.length > 300;

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

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={handleCopy}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-150',
              copied
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
            )}
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            onClick={handleDelete}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-150',
              confirmDelete
                ? 'text-red-400 bg-red-500/10'
                : 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10'
            )}
            title={confirmDelete ? 'Click again to confirm' : 'Delete snippet'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <div
          className={cn(
            'relative rounded-lg bg-zinc-950/60 border border-zinc-800/40 overflow-hidden',
            'cursor-pointer'
          )}
          onClick={() => isLong && setIsExpanded(!isExpanded)}
        >
          <pre
            className={cn(
              'text-xs text-zinc-400 font-mono leading-relaxed p-3 overflow-x-auto',
              !isExpanded && isLong && 'max-h-[120px]'
            )}
          >
            <code>{isExpanded ? snippet.content : previewLines}</code>
          </pre>
          {isLong && !isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-950/90 to-transparent flex items-end justify-center pb-1.5">
              <span className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors">
                Click to expand
              </span>
            </div>
          )}
          {isLong && isExpanded && (
            <div className="flex justify-center py-1.5 border-t border-zinc-800/30">
              <span className="text-[10px] text-zinc-500">
                Click to collapse
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800/30">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
          <Clock size={10} />
          <span>{timeAgo(snippet.createdAt)}</span>
        </div>
        <span className="text-[10px] text-zinc-600">
          {snippet.content.length} chars · {lines.length} lines
        </span>
      </div>
    </div>
  );
}
