import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { APIRepo } from '../../@types';
import { Loading } from '../../components';
import { api, Toast } from '../../services';

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
  const [repository, setRepository] = useState<APIRepo>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/repos/${username}/${reponame}`)
      .then(response => {
        const repo: APIRepo = response.data;
        setRepository(repo);
      })
      .catch(err => {
        if (err.response.status === 404) {
          setError('Repository not found');
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [username, reponame]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    Toast.fire({
      icon: 'error',
      title: 'Repository not found',
      willClose: () => {
        navigate(-1);
      },
    });
    return <></>;
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
