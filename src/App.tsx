import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from './hooks/useLocalStorage';
import NewNote from './NewNote';
import type { NoteData, RawNote, Tag } from './types';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  return (
    <Routes>
      <Route path='/' element={<h1>home</h1>} />
      <Route path='/new' element={<NewNote onSubmit={onCreateNote}/>} />
      <Route path='/:id'>
        <Route index element={<h1>Show</h1>} />
        <Route path='edit' element={<h1>Edit</h1>} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
