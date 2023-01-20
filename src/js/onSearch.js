import Notiflix from 'notiflix';
import { axiosRequest, totalHits } from './axiosRequest';
import { createMarkupCard } from './createMarkupCard';
import { lightbox, gallery, loadMoreBtn } from './index';

let searchQuery = '';

function onSearch(evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value;

    gallery.innerHTML = '';
    axiosRequest(1)
        .then(data => {
        console.log(data);

        if (searchQuery === '') {
            return gallery.innerHTML = '';
        } else {
            createMarkupCard(data);
            loadMoreBtn.hidden = false;
            lightbox.refresh();
        }

        if (totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    })
        // .catch(err => console.log(err));
}


export { searchQuery, onSearch };