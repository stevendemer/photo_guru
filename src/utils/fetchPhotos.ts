import { IPhoto } from 'shared/IPhoto'
import axios from './axios'

export const fetchPhotos =  async (): Promise<IPhoto[]> => {
    const resp = await axios.get('photos');
    return resp.data;
}