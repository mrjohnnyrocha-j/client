import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import path from 'path';

// process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('/Users/joaorocha/Documents/j/j.holdings/client/config/j4-computer-1717021247560-432bfe705fbe.json');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const RECAPTCHA_PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID || 'your_project_id';
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || 'your_site_key';

const recaptchaClient = new RecaptchaEnterpriseServiceClient();

async function verifyRecaptcha(token: string) {
  const projectPath = recaptchaClient.projectPath(RECAPTCHA_PROJECT_ID);
  const request = {
    parent: projectPath,
    assessment: {
      event: {
        token,
        siteKey: RECAPTCHA_SITE_KEY,
      },
    },
  };

  const [response] = await recaptchaClient.createAssessment(request);

  if (!response.tokenProperties || !response.tokenProperties.valid) {
    throw new Error(`Invalid reCAPTCHA token: ${response.tokenProperties?.invalidReason || 'invalid or missing token properties'}`);
  }

  return response.riskAnalysis?.score || 0;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, companyName, captchaToken } = req.body;

  if (!email || !password || !firstName || !lastName || !captchaToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let verified = false;
  try {
    const recaptchaScore = await verifyRecaptcha(captchaToken);
    if (recaptchaScore >= 0.5) {
      verified = true;
    }
  } catch (error: any) {
    console.error('reCAPTCHA verification failed:', error.message);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (email, password, first_name, last_name, company_name, verified)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [email, hashedPassword, firstName, lastName, companyName, verified];
    const result = await pool.query(query, values);

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error: any) {
    console.error('Error creating user:', error);

    if (error.response && error.response.headers['content-type'] && error.response.headers['content-type'].includes('text/html')) {
      return res.status(500).json({ error: 'Received unexpected HTML response' });
    }

    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
