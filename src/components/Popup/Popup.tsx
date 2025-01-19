import React, { useState } from "react";
import { Photo } from "../../types/Photo";
import { useFavorites } from "../../FavoritesContext";
import { Columns } from "../Columns";


type Props = {
    photos: Photo[];
}

export const Popup: React.FC<Props> = ({ photos }) => {
    const [isFavorites, setIsFavorites] = useState(false);
    const { favorites } = useFavorites();

    const filteredPhotos = isFavorites
        ? photos.filter((photo) => favorites.includes(photo.id))
        : photos;

    return (
        <div className="popup">
            <button onClick={() => setIsFavorites(!isFavorites)}>
                {isFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            <Columns photos={filteredPhotos} />
        </div>
    );
};
