import { APIRepo } from '../@types';

/**
 * @function - Function to sort the repositories based on the amount of stars and then map them to return only the necessary fields
 * @param repositories - array of type APIRepo
 * @returns APIRepo[] - array of type APIRepo
 */
function extractTopRepos(repositories: APIRepo[]): APIRepo[] {
  repositories.sort((repo1, repo2) => {
    if (repo1.stargazers_count < repo2.stargazers_count) return 1;
    if (repo1.stargazers_count > repo2.stargazers_count) return -1;
    return 0;
  });

  const repositoriesWithOnlyNecessaryFields = repositories.map(repo => ({
    name: repo.name,
    owner: {
      login: repo.owner.login,
    },
    stargazers_count: repo.stargazers_count,
    forks: repo.forks,
    html_url: repo.html_url,
    language: repo.language,
    description: repo.description,
  }));

  const userTop6Repos: APIRepo[] = [];

  for (let i = 0; i <= 5; i++) {
    userTop6Repos.push(repositoriesWithOnlyNecessaryFields[i]);
  }

  return userTop6Repos;
}

export default extractTopRepos;
