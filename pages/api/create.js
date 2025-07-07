import { db } from "../../lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan metode POST" });
  }

  const { name, personality } = req.body;

  if (!name || !personality) {
    return res.status(400).json({ error: "Nama dan sifat AI wajib diisi" });
  }

  const key = uuidv4();

  await db.collection("ai-bots").doc(key).set({
    name,
    personality,
    key,
    createdAt: Date.now()
  });

  return res.status(200).json({ message: "AI berhasil dibuat", key });
}
