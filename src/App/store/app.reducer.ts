import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { message } from './message/message.slice';
import { Message } from './message/message.action';
import { bufferDropping, bufferExpanding, bufferNone, bufferSliding } from './buffer/buffer.slice';

export type AppState = {
  message: Message[];
  buffer: {
    none: Message[];
    expanding: Message[];
    dropping: Message[];
    sliding: Message[];
  };
};

export const combinedReducers = combineReducers<AppState>({
  message: message.reducer,
  buffer: combineReducers<AppState['buffer']>({
    none: bufferNone.reducer,
    expanding: bufferExpanding.reducer,
    dropping: bufferDropping.reducer,
    sliding: bufferSliding.reducer,
  }),
});
