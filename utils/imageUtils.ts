// utils/imageUtils.ts
import { faker } from "@faker-js/faker";
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const downloadImage = async (url: string, outputPath: string): Promise<void> => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);
      let error: Error | null = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve();
        }
      });
    });
  };
  
  const getCachedImage = async (url: string): Promise<string> => {
    const fileName = path.basename(url);
    const outputPath = path.resolve('public/cache', fileName);
  
    if (fs.existsSync(outputPath)) {
      return `/cache/${fileName}`;
    }
  
    try {
      await downloadImage(url, outputPath);
      return `/cache/${fileName}`;
    } catch (error) {
      console.error('Error downloading image:', error);
      const fallbackUrl = faker.image.avatar();
      return fallbackUrl;
    }
  };
  
  export default getCachedImage;