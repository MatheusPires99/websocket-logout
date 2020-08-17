import React from 'react';

import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
    </div>
  );
};

export default Dashboard;
