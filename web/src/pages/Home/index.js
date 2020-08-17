import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import ws from '../../services/websocket';

import './styles.css';

const Home = () => {
  const { user, signOut } = useAuth();
  const [connected, setConnected] = useState(false);

  ws.on('open', () => {
    setConnected(true);
  });

  const userChannel =
    ws.getSubscription(`user:${user.id}`) || ws.subscribe(`user:${user.id}`);

  userChannel.on('logout', () => {
    console.log('LOGOUT');
  });

  return (
    <div>
      <h1>Home</h1>
      <h2>{user.name}</h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div id="status" className={connected ? 'online' : ''} /> Status
        </div>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={signOut} type="button">
          Sair
        </button>
      </div>
    </div>
  );
};

export default Home;
