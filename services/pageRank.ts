import axios from 'axios';
import cheerio from 'cheerio';

// Simulated PageRank implementation
interface Page {
  url: string;
  content: string;
  links: string[];
  rank: number;
}

const pages: Page[] = [];

const fetchPageContent = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error);
    return '';
  }
};

const extractLinks = (html: string, baseUrl: string): string[] => {
  const $ = cheerio.load(html);
  const links: string[] = [];
  $('a').each((_, element) => {
    const href = $(element).attr('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
      const fullUrl = new URL(href, baseUrl).href;
      links.push(fullUrl);
    }
  });
  return links;
};

const initializePages = async (urls: string[]) => {
  for (const url of urls) {
    const content = await fetchPageContent(url);
    const links = extractLinks(content, url);
    pages.push({ url, content, links, rank: 1.0 / urls.length });
  }
};

const calculatePageRank = (iterations: number = 10, dampingFactor: number = 0.85) => {
  for (let i = 0; i < iterations; i++) {
    const newRanks = new Map<string, number>();
    pages.forEach(page => {
      let rankSum = 0;
      pages.forEach(p => {
        if (p.links.includes(page.url)) {
          rankSum += p.rank / p.links.length;
        }
      });
      newRanks.set(page.url, (1 - dampingFactor) / pages.length + dampingFactor * rankSum);
    });

    pages.forEach(page => {
      page.rank = newRanks.get(page.url) || page.rank;
    });
  }
};

export const getRankedPages = async (urls: string[]): Promise<Page[]> => {
  await initializePages(urls);
  calculatePageRank();
  return pages.sort((a, b) => b.rank - a.rank);
};
