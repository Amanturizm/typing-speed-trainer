import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  isTyping: boolean;
  typedText: string[];
  isFocused: boolean;
}

const initialState: State = {
  isTyping: false,
  typedText: [],
  isFocused: true,
};

const mainSlice = createSlice({
  initialState,
  name: 'main',
  reducers: {
    setIsTyping: (state, { payload }: PayloadAction<boolean>) => {
      state.isTyping = payload;
    },
    setTypedText: (state, { payload }: PayloadAction<string[]>) => {
      state.typedText = payload;
    },
    setIsFocused: (state, { payload }: PayloadAction<boolean>) => {
      state.isFocused = payload;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const { setIsTyping, setTypedText, setIsFocused } = mainSlice.actions;
