import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeName } from '../../styles/themes';

import { Container, GithubLogo, SearchForm } from './Header.elements';

interface Props {
  themeName: ThemeName;
  setThemeName: (newThemeName: ThemeName) => void;
}

const Header: React.FC<Props> = ({ themeName, setThemeName }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    navigate(`/${search.toLocaleLowerCase().trim()}`);
  }

  function toggleTheme() {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  }

  return (
    <Container>
      <GithubLogo onClick={toggleTheme} />
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
