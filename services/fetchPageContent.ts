import puppeteer from 'puppeteer';

const fetchPageContent = async (url: string): Promise<string> => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw new Error('Failed to fetch page content');
  }
};

export default fetchPageContent;
