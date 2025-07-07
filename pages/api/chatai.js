import { db } from "../../lib/firebaseAdmin";
import axios from "axios";

async function chatai(question, { system_prompt = null, model = 'grok-3-mini' } = {}) {
  const { data } = await axios.post('https://api.appzone.tech/v1/chat/completions', {
    messages: [
      ...(system_prompt ? [{
        role: 'system',
        content: [{ type: 'text', text: system_prompt }]
      }] : []),
      {
        role: 'user',
        content: [{ type: 'text', text: question }]
      }
    ],
    model,
    isSubscribed: true
  }, {
    headers: {
      authorization: 'Bearer az-chatai-key',
      'content-type': 'application/json',
      'user-agent': 'okhttp/4.9.2',
      'x-app-version': '3.0',
      'x-requested-with': 'XMLHttpRequest',
      'x-user-id': '$RCAnonymousID:84947a7a4141450385bfd07a66c3b5c4'
    }
  });

  let fullText = '';
  const lines = data.split('\n\n').map(line => line.substring(6));
  for (const line of lines) {
    if (line === '[DONE]') continue;
    try {
      const d = JSON.parse(line);
      fullText += d.choices[0].delta.content;
    } catch {}
  }

  return fullText.trim();
}

export default async function handler(req, res) {
  const { key, text } = req.query;

  if (!key || !text) {
    return res.status(400).json({ error: "Parameter 'key' dan 'text' wajib diisi" });
  }

  const doc = await db.collection("ai-bots").doc(key).get();

  if (!doc.exists) {
    return res.status(404).json({ error: "AI tidak ditemukan" });
  }

  const { personality } = doc.data();

  try {
    const response = await chatai(text, { system_prompt: personality });
    return res.status(200).json({ response });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
