import { Link } from "react-router-dom";
import "../components/Character.css";

function CharacterCard({ character, onToggleFavorite, isFavorited }) {
  return (
    <section>
      <div className="character-card">
        <Link to={`/character/${character.id}`}>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <h3>{character.name}</h3>
        </Link>
        <button
          onClick={() => onToggleFavorite(character)}
          className="favorite-button"
        >
          <img
            src={
              isFavorited(character.id)
                ? "/icons/heart-filled.png"
                : "/icons/heart-empty.png"
            }
            alt={
              isFavorited(character.id)
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"
            }
            className="favorite-icon"
          />
        </button>
      </div>
    </section>
  );
}

export default CharacterCard;
