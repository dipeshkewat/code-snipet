import { useState, useRef, useCallback } from 'react';
import { FileText, StickyNote, MoreHorizontal, Upload, Plus, File } from 'lucide-react';
import { cn } from '../utils/cn';
import { Category, CATEGORIES } from '../types';

const categoryIcons: Record<Category, React.ReactNode> = {
  document: <FileText size={14} />,
  notes: <StickyNote size={14} />,
  other: <MoreHorizontal size={14} />,
};

interface Props {
  onSave: (snippet: { title: string; content: string; category: Category }) => void;
}

export default function SnippetEditor({ onSave }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('document');
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(() => {
    if (!content.trim()) return;
    onSave({ title: title.trim() || fileName || 'Untitled Document', content: content.trim(), category });
    setTitle('');
    setContent('');
    setFileName('');
  }, [title, content, category, fileName, onSave]);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setContent(dataUrl);
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
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
            placeholder="Document title..."
            className="flex-1 bg-transparent text-zinc-100 text-lg font-medium placeholder:text-zinc-600 outline-none"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-violet-500/10"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Upload PDF</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
            accept=".pdf,application/pdf"
          />
        </div>

        {/* Upload Area / Selected File */}
        <div className="px-4 pb-4">
          {!content ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full min-h-[160px] border-2 border-dashed border-zinc-800/80 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-violet-500/40 hover:bg-violet-500/5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center">
                <Upload size={20} className="text-zinc-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-300">Click to upload a PDF document</p>
                <p className="text-xs text-zinc-600 mt-1">or drag and drop it here</p>
              </div>
            </div>
          ) : (
            <div className="w-full min-h-[160px] border border-zinc-800 rounded-xl bg-zinc-900/40 flex items-center justify-center relative group">
              <div className="flex flex-col items-center gap-3">
                <FileText size={48} className="text-violet-400" />
                <p className="text-sm font-medium text-zinc-300 px-4 text-center break-all">{fileName || title}</p>
                <p className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">PDF Ready</p>
              </div>
              <button 
                onClick={() => { setContent(''); setFileName(''); }}
                className="absolute top-3 right-3 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          )}
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
              {content ? 'Document ready to save' : 'No document selected'}
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
