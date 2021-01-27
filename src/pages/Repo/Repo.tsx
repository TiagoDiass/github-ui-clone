import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { APIRepo } from '../../@types';
import { Loading } from '../../components';
import { useFetch } from '../../hooks';

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
  const { username, repo: reponame } = useParams();
  const { data: repository, error } = useFetch<APIRepo>(`/repos/${username}/${reponame}`);

  if (!repository) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <BreadCrumb>
        <RepoIcon />
        <Link className='username' to={`/${username}`}>
          {username}
        </Link>

        <span>/</span>

        <Link className='reponame' to={`/${username}/${reponame}`}>
          {reponame}
        </Link>
      </BreadCrumb>

      <p>{repository?.description}</p>

      <Stats>
        <li>
          <StarIcon />
          <b>{repository?.stargazers_count}</b>
          <span>stars</span>
        </li>

        <li>
          <ForkIcon />
          <b>{repository?.forks}</b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton href={repository?.html_url} target='_blank' rel='noopener noreferrer'>
        <GithubIcon />
        <span>View on Github</span>
      </LinkButton>
    </Container>
  );
};

export default Repo;
