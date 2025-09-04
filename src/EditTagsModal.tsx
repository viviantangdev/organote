import type { Tag } from './types';

type EditTagsProps = {
  availableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

const EditTagsModal = ({
  availableTags,
  handleClose,
  onUpdateTag,
  onDeleteTag,
}: EditTagsProps) => {
  return (
    <div onClick={handleClose} className='backdrop'>
      <div onClick={(e) => e.stopPropagation()} className='modal'>
        <div className='flex justify-between'>
          <h1>Edit Tags</h1>
          <button type='button' onClick={() => handleClose()}>
            Close
          </button>
        </div>
        <div>
          {availableTags.map((tag) => (
            <div key={tag.id} className='flex'>
              <input
                id='tag'
                name='tag'
                type='text'
                required
                defaultValue={tag.label}
                className='block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
              />
              <button type='button' onClick={() => onDeleteTag(tag.id)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditTagsModal;
