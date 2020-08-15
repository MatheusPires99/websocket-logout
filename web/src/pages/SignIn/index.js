import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      signIn({
        email,
        password,
      });
    },
    [email, password, signIn],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <Link to="signup">Criar conta</Link>
    </div>
  );
};

export default SignIn;
