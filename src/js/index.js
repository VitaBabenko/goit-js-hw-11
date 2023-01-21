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

async function onSearch(evt) {
  try {
    evt.preventDefault();
    loadMoreBtn.style.display = 'none';
    const searchQuery = evt.currentTarget.elements.searchQuery.value;
    page = 1;
    renderedImages = 0;
    gallery.innerHTML = '';
    const response = await axiosRequest(searchQuery, page);
    console.log(response)
    if (searchQuery.trim() === '') {
      return (gallery.innerHTML = '');
    } else {
      createMarkupCard(gallery, response);
      renderedImages += response.data.hits.length;
      loadMoreBtn.style.display = 'block';
      lightbox.refresh();
    }
    if (renderedImages === response.data.totalHits || renderedImages > response.data.totalHits) {
      Notiflix.Notify.success(`This is last banch of images.`);
      loadMoreBtn.style.display = 'none';
      return;
    }
    if (response.data.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
  } catch (err) {
    console.log(err)
  } 
  form.reset();
}

async function onLoadMoreBtn() {
  try {
    page += 1;
    const btnResponse = await axiosRequest(form.elements.searchQuery.value, page);
    console.log(btnResponse)
    createMarkupCard(gallery, btnResponse);
    lightbox.refresh();
    renderedImages += btnResponse.data.hits.length;
    if (renderedImages > btnResponse.data.totalHits) {
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
  } catch (err) {
    console.log(err)
  }
}