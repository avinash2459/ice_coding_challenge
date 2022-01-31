import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tsvInput: "",
  jsonOutput: { output: "", error: [] },
  showModal: false,
  copyState: false,
  url: [],
  param: false,
};

const slice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.tsvInput = action.payload;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setOutput: (state, action) => {
      state.jsonOutput = action.payload;
    },
    setCopyStatus: (state, action) => {
      state.copyState = action.payload;
    },
    setURL: (state, action) => {
      state.url = action.payload;
    },
    toggleParam: (state) => {
      state.param = !state.param;
    },
  },
});

const store = configureStore({
  reducer: slice.reducer,
});

export const sliceAction = slice.actions;

export default store;
