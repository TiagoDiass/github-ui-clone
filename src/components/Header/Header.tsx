import React from 'react';

import { Container, GithubLogo, SearchForm } from './Header.elements';

const Header: React.FC = () => {
  return (
    <Container>
      <GithubLogo />
      <SearchForm>
        <input type='text' placeholder='Enter Username or Repo...' />
      </SearchForm>
    </Container>
  );
};

export default Header;
