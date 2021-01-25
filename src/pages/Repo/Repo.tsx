import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  BreadCrumb,
  RepoIcon,
  Stats,
  StarIcon,
  ForkIcon,
  LinkButton,
  GithubIcon,
} from './Repo.elements';

const Repo: React.FC = () => {
  return (
    <Container>
      <BreadCrumb>
        <RepoIcon />
        <Link className='username' to={`/tiagodiass`}>
          TiagoDiass
        </Link>

        <span>/</span>

        <Link className='reponame' to={`/tiagodiass/githui-ui-clone`}>
          github-ui-clone
        </Link>
      </BreadCrumb>

      <p>Description shit</p>

      <Stats>
        <li>
          <StarIcon />
          <b>9</b>
          <span>stars</span>
        </li>

        <li>
          <ForkIcon />
          <b>0</b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton
        href='https://github.com/TiagoDiass/github-ui-clone'
        target='_blank'
        rel='noopener noreferrer'
      >
        <GithubIcon />
        <span>View on Github</span>
      </LinkButton>
    </Container>
  );
};

export default Repo;
