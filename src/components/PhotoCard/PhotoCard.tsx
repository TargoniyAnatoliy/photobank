import { useFavorites } from "../../FavoritesContext";
import { Photo } from "../../types/Photo";

interface Props {
    photo: Photo;
}

export const PhotoCard: React.FC<Props> = ({ photo }) => {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="photo-card">
            <img src={photo.thumbnail} alt={photo.author} />
            <p>{photo.author}</p>
            <span
                className={`star ${isFavorite(photo.id) ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(photo.id)}
            >
                ★
            </span>
        </div>
    );
};
