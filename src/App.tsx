import { useEffect, useState } from 'react';
import { fetchPhotos } from './api';

import styles from './App.module.scss';
import { Photo } from './types/Photo';
import { groupPhotosByLetter } from './utils';
import { PhotoCard } from './components/PhotoCard';
import { IoIosArrowForward, IoIosClose } from 'react-icons/io';
import classNames from 'classnames';
import useFavorites from './FavoritesContext/useFavorites';

export const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [defaultOrder, setDefaultOrder] = useState(true);
  const [popupOpen, setPopupOpen] = useState(true);

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

  const groupedPhotos = groupPhotosByLetter(filteredPhotos);

  if (defaultOrder) {
    groupedPhotos.sort();
  }

  if (!defaultOrder) {
    groupedPhotos.reverse();
  }

  const togglePopupOpen = () => setPopupOpen(!popupOpen);

  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>Photobank</header>
      {isLoading && <p style={{ color: '#fff' }}>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}      
      <section className={classNames(styles.popup, {
        [styles.popupMini]: !popupOpen,
      })}>
        <header className={styles.popupHeader}>
          <p>
            <span              
              onClick={() => setDefaultOrder(!defaultOrder)}
            >
              Filter By: <a className={styles.defaultOrder} href='#'>{defaultOrder ? 'A-Z' : 'Z-A'}</a>
            </span> | <span style={{ cursor: 'pointer' }} onClick={() => setShowFavorites(!showFavorites)}>
              {showFavorites ? 'Show All' : 'Show Favorites'}
            </span>
          </p>
          <span
            className={styles.headerIcon}
            onClick={() => togglePopupOpen()}
          >
          {!popupOpen ? <IoIosArrowForward /> : <IoIosClose />}
          </span>
        </header>
        <main className={styles.popupMain}>
          {groupedPhotos.map(([letter, photos]) => (
            <div key={letter} className={styles.group}>
              <h3 className={styles.groupHeader}>{letter}</h3>
              {photos.length > 5 ? (
                  photos.slice(0,5).map(photo => (
                      <PhotoCard
                          key={photo.id}
                          photo={photo}
                      />
                  ))
              ) : (
                  photos.map(photo => (
                      <PhotoCard
                          key={photo.id}
                          photo={photo}
                      />
                  ))
              )}
            </div>
          ))}
        </main>
        </section>
    </div>
  );
}
