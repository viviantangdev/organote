import { Link } from 'react-router-dom';
import type { Tag } from './types';

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Link to={`/${id}`}>
    <div>
      <p>{title}</p>
      {tags.map((tag) => (<p key={tag.id}>{tag.label}</p>))}
    </div>
    </Link>
  );
};

export default NoteCard;
