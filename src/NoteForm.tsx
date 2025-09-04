import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import type { NoteData, Tag } from './types';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      textArea: textAreaRef.current!.value,
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        {/*Title*/}
        <div>
          <label htmlFor='title'>Title</label>
          <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
            <input
              ref={titleRef}
              id='title'
              name='title'
              type='text'
              required
              className='block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
            />
          </div>
        </div>

        {/*Tags*/}
        <div>
          <label htmlFor='tags'>Tags</label>
          <CreatableReactSelect
            isMulti
            value={selectedTags.map((tag) => {
              return { value: tag.id, label: tag.label };
            })}
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

      {/*Textarea*/}
      <div className='col-span-full'>
        <label
          htmlFor='textArea'
          className='block text-sm/6 font-medium text-gray-900'
        >
          Body
        </label>
        <div className='mt-2'>
          <textarea
            ref={textAreaRef}
            id='textArea'
            name='textArea'
            rows={15}
            className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            defaultValue={''}
            required
          />
        </div>
      </div>

      {/*Save and Cancle buttons*/}
      <div className='flex'>
        <button type='submit'>Save</button>
        <Link to='..'>
          <button type='button'>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
