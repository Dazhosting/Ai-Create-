import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiKey(null);
    setError('');

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, personality })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Gagal membuat AI');

      setApiKey(data.key);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🧠 Create AI</h1>
      <form onSubmit={handleSubmit}>
        <label>Nama AI:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Luna"
          required
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }}
        />

        <label>Sifat AI:</label>
        <textarea
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          placeholder="Contoh: Kamu adalah AI yang cuek dan suka membalas singkat."
          required
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10, height: 100 }}
        />

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? 'Membuat...' : 'Buat AI'}
        </button>
      </form>

      {apiKey && (
        <div style={{ marginTop: 20, background: '#e2ffe2', padding: 15, borderRadius: 5 }}>
          <strong>✅ AI berhasil dibuat!</strong>
          <p>API Key kamu:</p>
          <code style={{ wordBreak: 'break-word' }}>{apiKey}</code>
          <p style={{ marginTop: 10 }}>
            Gunakan di: <code>/api/text?text=halo&key={apiKey}</code>
          </p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, background: '#ffe2e2', padding: 15, borderRadius: 5 }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}
