import Notiflix from 'notiflix';
import { axiosRequest, totalHits, per_page } from './axiosRequest';
import { createMarkupCard } from './createMarkupCard';
import { loadMoreBtn } from './index';

let page = 1;

function onLoadMoreBtn() {
    page += 1;
    axiosRequest(page)
        .then(data => {
            console.log(data);
            createMarkupCard(data);

            const { height: cardHeight } = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });

            // if (page * per_page === totalHits) {
            //     loadMoreBtn.hidden = true;
            //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");    
            // }
        })
        .catch(err => {
            console.log(err);
        });

}


export { onLoadMoreBtn };