import classNames from "classnames";
import { Photo } from "../../types/Photo";
import styles from './PhotoCard.module.scss';
import { FaStar } from "react-icons/fa";
import useFavorites from "../../FavoritesContext/useFavorites";

interface Props {
    photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className={styles.photoCard}>
            <span className={styles.imageGroup}>
                <img src={photo.thumbnail} alt={photo.author} />
                <p>
                    {photo.author
                        .split(' ')
                        .slice(0, 1)
                        .join('')}
                </p> 
            </span>
            <FaStar
                className={classNames(styles.star, {
                    [styles.favorite]: isFavorite(photo.id),
                })}
                onClick={() => toggleFavorite(photo.id)}
            />
        </div>
    );
};
