import React from "react";
import { Photo } from "../../types/Photo";
import { groupPhotosByLetter } from "../../utils";
import { PhotoCard } from "../PhotoCard";

type Props = {
    photos: Photo[];
}

export const Popup: React.FC<Props> = ({ photos }) => {

    const groupedPhotos = groupPhotosByLetter(photos);

    return (
        <div className="popup">            
            <div className="columns">
                {groupedPhotos.map(([letter, photos]) => (
                    <div key={letter} className="column">
                        <h3>{letter}</h3>
                        {photos.map((photo) => (
                            <PhotoCard key={photo.id} photo={photo} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
