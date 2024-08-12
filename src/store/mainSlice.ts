import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  isFocused: boolean;
  isTyping: boolean;
  typedText: string[];
  minutes: number;
  seconds: number;
}

const initialState: State = {
  isFocused: true,
  isTyping: false,
  typedText: [],
  minutes: 0,
  seconds: 0,
};

const mainSlice = createSlice({
  initialState,
  name: 'main',
  reducers: {
    setIsFocused: (state, { payload }: PayloadAction<boolean>) => {
      state.isFocused = payload;
    },
    setIsTyping: (state, { payload }: PayloadAction<boolean>) => {
      state.isTyping = payload;
    },
    setTypedText: (state, { payload }: PayloadAction<string[]>) => {
      state.typedText = payload;
    },
    setMinutes: (state, { payload }: PayloadAction<number>) => {
      state.minutes = payload;
    },
    setSeconds: (state, { payload }: PayloadAction<number>) => {
      state.seconds = payload;
    },
    resetProgress: (state) => {
      state.isFocused = false;
      state.isTyping = false;
      state.typedText = [];
      state.minutes = 0;
      state.seconds = 0;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const { setIsFocused, setIsTyping, setTypedText, setMinutes, setSeconds, resetProgress } =
  mainSlice.actions;
