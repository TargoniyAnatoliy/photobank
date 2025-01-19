import axios from "axios";
import { Photo } from "../types/Photo";

const URL = 'https://picsum.photos/v2/list';

export const fetchPhotos = async (limit = 50): Promise<Photo[]> => {
    try {
        const response = await axios.get<Photo[]>(`${URL}?limit=${limit}`);
        
        return response.data.map(photo => ({
            ...photo,
            thumbnail: `https://picsum.photos/id/${photo.id}/200`,
        }));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error fetching photos:', error.message);
        } else {
            console.error('Unknown error fetching photos:', error);
        }
        throw new Error('Failed to fetch photos');
    }
};
