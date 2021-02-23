import { Buffer } from '@redux-saga/types';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { apply, put, take, delay } from '@redux-saga/core/effects';
import { MessageAction } from '../store/message/message.action';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export function createSocketChannel(socket: WebSocket, buffer?: Buffer<any>) {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      emit(JSON.parse(event.data));
    };

    socket.onclose = () => {
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
      const { payload } = yield take(socketChannel);
      if (addDelay) {
        yield delay(100);
      }
      yield put(action(payload));
    }
  } catch (e) {}
}
