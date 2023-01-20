import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { onSearch } from './onSearch';
import { onLoadMoreBtn } from './onLoadMoreBtn';




const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);



export { gallery, lightbox, loadMoreBtn };