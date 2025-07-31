import { useEffect, useState } from "react";
import api from "../services/marvelApi";
import CharacterCard from "../components/CharacterCard";
import { useFavorites } from "../hooks/useFavorites";
import "../pages/Home.css";
import logo1 from "../assets/img/logo1.png";
import lupa from "../assets/img/lupa.png";
import hero from "../assets/img/hero.png";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("name"); // ou '-name'
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { favorites, toggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    api
      .get("/characters", {
        params: {
          nameStartsWith: search || undefined,
          orderBy: order,
          limit: 20,
        },
      })
      .then((res) => setCharacters(res.data.data.results))
      .catch((err) => console.error("Erro:", err));
  }, [search, order]);

  const displayedCharacters = showOnlyFavorites ? favorites : characters;

  return (
    <div className="top">
      <div className="logo">
        <img src={logo1} alt="logo marvel" />
      </div>
      <div className="title">
        <h1>EXPLORE O UNIVERSO</h1>
        <br />
        <p>
          Mergulhe no domínio deslumbrante de todos os Personagens clássicos que
          você ama - e aquele que você descobrirá em breve!
        </p>
      </div>
      <div>
        <input
          className="search"
          placeholder="Procure por Heróis"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="iconlupa">
          <img src={lupa} alt="" />
        </div>
        <br />
        <div className="minav">
          <p>Encontrado 20 heróis</p>
          <div className="incohero">
            <img src={hero} alt="incone de herói" />
          </div>
          <span>Ordenar por nome - </span>
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="name">A-Z</option>
            <option value="-name">Z-A</option>
          </select>
          <button onClick={() => setShowOnlyFavorites((prev) => !prev)}>
            {showOnlyFavorites ? "Mostrar todos" : "Mostrar favoritos"}
          </button>
        </div>
      </div>

      <div className="cards-container">
        {displayedCharacters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onToggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
