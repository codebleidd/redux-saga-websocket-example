import { AppState } from '../app.reducer';
import { createSelector } from '@reduxjs/toolkit';
import { Message } from './buffer.action';

export class BufferSelector {
  static getBufferDomain = (state: AppState) => (state ? state.buffer : ({} as AppState['buffer']));

  static getBufferNone = createSelector(BufferSelector.getBufferDomain, (domain) =>
    domain ? domain.none : [],
  );

  static getBufferExpanding = createSelector(BufferSelector.getBufferDomain, (domain) =>
    domain ? domain.expanding : [],
  );

  static getBufferDropping = createSelector(BufferSelector.getBufferDomain, (domain) =>
    domain ? domain.dropping : [],
  );

  static getBufferSliding = createSelector(BufferSelector.getBufferDomain, (domain) =>
    domain ? domain.sliding : [],
  );
}
