import { createSlice } from '@reduxjs/toolkit';
import { MessageAction, Message } from './message.action';

export const message = createSlice({
  name: 'message',
  initialState: [] as Message[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MessageAction.receive, (state, action) => [...state, action.payload]);
  },
});
