//next.config.prod.mjs

import path from 'path';
import { fileURLToPath } from 'url';
import DotEnv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only include environment variables needed for the client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MONGODB_PUBLIC_KEY: process.env.NEXT_PUBLIC_MONGODB_PUBLIC_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_DATASET: process.env.NEXT_PUBLIC_DATASET,
    FRIENDLY_RECAPTCHA_SITE_KEY: process.env.FRIENDLY_RECAPTCHA_SITE_KEY,
    GITHUB_ID: process.env.GITHUB_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer }) => {
    const envFilePath = './.env.production';

    config.plugins.push(
      new DotEnv({
        path: envFilePath,
        systemvars: true,
      }),
      new NodePolyfillPlugin()
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: 'path-browserify',
        os: 'os-browserify/browser',
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        process: 'process/browser',
        vm: 'vm-browserify',
      };
    }

    // Ensure DefinePlugin doesn't conflict
    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'DefinePlugin') {
        if (plugin.definitions['process.env.NEXT_RUNTIME']) {
          delete plugin.definitions['process.env.NEXT_RUNTIME'];
        }
      }
    });

    return config;
  },
  // Add other production-specific settings here
};

export default nextConfig;
