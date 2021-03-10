import { call, cancel, fork, take } from '@redux-saga/core/effects';
import { createSocketConnection } from '../../api/websocket';
import {
  createSocketChannel,
  receiveMessageSaga,
  sendMessageSaga,
} from '../../api/websocket.helper';
import { buffers } from 'redux-saga';
import { BufferAction } from './buffer.action';
import { MessageAction } from '../message/message.action';

/**
 * This buffer ignores all messeges that comes from socket when current is processing
 */
export function* bufferNoneSaga() {
  while (true) {
    const socket = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket, buffers.none());
    const receive = yield fork(
      receiveMessageSaga,
      socketChannel,
      BufferAction.receiveBufferNone,
      true,
    );
    const send = yield fork(sendMessageSaga, socket);

    yield take(MessageAction.close.type);
    socket.close();
    yield cancel(receive);
    yield cancel(send);
  }
}

/**
 * This buffer throws ann error when more than 5 messages comes when current is processing
 */
// Commented out as it results in error
// export function* bufferFixedSaga() {
//   const socket = yield call(createSocketConnection);
//   const socketChannel = yield call(createSocketChannel, socket, buffers.fixed(5));
//   yield fork(receiveMessageSaga, socketChannel);
//   yield fork(sendMessageSaga, socket);
// }

/**
 * This buffer ignores expands when reaches a limit of received messages
 */
export function* bufferExpandingSaga() {
  while (true) {
    const socket = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket, buffers.expanding(5));
    const receive = yield fork(
      receiveMessageSaga,
      socketChannel,
      BufferAction.receiveBufferExpanding,
      true,
    );
    const send = yield fork(sendMessageSaga, socket);

    yield take(MessageAction.close.type);
    socket.close();
    yield cancel(receive);
    yield cancel(send);
  }
}

/**
 * This buffer keep only messages tha come first, every other that is above limit is dropped
 */
export function* bufferDroppingSaga() {
  while (true) {
    const socket = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket, buffers.dropping(5));
    const receive = yield fork(
      receiveMessageSaga,
      socketChannel,
      BufferAction.receiveBufferDropping,
      true,
    );
    const send = yield fork(sendMessageSaga, socket);

    yield take(MessageAction.close.type);
    socket.close();
    yield cancel(receive);
    yield cancel(send);
  }
}

/**
 * This buffer keep only latest messages, every message which came earlier is dropped
 */
export function* bufferSlidingSaga() {
  while (true) {
    const socket = yield call(createSocketConnection);
    const socketChannel = yield call(createSocketChannel, socket, buffers.sliding(5));
    const receive = yield fork(
      receiveMessageSaga,
      socketChannel,
      BufferAction.receiveBufferSliding,
      true,
    );
    const send = yield fork(sendMessageSaga, socket);

    yield take(MessageAction.close.type);
    socket.close();
    yield cancel(receive);
    yield cancel(send);
  }
}
