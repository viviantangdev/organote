import CreatableReactSelect from 'react-select/creatable';
const NewNote = () => {
  return (
    <div>
      <h1>New Note</h1>
      <form>
        <div className='flex'>
          <div>
            <label htmlFor='title'>Title</label>
            <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
              <input
                id='title'
                name='title'
                type='text'
                className='block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label htmlFor='tags'>Tags</label>
            <CreatableReactSelect isMulti />
          </div>
        </div>

        <div className='col-span-full'>
          <label
            htmlFor='markDown'
            className='block text-sm/6 font-medium text-gray-900'
          >
            Body
          </label>
          <div className='mt-2'>
            <textarea
              id='markDown'
              name='markDown'
              rows={15}
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              defaultValue={''}
            />
          </div>
        </div>

        <div className='flex'>
          <button type='submit'>Save</button>
          <button type='button'>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
