import { Snippet } from './types';

import experimentNo1 from '../Experiment No-1 .pdf?url';
import experimentNo2 from '../Experiment No 2.pdf?url';
import experimentNo3 from '../Experiment No 3.pdf?url';
import experiment4 from '../Experiment 4.pdf?url';
import experiment5 from '../Experiment 5.pdf?url';
import experiment6 from '../Experiment 6.pdf?url';
import experiment7 from '../Experiment 7.pdf?url';
import experiment8 from '../Experiment 8 ccl.pdf?url';
import experiment9 from '../Exp9.pdf?url';
import experiment10 from '../experiment 10.pdf?url';

const now = Date.now();

export const INITIAL_SNIPPETS: Snippet[] = [
  { id: 'doc-1', title: 'Experiment No-1', content: experimentNo1, category: 'document', createdAt: now - 10000, updatedAt: now - 10000 },
  { id: 'doc-2', title: 'Experiment No 2', content: experimentNo2, category: 'document', createdAt: now - 9000, updatedAt: now - 9000 },
  { id: 'doc-3', title: 'Experiment No 3', content: experimentNo3, category: 'document', createdAt: now - 8000, updatedAt: now - 8000 },
  { id: 'doc-4', title: 'Experiment 4', content: experiment4, category: 'document', createdAt: now - 7000, updatedAt: now - 7000 },
  { id: 'doc-5', title: 'Experiment 5', content: experiment5, category: 'document', createdAt: now - 6000, updatedAt: now - 6000 },
  { id: 'doc-6', title: 'Experiment 6', content: experiment6, category: 'document', createdAt: now - 5000, updatedAt: now - 5000 },
  { id: 'doc-7', title: 'Experiment 7', content: experiment7, category: 'document', createdAt: now - 4000, updatedAt: now - 4000 },
  { id: 'doc-8', title: 'Experiment 8 CCL', content: experiment8, category: 'document', createdAt: now - 3000, updatedAt: now - 3000 },
  { id: 'doc-9', title: 'Experiment 9', content: experiment9, category: 'document', createdAt: now - 2000, updatedAt: now - 2000 },
  { id: 'doc-10', title: 'Experiment 10', content: experiment10, category: 'document', createdAt: now - 1000, updatedAt: now - 1000 },
];

