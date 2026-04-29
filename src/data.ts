import { Snippet } from './types';

import aiExp5 from '../AI Exp 5.pdf_20260318_091147_0000.pdf?url';
import aiExp3 from '../AI Exp3 Output.pdf?url';
import aiExp4 from '../AI Exp4 Output.pdf?url';
import aiPractical6 from '../AI_Practical6.pdf?url';
import aiPractical7 from '../AI_Practical7.pdf?url';
import aiPractical8 from '../AI_Practical8.pdf?url';

const now = Date.now();

export const INITIAL_SNIPPETS: Snippet[] = [
  { id: 'doc-1', title: 'AI Exp 5', content: aiExp5, category: 'document', createdAt: now - 6000, updatedAt: now - 6000 },
  { id: 'doc-2', title: 'AI Exp 3 Output', content: aiExp3, category: 'document', createdAt: now - 5000, updatedAt: now - 5000 },
  { id: 'doc-3', title: 'AI Exp 4 Output', content: aiExp4, category: 'document', createdAt: now - 4000, updatedAt: now - 4000 },
  { id: 'doc-4', title: 'AI Practical 6', content: aiPractical6, category: 'document', createdAt: now - 3000, updatedAt: now - 3000 },
  { id: 'doc-5', title: 'AI Practical 7', content: aiPractical7, category: 'document', createdAt: now - 2000, updatedAt: now - 2000 },
  { id: 'doc-6', title: 'AI Practical 8', content: aiPractical8, category: 'document', createdAt: now - 1000, updatedAt: now - 1000 },
];

