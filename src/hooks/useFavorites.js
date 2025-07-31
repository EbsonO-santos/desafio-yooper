import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'marvel_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);

    if (isFavorite) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== character.id));
    } else {
      if (favorites.length >= 5) {
        alert('Você só pode favoritar até 5 personagens.');
        return;
      }
      setFavorites((prev) => [...prev, character]);
    }
  };

  const isFavorited = (id) => favorites.some((fav) => fav.id === id);

  return { favorites, toggleFavorite, isFavorited };
}
