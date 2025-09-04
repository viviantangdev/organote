import { useOutletContext } from 'react-router-dom';
import type { Note } from '../types/types';

// Helper to use context note
export function useNote() {
  return useOutletContext<Note>();
}
