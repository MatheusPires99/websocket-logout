import React, { useState } from 'react';

import { useAuth } from '../../hooks/auth';
import ws from '../../services/websocket';

import './styles.css';

const Home = () => {
  const { signOut } = useAuth();
  const [connected, setConnected] = useState(false);

  ws.on('open', () => {
    setConnected(true);
  });

  // const userChannel =
  //   ws.getSubscription(`user:${user.id}`) || ws.subscribe(`user:${user.id}`);

  // userChannel.on('logout', () => {
  //   console.log('LOGOUT');
  // });

  return (
    <div>
      <h1>Home</h1>
      <div id="status" className={connected ? 'online' : ''} /> Status
      <button onClick={signOut} type="button">
        Sair
      </button>
    </div>
  );
};

export default Home;
