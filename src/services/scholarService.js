const SCHOLAR_ID = 'lw70gLkAAAAJ';
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

// Parse Google Scholar profile page HTML
function parseScholarProfile(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Extract stats (citations, h-index, i10-index)
  const stats = {};
  const statsTable = doc.querySelector('#gsc_rsb_st');
  if (statsTable) {
    const rows = statsTable.querySelectorAll('tr');
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        const label = cells[0]?.textContent?.trim().toLowerCase();
        const value = cells[1]?.textContent?.trim();
        if (label?.includes('citation')) {
          stats.totalCitations = parseInt(value) || 0;
        } else if (label?.includes('h-index')) {
          stats.hIndex = parseInt(value) || 0;
        } else if (label?.includes('i10')) {
          stats.i10Index = parseInt(value) || 0;
        }
      }
    });
  }

  // Extract publications
  const publications = [];
  const pubRows = doc.querySelectorAll('.gsc_a_tr');

  pubRows.forEach((row) => {
    const titleLink = row.querySelector('.gsc_a_at');
    const title = titleLink?.textContent?.trim() || '';
    const link = titleLink?.getAttribute('href') || '';

    const grayTexts = row.querySelectorAll('.gs_gray');
    const authors = grayTexts[0]?.textContent?.trim() || '';
    const venue = grayTexts[1]?.textContent?.trim() || '';

    const citationCell = row.querySelector('.gsc_a_c');
    const citations = parseInt(citationCell?.textContent?.trim()) || 0;

    const yearCell = row.querySelector('.gsc_a_y');
    const year = yearCell?.textContent?.trim() || '';

    if (title) {
      publications.push({
        title,
        authors,
        venue,
        year,
        citations,
        link: link ? `https://scholar.google.com${link}` : '',
      });
    }
  });

  return { stats, publications };
}

// Fetch with retry using different CORS proxies
async function fetchWithProxy(url, proxyIndex = 0) {
  if (proxyIndex >= CORS_PROXIES.length) {
    throw new Error('All CORS proxies failed');
  }

  const proxy = CORS_PROXIES[proxyIndex];
  const proxyUrl = `${proxy}${encodeURIComponent(url)}`;

  try {
    const response = await fetch(proxyUrl, {
      headers: {
        'Accept': 'text/html',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.warn(`Proxy ${proxyIndex + 1} failed:`, error.message);
    return fetchWithProxy(url, proxyIndex + 1);
  }
}

// Main function to fetch scholar data
export async function fetchScholarData() {
  const scholarUrl = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&sortby=pubdate`;

  try {
    const html = await fetchWithProxy(scholarUrl);
    const data = parseScholarProfile(html);

    // Cache the data in localStorage with timestamp
    const cacheData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem('scholarData', JSON.stringify(cacheData));

    return data;
  } catch (error) {
    console.error('Failed to fetch from Google Scholar:', error);

    // Try to return cached data if available
    const cached = localStorage.getItem('scholarData');
    if (cached) {
      const parsedCache = JSON.parse(cached);
      console.log('Using cached data from:', new Date(parsedCache.timestamp));
      return parsedCache;
    }

    // Return fallback data if everything fails
    return getFallbackData();
  }
}

// Check if we should refresh data (cache for 1 hour)
export function shouldRefreshData() {
  const cached = localStorage.getItem('scholarData');
  if (!cached) return true;

  const { timestamp } = JSON.parse(cached);
  const oneHour = 60 * 60 * 1000;
  return Date.now() - timestamp > oneHour;
}

// Get cached data without fetching
export function getCachedData() {
  const cached = localStorage.getItem('scholarData');
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
}

// Fallback data in case all fetching fails
function getFallbackData() {
  return {
    stats: {
      totalCitations: 400,
      hIndex: 3,
      i10Index: 2,
    },
    publications: [
      {
        title: 'Heart Failure Prediction using Machine learning with Meta-heuristic feature selection techniques',
        authors: 'O Elgendy, AB Nassif, B Soudan',
        venue: 'The 2024 OkIP International Conference on Advances in Health Information Technology (AHIT)',
        year: '2024',
        citations: 0,
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lw70gLkAAAAJ&citation_for_view=lw70gLkAAAAJ:UeHWp8X0CEIC',
      },
      {
        title: 'Text Toxicity Level Detection using Deep Contextualized Embedding Models',
        authors: 'O Elgendy, AB Nassif, B Soudan',
        venue: 'The 2024 OkIP International Conference on Advances in Health Information Technology (AHIT)',
        year: '2024',
        citations: 0,
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lw70gLkAAAAJ&citation_for_view=lw70gLkAAAAJ:d1gkVwhDpl0C',
      },
      {
        title: 'Alzheimer Detection using Different Deep Learning Methods with MRI Images',
        authors: 'O Elgendy, AB Nassif',
        venue: '2023 Advances in Science and Engineering Technology International Conferences (ASET)',
        year: '2023',
        citations: 12,
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lw70gLkAAAAJ&citation_for_view=lw70gLkAAAAJ:2osOgNQ5qMEC',
      },
      {
        title: 'Arabic fake news detection based on deep contextualized embedding models',
        authors: 'AB Nassif, A Elnagar, O Elgendy, Y Afadar',
        venue: 'Neural Computing and Applications',
        year: '2022',
        citations: 120,
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lw70gLkAAAAJ&citation_for_view=lw70gLkAAAAJ:u5HHmVD_uO8C',
      },
      {
        title: 'Breast cancer detection using artificial intelligence techniques: A systematic literature review',
        authors: 'AB Nassif, MA Talib, Q Nasir, Y Afadar, O Elgendy',
        venue: 'Artificial Intelligence in Medicine',
        year: '2022',
        citations: 260,
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=lw70gLkAAAAJ&citation_for_view=lw70gLkAAAAJ:u-x6o8ySG0sC',
      },
    ],
    isFallback: true,
  };
}

export default {
  fetchScholarData,
  shouldRefreshData,
  getCachedData,
};
