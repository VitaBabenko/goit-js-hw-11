// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import Notiflix from 'notiflix';
// import { axiosRequest } from './axiosRequest';
// import { createMarkupCard } from './createMarkupCard';

// const form = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let searchQuery = '';
// let page = 1;
// let lightbox = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionDelay: 250 });

// form.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoadMoreBtn);

// function onSearch(evt) {
//     evt.preventDefault();
//     searchQuery = evt.currentTarget.elements.searchQuery.value;
//     console.log(searchQuery)

//     gallery.innerHTML = '';
//     axiosRequest(1)
//         .then(data => {
//         console.log(data);

//         if (searchQuery === '') {
//             gallery.innerHTML = '';
//             loadMoreBtn.hidden = true;
//         } else {
//             createMarkupCard(data);
//             loadMoreBtn.hidden = false;
//             lightbox.refresh();
//         }

//         if (data.totalHits > 0) {
//             Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//         }
//     })
//         // .catch(err => console.log(err));
// }

// function onLoadMoreBtn() {
//     page += 1;
//     axiosRequest(page)
//         .then(data => {
//             console.log(data);
//             createMarkupCard(data);

//             const { height: cardHeight } = document
//                 .querySelector(".gallery")
//                 .firstElementChild.getBoundingClientRect();
//             window.scrollBy({
//                 top: cardHeight * 2,
//                 behavior: "smooth",
//             });

            // if (page * per_page === totalHits) {
            //     loadMoreBtn.hidden = true;
            //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");    
            // }
//         })
//         .catch(err => {
//             console.log(err);
//         });

// }

// export { gallery, lightbox, loadMoreBtn, page };


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

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);