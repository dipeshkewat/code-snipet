import { Snippet } from './types';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'React useEffect Example',
    content: `useEffect(() => {\n  console.log('Component mounted');\n  return () => console.log('Component unmounted');\n}, []);`,
    category: 'code',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: '2',
    title: 'Center a Div',
    content: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}`,
    category: 'code',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: '3',
    title: 'Useful Git Commands',
    content: `# Undo last commit but keep changes\ngit reset HEAD~1\n\n# Amend last commit message\ngit commit --amend -m "New message"`,
    category: 'notes',
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
  }
];
