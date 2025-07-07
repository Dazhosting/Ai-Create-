import { createAI } from 'youaicostom';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Gunakan metode POST' });
  }

  const { name, personality } = req.body;
  if (!name || !personality) {
    return res.status(400).json({ error: 'Nama dan sifat AI wajib diisi' });
  }

  const ai = await createAI(name, personality);
  res.status(200).json({ success: true, key: ai.key });
}
