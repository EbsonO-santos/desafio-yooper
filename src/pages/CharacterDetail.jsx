import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/marvelApi';
import { useFavorites } from '../hooks/useFavorites';
import '../pages/CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Buscar dados do personagem
        const charRes = await api.get(`/characters/${id}`);
        setCharacter(charRes.data.data.results[0]);

        // Buscar os últimos 10 quadrinhos, ordenados por onSaleDate desc
        const comicsRes = await api.get(`/characters/${id}/comics`, {
          params: {
            orderBy: '-onsaleDate',
            limit: 10,
          },
        });
        setComics(comicsRes.data.data.results);
      } catch (error) {
        console.error('Erro ao carregar dados do personagem:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!character) return <p>Personagem não encontrado.</p>;

  return (
    <main>
     <div className="character-detail">
    <h1>{character.name}</h1>
    <img
      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      alt={character.name}
    />
    <p>{character.description || 'Descrição não disponível.'}</p>

    <button onClick={() => toggleFavorite(character)}>
      {isFavorited(character.id) ? '★ Remover dos favoritos' : '☆ Favoritar'}
    </button>

    <h2>Últimos 10 quadrinhos</h2>
    {comics.length === 0 && <p>Sem quadrinhos recentes.</p>}
    <ul className="comics-list">
      {comics.map((comic) => (
        <li key={comic.id}>
          <strong>{comic.title}</strong> -{' '}
          {comic.dates.find((d) => d.type === 'onsaleDate')?.date
            ? new Date(
                comic.dates.find((d) => d.type === 'onsaleDate').date
              ).toLocaleDateString()
            : 'Data não disponível'}
        </li>
      ))}
    </ul>
  </div>
  </main>
  );
}

export default CharacterDetail;
