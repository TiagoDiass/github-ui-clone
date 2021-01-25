import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, GithubLogo, SearchForm } from './Header.elements';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    navigate(`/${search.toLocaleLowerCase().trim()}`);
  }

  return (
    <Container>
      <GithubLogo />
      <SearchForm onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          type='text'
          placeholder='Enter Username or Repo...'
        />
      </SearchForm>
    </Container>
  );
};

export default Header;
