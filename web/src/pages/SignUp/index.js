import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      await api.post('/users', {
        name,
        email,
        password,
      });
    },
    [email, name, password],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={e => setName(e.target.value)}
        />
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

        <button type="submit">Criar conta</button>
      </form>

      <Link to="/">Voltar ao login</Link>
    </div>
  );
};

export default SignUp;
