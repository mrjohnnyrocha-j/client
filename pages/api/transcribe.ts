import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const formData = new FormData();
      console.log(req.body)
    
      formData.append('file', req.body.file);
      console.log(formData);

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/wav2vec2-large-960h',
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.error) {
        res.status(500).json({ error: response.data.error });
      } else {
        res.status(200).json({ text: response.data.text });
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      res.status(500).json({ error: 'Error transcribing audio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
