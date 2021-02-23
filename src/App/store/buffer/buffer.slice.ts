import { createSlice } from '@reduxjs/toolkit';
import { BufferAction, Message } from './buffer.action';

export const bufferNone = createSlice({
  name: 'none',
  initialState: [] as Message[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BufferAction.receiveBufferNone, (state, action) => [...state, action.payload]);
  },
});

export const bufferExpanding = createSlice({
  name: 'expanding',
  initialState: [] as Message[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BufferAction.receiveBufferExpanding, (state, action) => [
      ...state,
      action.payload,
    ]);
  },
});

export const bufferDropping = createSlice({
  name: 'dropping',
  initialState: [] as Message[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BufferAction.receiveBufferDropping, (state, action) => [
      ...state,
      action.payload,
    ]);
  },
});

export const bufferSliding = createSlice({
  name: 'sliding',
  initialState: [] as Message[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BufferAction.receiveBufferSliding, (state, action) => [
      ...state,
      action.payload,
    ]);
  },
});
