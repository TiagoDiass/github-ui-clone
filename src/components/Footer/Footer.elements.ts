import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 25px 32px;
`;

export const Line = styled.div`
  max-width: 1280px;
  width: 100%;
  border-top: 1px solid var(--border);
`;

export const GithubLogo = styled(FaGithub)`
  margin-top: 25px;
  fill: var(--border);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
`;
