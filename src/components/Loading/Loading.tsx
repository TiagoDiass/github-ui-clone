import React from 'react';

import { Container, Spinner } from './Loading.styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;
