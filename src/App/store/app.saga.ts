import { all } from '@redux-saga/core/effects';
import { messageSaga } from './message/message.saga';
import {
  bufferDroppingSaga,
  bufferExpandingSaga,
  bufferNoneSaga,
  bufferSlidingSaga,
} from './buffer/buffer.saga';

export function* initSaga() {
  yield all([
    messageSaga(),
    bufferNoneSaga(),
    bufferExpandingSaga(),
    bufferDroppingSaga(),
    bufferSlidingSaga(),
  ]);
}
