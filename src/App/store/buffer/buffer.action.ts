import { createAction } from '@reduxjs/toolkit';

export type Message = string;

export class BufferAction {
  static receiveBufferNone = createAction<Message>('WS_MESSAGE_RECEIVE_NONE');
  static receiveBufferExpanding = createAction<Message>('WS_MESSAGE_RECEIVE_EXPANDING');
  static receiveBufferDropping = createAction<Message>('WS_MESSAGE_RECEIVE_DROPPING');
  static receiveBufferSliding = createAction<Message>('WS_MESSAGE_RECEIVE_SLIDING');
}
