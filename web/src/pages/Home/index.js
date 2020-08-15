import React from 'react';

import { useAuth } from '../../hooks/auth';

const Home = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>Home</h1>

      <button onClick={signOut} type="button">
        Sair
      </button>
    </div>
  );
};

export default Home;
