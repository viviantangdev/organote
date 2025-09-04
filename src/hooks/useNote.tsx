import { useOutletContext } from "react-router-dom";
import type { Note } from "../types";

// Helper to use context notes
export function useNote(){
    return useOutletContext<Note>();
}