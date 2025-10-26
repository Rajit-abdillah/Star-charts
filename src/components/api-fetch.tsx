import { useState } from "react";
import "../styles.scss";

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
      const chartResponse = await fetch("https://backend-star-production.up.railway.app/star-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observer: {
            latitude: 33.775867,
            longitude: -84.39733,
            date: "2025-10-01",
          },
          style: "navy",
          view: { type: "constellation", parameters: { constellation } },
        }),
      });
      const chartData = await chartResponse.json();
      setImageUrl(chartData.data.imageUrl);

      // Fetch AI fact
      const factResponse = await fetch(
        "https://backend-star-production.up.railway.app/constellation-fact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ constellation }),
        }
      );
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
      <div className="container">
        <h1>🌟 Select a Constellation</h1>
        <label htmlFor="constellation">Choose a constellation:</label>
        <select
          id="constellation"
          value={constellation}
          onChange={(e) => setConstellation(e.target.value)}
        >
          <option value="">-- Select a constellation --</option>
          <option value="and">Andromeda</option>
          <option value="ant">Antlia</option>
          <option value="aps">Apus</option>
          <option value="aqr">Aquarius</option>
          <option value="aql">Aquila</option>
          <option value="ara">Ara</option>
          <option value="ari">Aries</option>
          <option value="aur">Auriga</option>
          <option value="boo">Boötes</option>
          <option value="cae">Caelum</option>
          <option value="cam">Camelopardalis</option>
          <option value="cnc">Cancer</option>
          <option value="cvn">Canes Venatici</option>
          <option value="cma">Canis Major</option>
          <option value="cmi">Canis Minor</option>
          <option value="cap">Capricornus</option>
          <option value="car">Carina</option>
          <option value="cas">Cassiopeia</option>
          <option value="cen">Centaurus</option>
          <option value="cep">Cepheus</option>
          <option value="cet">Cetus</option>
          <option value="cha">Chamaeleon</option>
          <option value="cir">Circinus</option>
          <option value="col">Columba</option>
          <option value="com">Coma Berenices</option>
          <option value="cra">Corona Australis</option>
          <option value="crb">Corona Borealis</option>
          <option value="crv">Corvus</option>
          <option value="crt">Crater</option>
          <option value="cru">Crux</option>
          <option value="cyg">Cygnus</option>
          <option value="del">Delphinus</option>
          <option value="dor">Dorado</option>
          <option value="dra">Draco</option>
          <option value="equ">Equuleus</option>
          <option value="eri">Eridanus</option>
          <option value="for">Fornax</option>
          <option value="gem">Gemini</option>
          <option value="gru">Grus</option>
          <option value="her">Hercules</option>
          <option value="hor">Horologium</option>
          <option value="hya">Hydra</option>
          <option value="hyi">Hydrus</option>
          <option value="ind">Indus</option>
          <option value="lac">Lacerta</option>
          <option value="leo">Leo</option>
          <option value="lmi">Leo Minor</option>
          <option value="lep">Lepus</option>
          <option value="lib">Libra</option>
          <option value="lup">Lupus</option>
          <option value="lyn">Lynx</option>
          <option value="lyr">Lyra</option>
          <option value="men">Mensa</option>
          <option value="mic">Microscopium</option>
          <option value="mon">Monoceros</option>
          <option value="mus">Musca</option>
          <option value="nor">Norma</option>
          <option value="oct">Octans</option>
          <option value="oph">Ophiuchus</option>
          <option value="ori">Orion</option>
          <option value="pav">Pavo</option>
          <option value="peg">Pegasus</option>
          <option value="per">Perseus</option>
          <option value="phe">Phoenix</option>
          <option value="pic">Pictor</option>
          <option value="psc">Pisces</option>
          <option value="psa">Piscis Austrinus</option>
          <option value="pup">Puppis</option>
          <option value="pyx">Pyxis</option>
          <option value="ret">Reticulum</option>
          <option value="sge">Sagitta</option>
          <option value="sgr">Sagittarius</option>
          <option value="sco">Scorpius</option>
          <option value="scl">Sculptor</option>
          <option value="sct">Scutum</option>
          <option value="ser">Serpens</option>
          <option value="sex">Sextans</option>
          <option value="tau">Taurus</option>
          <option value="tel">Telescopium</option>
          <option value="tri">Triangulum</option>
          <option value="tra">Triangulum Australe</option>
          <option value="tuc">Tucana</option>
          <option value="uma">Ursa Major</option>
          <option value="umi">Ursa Minor</option>
          <option value="vel">Vela</option>
          <option value="vir">Virgo</option>
          <option value="vol">Volans</option>
          <option value="vul">Vulpecula</option>
        </select>
        <button className="search-btn" onClick={handleClick}>
          Show My Constellation
        </button>

        {loading && <p className="loader">Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {imageUrl && (
          <div className="star-chart">
            <img src={imageUrl} alt="Star Chart" />
          </div>
        )}

        {fact && (
          <div className="fact-section">
            <p>
              <strong>Fun fact:</strong> {fact}
            </p>
            <p className="tip">AI generated fact by featherless ai</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StarWithFact;
