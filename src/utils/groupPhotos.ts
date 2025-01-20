import { Photo } from "../types/Photo";

export const groupPhotosByLetter = (photos: Photo[]): [string, Photo[]][] => {
    const grouped = photos.reduce<Record<string, Photo[]>>((acc, photo) => {
        const firstLetter = photo.author[0].toUpperCase();

        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }

        acc[firstLetter].push(photo);

        return acc;
    }, {});

    const groupedArr = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

    return groupedArr;
};
