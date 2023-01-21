import axios from 'axios';
import Notiflix from 'notiflix';

const per_page = 40;

export async function axiosRequest(query, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const key = '17416890-a4cbe06baa9eb7d2b3a58d67d';

    const response = await axios
      .get(
        `${BASE_URL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
      );
      if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadMoreBtn.style.display = 'none';
      }
  return response;
}