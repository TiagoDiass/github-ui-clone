import React from 'react';
import { Link } from 'react-router-dom';

import { Container, TopSide, RepoIcon, BottomSide, StarIcon, ForksIcon } from './RepoCard.elements';

interface Props {
  username: string;
  reponame: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
}

const RepoCard: React.FC<Props> = ({
  username,
  reponame,
  description,
  language = 'undefined language',
  stars,
  forks,
}) => {
  const languageClass = language ? language.toLocaleLowerCase() : 'undefined';

  return (
    <Container>
      <TopSide>
        <header>
          <RepoIcon />
          <Link to={`/${username}/${reponame}`}>{reponame}</Link>
        </header>

        <p>{description}</p>
      </TopSide>

      <BottomSide>
        <ul>
          <li>
            <div className={`language ${languageClass}`}></div>
            <span>{language}</span>
          </li>

          <li>
            <StarIcon />
            <span>{stars}</span>
          </li>

          <li>
            <ForksIcon />
            <span>{forks}</span>
          </li>
        </ul>
      </BottomSide>
    </Container>
  );
};

export default RepoCard;
