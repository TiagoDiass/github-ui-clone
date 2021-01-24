import React from 'react';

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

import { ProfileData, RandomCalendar, RepoCard } from '../../components';

const Profile: React.FC = () => {
  const TabContent = () => (
    <div className='content'>
      <RepoIcon />
      <span className='label'>Repositories</span>
      <span className='number'>34</span>
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
            username='TiagoDiass'
            name='Tiago Dias'
            avatarUrl='https://avatars.githubusercontent.com/u/49597377?s=460&u=1cb884e66bd9b53aa849220d6d16597493f1ddda&v=4'
            followers={67}
            following={23}
            company='Google'
            location='Mogi Mirim, São Paulo'
            email='tiago.costadiasss@gmail.com'
            blog='https://tiagodiass.github.io/'
          />
        </ProfileSide>
        <RepositoriesSide>
          <Tab className='mobile'>
            <TabContent />
            <span className='line' />
          </Tab>

          <Repositories>
            <h2>Random repositories</h2>

            <section>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <RepoCard
                  key={n}
                  username='TiagoDiass'
                  reponame='github-ui-clone'
                  description='A Github UI Clone built with React, Typescript and the Github REST API'
                  language={n % 2 === 0 ? 'JavaScript' : 'TypeScript'}
                  stars={12}
                  forks={2}
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
