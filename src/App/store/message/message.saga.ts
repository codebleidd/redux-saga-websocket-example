import { END, EventChannel, eventChannel, buffers } from 'redux-saga';
import { apply, call, cancel, fork, put, take } from '@redux-saga/core/effects';
import { MessageAction } from './message.action';
import { createSocketConnection } from '../../api/websocket';
import { Buffer } from '@redux-saga/types';
import {
  createSocketChannel,
  receiveMessageSaga,
  sendMessageSaga,
} from '../../api/websocket.helper';

export function* messageSaga() {
  while (true) {
    /**
     * Create WebSocket connection. When using channel the protocol we use here
     * doesn't neccesarily has to be WebSocket. It basicaly can be anything
     * from `interval` to MQTT protocol
     */
    const socket = yield call(createSocketConnection);

    /**
     * Create `eventChannel` to
     */
    const socketChannel = yield call(createSocketChannel, socket);

    /**
     * Fork `receiveMessageSaga` and `sendMessageSaga` to make them run concurrently
     */
    const receive = yield fork(receiveMessageSaga, socketChannel);
    const send = yield fork(sendMessageSaga, socket);

    /**
     * Take every close WebSocket action, close WebSocket and cancel all forked sagas
     */
    yield take(MessageAction.close.type);
    socket.close();
    yield cancel(receive);
    yield cancel(send);
  }
}
