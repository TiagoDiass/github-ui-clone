import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import extractTopRepos from '../../util/extractTopRepos';
import { APIRepo, APIUser } from '../../@types';
import { useFetch } from '../../hooks';

import {
  Container,
  Main,
  ProfileSide,
  RepositoriesSide,
  Repositories,
  CalendarHeading,
  RepoIcon,
  Tab,
} from './Profile.elements';

import { Loading, ProfileData, RandomCalendar, RepoCard } from '../../components';
import { Toast } from '../../services';

const Profile: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  if (!username) {
    navigate(`/TiagoDiass`);
  }

  const { data: user, error: errorUser } = useFetch<APIUser>(`/users/${username}`);
  const { data: repos, error: errorRepo } = useFetch<APIRepo[]>(
    `/users/${username}/repos?per_page=60`,
  );

  if (errorUser || errorRepo) {
    Toast.fire({
      icon: 'error',
      title: 'User not found',
      willClose: () => {
        navigate(-1);
      },
    });
    return <></>;
  }

  if (!user || !repos) {
    return <Loading />;
  }

  const TabContent = () => (
    <div className='content'>
      <RepoIcon />
      <span className='label'>Repositories</span>
      <span className='number'>{user.public_repos}</span>
    </div>
  );

  return (
    <Container>
      <Tab className='desktop'>
        <div className='wrapper'>
          <span className='offset' />
          <TabContent />
        </div>

        <span className='line' />
      </Tab>
      <Main>
        <ProfileSide>
          <ProfileData
            username={user.login}
            name={user.name}
            avatarUrl={user.avatar_url}
            followers={user.followers}
            following={user.following}
            company={user.company}
            location={user.location}
            email={user.email}
            blog={user.blog}
          />
        </ProfileSide>
        <RepositoriesSide>
          <Tab className='mobile'>
            <TabContent />
            <span className='line' />
          </Tab>

          <Repositories>
            <h2>Top repositories based on stars amount</h2>

            <section>
              {extractTopRepos(repos).map((repo, index) => (
                <RepoCard
                  key={index}
                  username={repo.owner.login}
                  reponame={repo.name}
                  description={repo.description}
                  language={repo.language}
                  stars={repo.stargazers_count}
                  forks={repo.forks}
                />
              ))}
            </section>
          </Repositories>

          <CalendarHeading>Random calendar (it does not represent the real data)</CalendarHeading>

          <RandomCalendar />
        </RepositoriesSide>
      </Main>
    </Container>
  );
};

export default Profile;
