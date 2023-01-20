import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { axiosRequest } from './axiosRequest';
import { createMarkupCard } from './createMarkupCard';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let renderedImages = 0;

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearch(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;
  page = 1;
  gallery.innerHTML = '';
  axiosRequest(searchQuery, page).then(data => {
    if (searchQuery === '') {
      return (gallery.innerHTML = '');
    } else {
      createMarkupCard(gallery, data);
      renderedImages += data.hits.length;
      loadMoreBtn.style.display = 'block';
      lightbox.refresh();
    }
    if (renderedImages === data.totalHits || renderedImages > data.totalHits) {
      Notiflix.Notify.success(`This is last banch of images.`);
      loadMoreBtn.style.display = 'none';
      return;
    }
    if (data.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}

function onLoadMoreBtn() {
  page += 1;
  axiosRequest(form.elements.searchQuery.value, page)
    .then(data => {
      createMarkupCard(gallery, data);
      renderedImages += data.hits.length;
      if (
        renderedImages === data.totalHits ||
        renderedImages > data.totalHits
      ) {
        Notiflix.Notify.success(`This is last banch of images.`);
        loadMoreBtn.style.display = 'none';
        return;
      }
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(err => {
      console.log(err);
    });
}