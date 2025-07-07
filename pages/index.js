import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [key, setKey] = useState("");

  const handleCreate = async () => {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, personality }),
    });

    const data = await res.json();
    setKey(data.key);
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>Buat AI Kamu Sendiri</h1>
      <input
        placeholder="Nama AI"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <br /><br />
      <textarea
        placeholder="Sifat AI (contoh: cuek, romantis, jujur...)"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
        style={{ width: "300px", height: "100px", padding: "8px" }}
      />
      <br /><br />
      <button onClick={handleCreate}>Create AI</button>

      {key && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Key Kamu:</h3>
          <code>{key}</code>
          <p>
            Gunakan API ini:<br />
            <code>/api/ai?text=Halo&key={key}</code>
          </p>
        </div>
      )}
    </div>
  );
        }
        
