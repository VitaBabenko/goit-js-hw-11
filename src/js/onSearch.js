import Notiflix from 'notiflix';
import { axiosRequest } from './axiosRequest';
import { createMarkupCard } from './createMarkupCard';
import { lightbox, gallery } from './index';

let searchQuery = '';

function onSearch(evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    gallery.innerHTML = '';
    axiosRequest().then(data => {
        console.log(data);

        if (searchQuery === '') {
            return gallery.innerHTML = '';
        } else {
            createMarkupCard(data);
            lightbox.refresh();
        }

        if (data.totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    });
}


export { searchQuery, onSearch };