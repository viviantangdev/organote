import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import EditNote from './EditNote';
import { useLocalStorage } from './hooks/useLocalStorage';
import NewNote from './NewNote';
import Note from './Note';
import NoteLayout from './NoteLayout';
import NoteList from './NoteList';
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

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <NoteList
            availableTags={tags}
            notes={notesWithTags}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
          />
        }
      />
      <Route
        path='/new'
        element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={onAddTag}
            availableTags={tags}
          />
        }
      />

      <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route
          path='edit'
          element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
