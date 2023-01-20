
export function createMarkupCard(ref, { hits }) {
  const markupCard = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}" class="link">
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/>
        <div class="info">
        <p class="info-item">
        <b>Likes: ${likes}</b></p>
        <p class="info-item">
        <b>Views: ${views}</b></p>
        <p class="info-item">
        <b>Comments: ${comments}</b></p>
        <p class="info-item">
        <b>Downloads: ${downloads}</b></p>
        </div>
        </div>
        </a>`
    )
    .join('');

  ref.insertAdjacentHTML('beforeend', markupCard);
}
