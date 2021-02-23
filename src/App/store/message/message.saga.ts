import { END, EventChannel, eventChannel, buffers } from 'redux-saga';
import { apply, call, fork, put, take } from '@redux-saga/core/effects';
import { MessageAction } from './message.action';
import { createSocketConnection } from '../../api/websocket';
import { Buffer } from '@redux-saga/types';
import {
  createSocketChannel,
  receiveMessageSaga,
  sendMessageSaga,
} from '../../api/websocket.helper';

export function* messageSaga() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);
  yield fork(receiveMessageSaga, socketChannel);
  yield fork(sendMessageSaga, socket);
}
