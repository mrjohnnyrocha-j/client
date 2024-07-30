import { getRankedPages } from './pageRank';
import axios from 'axios';
import cheerio from 'cheerio';

export interface SearchResult {
  url: string;
  title: string;
  subtitle: string;
  keywords: string[];
  seoRanking: number;
  publishedDate: string;
  lastEditedDate: string;
}

const fetchPageTitleAndDescription = async (url: string): Promise<{ title: string, description: string }> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('head > title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    return { title, description };
  } catch (error) {
    console.error(`Error fetching title and description from ${url}:`, error);
    return { title: 'No Title', description: 'No Description' };
  }
};

const extractKeywords = (text: string): string[] => {
  // Simple keyword extraction by splitting words
  const words = text.split(/\W+/).filter(word => word.length > 3);
  return [...new Set(words)];
};

export const search = async (query: string): Promise<SearchResult[]> => {
  // In a real scenario, we'd fetch a set of relevant URLs from a search index or database
  const urls = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3',
  ];

  const rankedPages = await getRankedPages(urls);

  const results: SearchResult[] = [];
  for (const page of rankedPages) {
    const { title, description } = await fetchPageTitleAndDescription(page.url);
    const keywords = extractKeywords(description);
    results.push({
      url: page.url,
      title,
      subtitle: description,
      keywords,
      seoRanking: page.rank,
      publishedDate: '2023-01-01', // Mock data
      lastEditedDate: '2023-06-01', // Mock data
    });
  }

  return results;
};
