const WS_URL = 'wss://echo.websocket.org/';

export const createSocketConnection = () =>
  new Promise((resolve, reject) => {
    const ws: WebSocket = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log('Websocket connection open...');
      resolve(ws);
    };

    ws.onerror = (e) => reject(e);
  });
