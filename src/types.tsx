export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  textArea: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  textArea: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
