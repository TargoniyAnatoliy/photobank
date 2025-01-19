import React from "react";
import { Photo } from "../../types/Photo";
import { PhotoCard } from "../PhotoCard";

type Props = {
    photos: Photo[];
};

export const Columns: React.FC<Props> = ({ photos }) => {
    const columnCount = 4;
    const columns: Photo[][] = Array.from({ length: columnCount }, () => []);

    photos.forEach((photo, index) => {
        columns[index % columnCount].push(photo);
    });

    return (
        <div className="columns">
            {columns.map((column, index) => (
                <div key={index} className="column">
                    {column.map((photo) => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            ))}
        </div>
    );
};
