import NoteForm from '../components/NoteForm';
import { useNote } from '../hooks/useNote';
import type { NoteData, Tag } from '../types/types';

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        textArea={note.textArea}
        tags={note.tags}
        onSubmit={(data: NoteData) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
