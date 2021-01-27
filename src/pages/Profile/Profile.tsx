import React from 'react';
import { useParams } from 'react-router-dom';
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

const Profile: React.FC = () => {
  const { username = 'TiagoDiass' } = useParams();
  const { data: user, error: errorUser } = useFetch<APIUser>(`/users/${username}`);
  const { data: repos, error: errorRepo } = useFetch<APIRepo[]>(
    `/users/${username}/repos?per_page=60`,
  );

  if (errorUser) {
    return <h1>{errorUser}</h1>;
  } else if (errorRepo) {
    return <h1>{errorRepo}</h1>;
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
