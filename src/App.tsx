import { useEffect, useState } from 'react';
import { fetchPhotos } from './api';

import './App.css';
import { Photo } from './types/Photo';
import { FavoritesProvider } from './FavoritesContext/FavoritesContext';
import { Popup } from './components/Popup';

export const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  

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
  
  return (
    <div className='App'>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FavoritesProvider>
        <Popup photos={photos} />
      </FavoritesProvider>
    </div>
  );
}
