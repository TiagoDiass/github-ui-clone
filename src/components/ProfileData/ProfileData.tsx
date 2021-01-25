import React from 'react';

import {
  Container,
  ProfileTop,
  Avatar,
  FollowersAndFollowingsRow,
  PeopleIcon,
  ProfileInfo,
  CompanyIcon,
  LocationIcon,
  EmailIcon,
  BlogIcon,
} from './ProfileData.elements';

interface Props {
  username: string;
  name: string;
  avatarUrl: string;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
}

const ProfileData: React.FC<Props> = ({
  username,
  name,
  avatarUrl,
  followers,
  following,
  company,
  location,
  email,
  blog,
}) => {
  return (
    <Container>
      <ProfileTop>
        <Avatar src={avatarUrl} alt={username} />

        <div>
          <h1>{name}</h1>
          <h2>{username}</h2>
        </div>
      </ProfileTop>

      <FollowersAndFollowingsRow>
        <li>
          <PeopleIcon />
          <b>{followers}</b>
          <span>followers</span>
          <span>·</span>
        </li>

        <li>
          <b>{following}</b>
          <span>following</span>
        </li>
      </FollowersAndFollowingsRow>

      <ProfileInfo>
        {company && (
          <li>
            <CompanyIcon />
            <span>{company}</span>
          </li>
        )}
        {location && (
          <li>
            <LocationIcon />
            <span>{location}</span>
          </li>
        )}
        {email && (
          <li>
            <EmailIcon />
            <span>{email}</span>
          </li>
        )}
        {blog && (
          <li>
            <BlogIcon />
            <a href={blog} target='_blank' rel='noopener noreferrer'>
              {blog}
            </a>
          </li>
        )}
      </ProfileInfo>
    </Container>
  );
};

export default ProfileData;
