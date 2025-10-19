import { useState } from "react";

export function StarWithFact() {
  const [constellation, setConstellation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch star chart
      const chartResponse = await fetch("http://localhost:3000/star-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observer: {
            latitude: 33.775867,
            longitude: -84.39733,
            date: "2025-10-01"
          },
          style: "navy",
          view: { type: "constellation", parameters: { constellation } }
        }),
      });
      const chartData = await chartResponse.json();
      setImageUrl(chartData.data.imageUrl);

      // Fetch AI fact
      const factResponse = await fetch("http://localhost:3000/constellation-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ constellation })
      });
      const factData = await factResponse.json();
      setFact(factData.fact);

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <input
        value={constellation}
        onChange={(e) => setConstellation(e.target.value)}
        placeholder="Enter 3-letter constellation id"
      />
      <button onClick={handleClick}>Show My Constellation</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {imageUrl && <img src={imageUrl} alt="Star Chart" />}
      {fact && <p><strong>Fun fact:</strong> {fact}</p>}
    </div>
  );
}

export default StarWithFact;
