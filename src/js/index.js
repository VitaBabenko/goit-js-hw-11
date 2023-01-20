import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { onSearch } from './onSearch';




const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });


form.addEventListener('submit', onSearch);



export { gallery, lightbox };