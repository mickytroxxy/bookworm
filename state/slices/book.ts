import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BooksType = {
  title:string;
  author:string;
  genre:string;
  genreDes:string;
  coverPhoto?:string;
  pages:string | number;
  selected?:boolean;
  bookId:number;
}
const initialState: { books: BooksType[];} = {
  books: [],
};

const BookSlice = createSlice({
  name: "BookSlice",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BooksType[]>) => {
      state.books = action.payload;
    }
  },
});

export const { setBooks } = BookSlice.actions;
export default BookSlice.reducer;
