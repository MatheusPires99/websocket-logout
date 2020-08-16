import Ws from '@adonisjs/websocket-client';

const protocol = process.env.NODE_ENV === 'development' ? 'ws' : 'wss';
const ws = Ws(`${protocol}://${process.env.REACT_APP_WS_URL}`);

export default ws.connect();
