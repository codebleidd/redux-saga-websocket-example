const WS_URL = 'wss://echo.websocket.org/';

export const createSocketConnection = () =>
  /**
   * Promise is used here to resolve ONLY an opened WebSocket connection
   */
  new Promise((resolve, reject) => {
    const ws: WebSocket = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log('Websocket connection open...');
      resolve(ws);
    };

    ws.onerror = (e) => reject(e);
  });
