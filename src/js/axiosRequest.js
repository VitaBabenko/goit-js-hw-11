
import axios from 'axios';
import Notiflix from 'notiflix';
import { searchQuery } from './onSearch';

function axiosRequest() {
    const BASE_URL = 'https://pixabay.com/api';
    const key = '17416890-a4cbe06baa9eb7d2b3a58d67d';

    const data = axios.get(`${BASE_URL}/?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(resp => {
            if (resp.data.totalHits === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            return resp.data;

        })
    
    return data;
}


export { axiosRequest, data };