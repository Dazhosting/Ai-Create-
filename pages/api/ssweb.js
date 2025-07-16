import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      creator: "Vercel team",
      success: false,
      error: 'Method not allowed'
    });
  }

  const { url } = req.query;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({
      creator: "Vercel team",
      success: false,
      error: 'Invalid or missing URL' 
    });
  }

  const headers = {
    'accept': '*/*',
    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    'origin': 'https://imagy.app',
    'priority': 'u=1, i',
    'referer': 'https://imagy.app/',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
  };

  const payload = {
    url,
    browserWidth: 1280,
    browserHeight: 720,
    fullPage: false,
    deviceScaleFactor: 1,
    format: 'png'
  };

  try {
    const response = await axios.post(
      'https://gcp.imagy.app/screenshot/createscreenshot',
      payload,
      { headers }
    );

    return res.status(200).json({
      creator: "Vercel team",
      success: true,
      id: response.data.id,
      fileUrl: response.data.fileUrl
    });
  } catch (error) {
    return res.status(500).json({
      creator: "Vercel team",
      success: false,
      error: error.message
    });
  }
}
