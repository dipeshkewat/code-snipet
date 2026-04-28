import { ClipboardPaste } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center mb-4">
        <ClipboardPaste size={22} className="text-zinc-500" />
      </div>
      <h3 className="text-sm font-medium text-zinc-400 mb-1">No documents yet</h3>
      <p className="text-xs text-zinc-600 text-center max-w-xs">
        Upload or import PDF documents to see them here.
      </p>
    </div>
  );
}
