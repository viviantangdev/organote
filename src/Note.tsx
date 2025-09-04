import Markdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { useNote } from './hooks/useNote';

type NoteProps = {
  onDelete: (id: string) => void;
};
const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex'>
        <div>
          <h1>{note.title}</h1>
          <div className='flex'>
            {note.tags.map((tag) => (
              <p key={tag.id}>{tag.label}</p>
            ))}
          </div>
        </div>
        <Link to={`/${note.id}/edit`}>
          <button type='button'>Edit</button>
        </Link>
        <button
          type='button'
          onClick={() => {
            onDelete(note.id);
            navigate('/');
          }}
        >
          Delete
        </button>
        <Link to={'..'}>
          <button type='button'>Back</button>
        </Link>
      </div>

      <Markdown>{note.textArea}</Markdown>
    </div>
  );
};

export default Note;
