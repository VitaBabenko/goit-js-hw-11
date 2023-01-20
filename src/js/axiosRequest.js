
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import { searchQuery } from './index';

// let totalHits = 0;
// const per_page = 40;

// function axiosRequest(page) {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const key = '17416890-a4cbe06baa9eb7d2b3a58d67d';

//     const data = axios.get(`${BASE_URL}?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
//         .then(resp => {
//             totalHits = resp.data.totalHits;
//             if (resp.data.totalHits === 0) {
//                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//             }
//             return resp.data;
//         })
//         .catch(err => console.log(err));
    
//     return data;
// }



// export { axiosRequest, data, totalHits, per_page };


import axios from 'axios';
import Notiflix from 'notiflix';

const per_page = 40;

function axiosRequest(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const key = '17416890-a4cbe06baa9eb7d2b3a58d67d';

  const data = axios
    .get(
      `${BASE_URL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    )
    .then(resp => {
      if (resp.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return resp.data;
    })
    .catch(err => console.log(err));

  return data;
}

export { axiosRequest, data, totalHits, per_page };