import { useState, useRef, useCallback } from 'react';
import { Code, StickyNote, FlaskConical, MoreHorizontal, Upload, Plus } from 'lucide-react';
import { cn } from '../utils/cn';
import { Category, CATEGORIES } from '../types';

const categoryIcons: Record<Category, React.ReactNode> = {
  code: <Code size={14} />,
  notes: <StickyNote size={14} />,
  experiments: <FlaskConical size={14} />,
  other: <MoreHorizontal size={14} />,
};

interface Props {
  onSave: (snippet: { title: string; content: string; category: Category }) => void;
}

export default function SnippetEditor({ onSave }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('code');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = useCallback(() => {
    if (!content.trim()) return;
    onSave({ title: title.trim() || 'Untitled Snippet', content: content.trim(), category });
    setTitle('');
    setContent('');
  }, [title, content, category, onSave]);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text);
      if (!title) {
        setTitle(file.name);
      }
    };
    reader.readAsText(file);
  }, [title]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  }, [handleFileUpload]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + '  ' + content.substring(end);
        setContent(newContent);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    }
  }, [handleSave, content]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={cn(
          'relative rounded-2xl border transition-all duration-200',
          'bg-zinc-900/60 backdrop-blur-sm',
          isDragOver
            ? 'border-violet-500/60 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
            : 'border-zinc-800/80 shadow-xl shadow-black/20'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Snippet title..."
            className="flex-1 bg-transparent text-zinc-100 text-lg font-medium placeholder:text-zinc-600 outline-none"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-violet-500/10"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
            accept=".txt,.js,.ts,.tsx,.jsx,.py,.rb,.go,.rs,.java,.c,.cpp,.h,.css,.html,.json,.yaml,.yml,.xml,.md,.sh,.bash,.sql,.toml,.ini,.cfg,.conf,.env,.gitignore,.dockerfile,.makefile,.csv"
          />
        </div>

        {/* Textarea */}
        <div className="px-4 pb-3">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your code, notes, or any text here..."
            className={cn(
              'w-full bg-transparent text-zinc-300 font-mono text-sm leading-relaxed',
              'placeholder:text-zinc-600 outline-none resize-none',
              'min-h-[160px] max-h-[400px]'
            )}
            rows={7}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800/60">
          <div className="flex items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all duration-150',
                  category === cat.value
                    ? cat.color
                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60'
                )}
              >
                {categoryIcons[cat.value]}
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-600 hidden sm:inline">
              {content.length > 0 ? `${content.length} chars` : '⌘+Enter to save'}
            </span>
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200',
                content.trim()
                  ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/20'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              )}
            >
              <Plus size={15} />
              Save
            </button>
          </div>
        </div>

        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-2xl bg-violet-500/5 flex items-center justify-center pointer-events-none z-10">
            <div className="text-violet-400 text-sm font-medium flex items-center gap-2">
              <Upload size={18} />
              Drop file to import
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
