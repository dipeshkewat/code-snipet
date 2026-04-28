import { useState, useMemo } from 'react';
import { Braces, Filter, X } from 'lucide-react';
import { cn } from './utils/cn';
import { Snippet, Category, CATEGORIES } from './types';
import { INITIAL_SNIPPETS } from './data';
import SnippetCard from './components/SnippetCard';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';

export default function App() {
  const [snippets, setSnippets] = useState<Snippet[]>(INITIAL_SNIPPETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSnippets = useMemo(() => {
    let result = snippets;

    if (activeCategory !== 'all') {
      result = result.filter((s: Snippet) => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s: Snippet) =>
          s.title.toLowerCase().includes(query) ||
          s.content.toLowerCase().includes(query)
      );
    }

    return result;
  }, [snippets, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: snippets.length };
    for (const cat of CATEGORIES) {
      counts[cat.value] = snippets.filter((s: Snippet) => s.category === cat.value).length;
    }
    return counts;
  }, [snippets]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.08),transparent)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Code Heist Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-zinc-100 tracking-tight">Code Heist Showcase</h1>
                <p className="text-[10px] text-zinc-500 -mt-0.5">Explore my PDF documents.</p>
              </div>
            </div>
            <div className="text-[10px] text-zinc-600 bg-zinc-900/60 px-2.5 py-1 rounded-full border border-zinc-800/40">
              {snippets.length} document{snippets.length !== 1 ? 's' : ''}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Saved Snippets Section */}
          <section>
            {/* Section header with search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-sm font-medium text-zinc-400">Available Documents</h2>
              </div>
              <div className="flex items-center gap-2">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  resultCount={searchQuery ? filteredSnippets.length : undefined}
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    'p-2.5 rounded-xl border transition-all duration-150',
                    showFilters
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                      : 'bg-zinc-900/60 border-zinc-800/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/80'
                  )}
                  title="Toggle filters"
                >
                  <Filter size={14} />
                </button>
              </div>
            </div>

            {/* Category filters */}
            {showFilters && (
              <div className="flex flex-wrap items-center gap-1.5 mb-5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/40">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-lg border transition-all duration-150',
                    activeCategory === 'all'
                      ? 'bg-zinc-700/30 text-zinc-200 border-zinc-600/40'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
                  )}
                >
                  All
                  <span className="ml-1.5 text-[10px] text-zinc-600">{categoryCounts.all}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-lg border transition-all duration-150',
                      activeCategory === cat.value
                        ? cat.color
                        : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
                    )}
                  >
                    {cat.label}
                    <span className="ml-1.5 text-[10px] opacity-60">
                      {categoryCounts[cat.value] || 0}
                    </span>
                  </button>
                ))}
                {activeCategory !== 'all' && (
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors ml-1 flex items-center gap-0.5"
                  >
                    <X size={10} />
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Snippets grid */}
            {filteredSnippets.length === 0 ? (
              snippets.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-sm text-zinc-500">No documents match your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-xs text-violet-400 hover:text-violet-300 mt-2 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSnippets.map((snippet: Snippet) => (
                  <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800/30 mt-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-center">
            <p className="text-[10px] text-zinc-700">
              Code Heist Showcase - Public documents.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
