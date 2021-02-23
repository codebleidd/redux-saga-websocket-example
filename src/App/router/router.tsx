import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Buffers } from '../page/buffers/Buffers';
import { Message } from '../page/message/Message';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/buffers">
          <Buffers />
        </Route>
        <Route exact path="/">
          <Message />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
