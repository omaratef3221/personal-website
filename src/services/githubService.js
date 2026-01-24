const GITHUB_USERNAME = 'omaratef3221';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

// Fetch pinned repositories using GitHub GraphQL API via scraping GitHub profile
export async function fetchGitHubRepos() {
  try {
    // First, try to get pinned repos by scraping the GitHub profile page
    const pinnedRepos = await fetchPinnedReposFromProfile();

    if (pinnedRepos && pinnedRepos.length > 0) {
      // Cache the data
      const cacheData = {
        repos: pinnedRepos,
        timestamp: Date.now(),
      };
      localStorage.setItem('githubRepos', JSON.stringify(cacheData));
      return pinnedRepos;
    }

    // Fallback: fetch all repos and return top ones by stars
    return await fetchAllRepos();
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);

    // Try to return cached data
    const cached = localStorage.getItem('githubRepos');
    if (cached) {
      const parsedCache = JSON.parse(cached);
      console.log('Using cached GitHub data');
      return parsedCache.repos;
    }

    return [];
  }
}

// Fetch pinned repos by scraping GitHub profile
async function fetchPinnedReposFromProfile() {
  try {
    // Use a CORS proxy to fetch the GitHub profile page
    const corsProxies = [
      (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    ];

    const profileUrl = `https://github.com/${GITHUB_USERNAME}`;
    let html = null;

    for (const proxyFn of corsProxies) {
      try {
        const response = await fetch(proxyFn(profileUrl));
        if (response.ok) {
          html = await response.text();
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!html) {
      throw new Error('Could not fetch GitHub profile');
    }

    // Parse pinned repo names from the HTML
    const pinnedRepoNames = [];
    const pinnedRegex = /class="[^"]*pinned-item-list-item[^"]*"[\s\S]*?href="\/[^/]+\/([^/"]+)"/g;
    let match;

    while ((match = pinnedRegex.exec(html)) !== null) {
      if (!pinnedRepoNames.includes(match[1])) {
        pinnedRepoNames.push(match[1]);
      }
    }

    // Alternative regex pattern for pinned repos
    if (pinnedRepoNames.length === 0) {
      const altRegex = /data-hovercard-url="\/[^/]+\/([^/]+)\/hovercard"/g;
      const seen = new Set();
      while ((match = altRegex.exec(html)) !== null) {
        if (!seen.has(match[1]) && pinnedRepoNames.length < 6) {
          seen.add(match[1]);
          pinnedRepoNames.push(match[1]);
        }
      }
    }

    if (pinnedRepoNames.length === 0) {
      return null;
    }

    // Fetch full details for each pinned repo
    const repoPromises = pinnedRepoNames.map(async (repoName) => {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      if (!response.ok) return null;
      return response.json();
    });

    const repoDetails = await Promise.all(repoPromises);

    return repoDetails
      .filter(repo => repo !== null)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
      }));
  } catch (error) {
    console.error('Failed to fetch pinned repos:', error);
    return null;
  }
}

// Fallback: Fetch all repos sorted by stars
async function fetchAllRepos() {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = await response.json();

  const processedRepos = repos
    .filter(repo => !repo.fork && !repo.archived)
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language,
      topics: repo.topics || [],
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
    }))
    .sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.pushedAt) - new Date(a.pushedAt);
    })
    .slice(0, 6);

  // Cache the data
  const cacheData = {
    repos: processedRepos,
    timestamp: Date.now(),
  };
  localStorage.setItem('githubRepos', JSON.stringify(cacheData));

  return processedRepos;
}

// Fetch GitHub user profile stats
export async function fetchGitHubProfile() {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const profile = await response.json();

    return {
      name: profile.name,
      bio: profile.bio,
      avatar: profile.avatar_url,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      profileUrl: profile.html_url,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub profile:', error);
    return null;
  }
}

// Get cached repos without fetching
export function getCachedRepos() {
  const cached = localStorage.getItem('githubRepos');
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
}

// Check if cache is stale (older than 30 minutes)
export function shouldRefreshRepos() {
  const cached = localStorage.getItem('githubRepos');
  if (!cached) return true;

  const { timestamp } = JSON.parse(cached);
  const thirtyMinutes = 30 * 60 * 1000;
  return Date.now() - timestamp > thirtyMinutes;
}

// Get language color for badges
export function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    'Jupyter Notebook': '#DA5B0B',
  };
  return colors[language] || '#8b8b8b';
}

// Get icon for repo based on topics or name
export function getRepoIcon(repo) {
  const name = repo.name.toLowerCase();
  const topics = repo.topics.map(t => t.toLowerCase());
  const allTerms = [name, ...topics].join(' ');

  if (allTerms.includes('llm') || allTerms.includes('langchain') || allTerms.includes('gpt') || allTerms.includes('chatbot')) {
    return '🤖';
  }
  if (allTerms.includes('rag') || allTerms.includes('retrieval')) {
    return '🔍';
  }
  if (allTerms.includes('ml') || allTerms.includes('machine-learning') || allTerms.includes('model')) {
    return '🧠';
  }
  if (allTerms.includes('nlp') || allTerms.includes('text') || allTerms.includes('language')) {
    return '📝';
  }
  if (allTerms.includes('computer-vision') || allTerms.includes('image') || allTerms.includes('cv')) {
    return '👁️';
  }
  if (allTerms.includes('data') || allTerms.includes('analytics') || allTerms.includes('analysis')) {
    return '📊';
  }
  if (allTerms.includes('api') || allTerms.includes('backend') || allTerms.includes('server')) {
    return '⚙️';
  }
  if (allTerms.includes('web') || allTerms.includes('frontend') || allTerms.includes('react')) {
    return '🌐';
  }
  if (allTerms.includes('docker') || allTerms.includes('kubernetes') || allTerms.includes('devops')) {
    return '🐳';
  }
  if (allTerms.includes('airflow') || allTerms.includes('pipeline') || allTerms.includes('mlops')) {
    return '🔄';
  }
  if (allTerms.includes('sql') || allTerms.includes('database') || allTerms.includes('mongodb')) {
    return '💾';
  }
  if (allTerms.includes('pytorch') || allTerms.includes('tensorflow') || allTerms.includes('deep-learning')) {
    return '🔬';
  }
  if (allTerms.includes('tutorial') || allTerms.includes('course') || allTerms.includes('learn')) {
    return '📚';
  }

  return '📦';
}

export default {
  fetchGitHubRepos,
  fetchGitHubProfile,
  getCachedRepos,
  shouldRefreshRepos,
  getLanguageColor,
  getRepoIcon,
};
