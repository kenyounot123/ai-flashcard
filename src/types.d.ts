export interface Flashcard {
  front: string;
  back: string;
}

export interface FlashcardSet {
  // id is not a field in the db, but it is useful for client-side operations
  id?: string;

  name: string;
  flashcards: Flashcard[];
  description?: string;
  date: string;
  
  // This might be useful in determining the color to use for the flashcards from this particular set
  color?:string
}
