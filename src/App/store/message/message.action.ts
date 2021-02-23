import { createAction } from '@reduxjs/toolkit';

export type Message = string;

export class MessageAction {
  static send = createAction<Message>('WS_MESSAGE_SEND');

  static receive = createAction<Message>('WS_MESSAGE_RECEIVE');
}
