import { useEffect, useState } from 'react';
import { fetchPhotos } from './api';

import './App.css';
import { Photo } from './types/Photo';
import { Popup } from './components/Popup';
import { useFavorites } from './FavoritesContext';

export const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites } = useFavorites();

  useEffect(() => {
    setIsLoading(true);

    fetchPhotos()
      .then(data => setPhotos(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load photos. Please try again later.')
      })
      .finally(() => setIsLoading(false));
  }, []);  


  const filteredPhotos = showFavorites
    ? photos.filter((photo) => favorites.includes(photo.id))
    : photos;

  return (
    <div className='App'>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Show All' : 'Show Favorites'}
      </button>
        <Popup photos={filteredPhotos} />
    </div>
  );
}
