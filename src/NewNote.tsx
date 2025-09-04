import NoteForm from './NoteForm';
import type { NoteData, Tag } from './types';

type NowNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NowNoteProps) => {
  return (
    <div>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </div>
  );
};

export default NewNote;
