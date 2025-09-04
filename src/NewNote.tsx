import NoteForm from './NoteForm';
import type { NoteData } from './types';

type NowNoteProps = {
  onSubmit: (data: NoteData) => void;
};

const NewNote = ({ onSubmit }: NowNoteProps) => {
  return (
    <div>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewNote;
