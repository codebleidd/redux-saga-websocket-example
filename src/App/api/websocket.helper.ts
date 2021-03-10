import { Buffer } from '@redux-saga/types';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { apply, call, put, take, delay } from '@redux-saga/core/effects';
import { MessageAction } from '../store/message/message.action';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export function createSocketChannel(socket: WebSocket, buffer?: Buffer<any>) {
  /**
   * Create event channel to handle sending events.
   * Using emit method we are allowed to send messages within channel.
   * We can also add bufferwhen we expect WebSocket to send many messages at once
   */
  return eventChannel((emit) => {
    /**
     *
     * On every message emit an action that contains data from WebSocket
     */
    socket.onmessage = (event) => {
      emit(JSON.parse(event.data));
    };

    socket.onclose = () => {
      /**
       * `END` is just an object:
       * `{ type: '@@redux-saga/CHANNEL_END' }`
       * It is used to inform any channel consumer that channel has been closed
       * an no othe message will be sent
       */
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    return unsubscribe;
  }, buffer);
}

export function* sendMessageSaga(socket: WebSocket) {
  while (true) {
    /**
     * Take every action with type `WS_MESSAGE_SEND`
     * and send `action.payload` using WebSocket
     */
    const payload = yield take(MessageAction.send.type);
    yield apply(socket, socket.send, [JSON.stringify(payload)]);
  }
}

export function* receiveMessageSaga(
  socketChannel: EventChannel<Event>,
  action = MessageAction.receive,
  addDelay = false,
) {
  try {
    while (true) {
      /**
       * We pass here socketChannel create above to handle any messege
       * that was emitted using this channel
       *
       * Then we perform an action which contains payload from received message
       * from websocket
       */
      const { payload } = yield take(socketChannel);

      /**
       * This `addDelay` option allows creating a processing effect
       * which enables usage of `buffers`
       */
      if (addDelay) {
        const delayTime = Math.random() * 100;
        yield delay(delayTime);
      }

      yield put(action(payload));
    }
  } finally {
    console.log('Channel has emitted `END` action');
  }
}
