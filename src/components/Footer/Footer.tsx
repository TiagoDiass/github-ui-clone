import React from 'react';

import { Container, Line, GithubLogo, Copywrite, DevLink } from './Footer.elements';

const Footer: React.FC = () => {
  return (
    <Container>
      <Line />
      <GithubLogo />
      <Copywrite>
        Github clone developed with 💙 by{' '}
        <DevLink href='https://github.com/TiagoDiass' target='_blank' rel='noopener noreferrer'>
          Tiago Dias
        </DevLink>
      </Copywrite>
    </Container>
  );
};

export default Footer;
