import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../app.reducer';

export class MessageSelector {
  static getMessageList = (state: AppState) => (state ? state.message : []);
}
