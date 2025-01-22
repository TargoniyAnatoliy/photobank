import React from "react";
import { Photo } from "../../types/Photo";
import { groupPhotosByLetter } from "../../utils";
import { PhotoCard } from "../PhotoCard";
import styles from './Popup.module.scss';

type Props = {
    photos: Photo[];
}

export const Popup: React.FC<Props> = ({ photos }) => {

    const groupedPhotos = groupPhotosByLetter(photos);

    return (
        <div className={styles.popup}>
            {groupedPhotos.map(([letter, photos]) => (
                <div key={letter} className={styles.column}>
                    <h3>{letter}</h3>
                    {photos.map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
