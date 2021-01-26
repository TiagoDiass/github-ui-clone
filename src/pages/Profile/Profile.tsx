import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services';
import extractTopRepos from '../../util/extractTopRepos';

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
import { APIRepo, APIUser } from '../../@types';

interface Data {
  user?: APIUser;
  repos?: APIRepo[];
  error?: string;
}

const Profile: React.FC = () => {
  const { username = 'TiagoDiass' } = useParams();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    Promise.all([
      api.get(`/users/${username}`),
      api.get(`/users/${username}/repos?per_page=60`),
    ]).then(async responses => {
      const [userResponse, reposResponse] = responses;

      if (userResponse.status === 404) {
        setData({ error: 'User not found' });
        return;
      }

      setData({
        user: userResponse.data,
        repos: extractTopRepos(reposResponse.data),
      });
    });
  }, [username]);

  if (data?.error) {
    return <h1>{data.error}</h1>;
  }

  if (!data?.user || !data?.repos) {
    return <Loading />;
  }

  const TabContent = () => (
    <div className='content'>
      <RepoIcon />
      <span className='label'>Repositories</span>
      <span className='number'>{data.user?.public_repos}</span>
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
            username={data.user.login}
            name={data.user.name}
            avatarUrl={data.user.avatar_url}
            followers={data.user.followers}
            following={data.user.following}
            company={data.user.company}
            location={data.user.location}
            email={data.user.email}
            blog={data.user.blog}
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
              {data.repos.map((repo, index) => (
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
