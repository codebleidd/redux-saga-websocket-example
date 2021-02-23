import { call, fork } from '@redux-saga/core/effects';
import { createSocketConnection } from '../../api/websocket';
import {
  createSocketChannel,
  receiveMessageSaga,
  sendMessageSaga,
} from '../../api/websocket.helper';
import { buffers } from 'redux-saga';
import { BufferAction } from './buffer.action';

export function* bufferNoneSaga() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, buffers.none());
  yield fork(receiveMessageSaga, socketChannel, BufferAction.receiveBufferNone, true);
  yield fork(sendMessageSaga, socket);
}

// Commented out as it results in error
// export function* bufferFixedSaga() {
//   const socket = yield call(createSocketConnection);
//   const socketChannel = yield call(createSocketChannel, socket, buffers.none());
//   yield fork(receiveMessageSaga, socketChannel);
//   yield fork(sendMessageSaga, socket);
// }

export function* bufferExpandingSaga() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, buffers.expanding(5));
  yield fork(receiveMessageSaga, socketChannel, BufferAction.receiveBufferExpanding, true);
  yield fork(sendMessageSaga, socket);
}

export function* bufferDroppingSaga() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, buffers.dropping(5));
  yield fork(receiveMessageSaga, socketChannel, BufferAction.receiveBufferDropping, true);
  yield fork(sendMessageSaga, socket);
}

export function* bufferSlidingSaga() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, buffers.sliding(5));
  yield fork(receiveMessageSaga, socketChannel, BufferAction.receiveBufferSliding, true);
  yield fork(sendMessageSaga, socket);
}
