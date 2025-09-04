import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import EditTagsModal from './EditTagsModal';
import NoteCard from './NoteCard';
import type { Note, Tag } from './types';

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>('');
  const [isEditTagsModal, setIsEditTagsModal] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesTitle =
        title === '' ||
        note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase());

      const matchedTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        );

      return matchesTitle && matchedTags;
    });
  }, [title, selectedTags, notes]);

  return (
    <div>
      <div className='flex'>
        <h1>OrgaNote</h1>
        <Link to='/new'>
          <button type='button'>Create</button>
        </Link>
        <button type='button' onClick={() => setIsEditTagsModal(true)}>
          Edit Tags
        </button>
      </div>

      <div className='flex'>
        {/*Title*/}
        <div>
          <label htmlFor='title'>Title</label>
          <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
            <input
              id='title'
              name='title'
              type='text'
              required
              className='block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/*Tags*/}
        <div>
          <label htmlFor='tags'>Tags</label>
          <ReactSelect
            isMulti
            value={selectedTags.map((tag) => ({
              value: tag.id,
              label: tag.label,
            }))}
            options={availableTags.map((tag) => ({
              value: tag.id,
              label: tag.label,
            }))}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { id: tag.value, label: tag.label };
                })
              );
            }}
          />
        </div>
      </div>

      <div>
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
      {isEditTagsModal ? (
        <EditTagsModal
          availableTags={availableTags}
          handleClose={() => setIsEditTagsModal(false)}
          onDeleteTag={onDeleteTag}
          onUpdateTag={onUpdateTag}
        />
      ) : null}
    </div>
  );
};

export default NoteList;
