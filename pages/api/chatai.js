import { chatAI } from 'youaicostum';

export default async function handler(req, res) {
  const { text, key } = req.query;
  if (!text || !key) {
    return res.status(400).json({ error: 'Query text dan key wajib' });
  }

  const result = await chatAI(text, key);
  res.status(200).json(result);
}
