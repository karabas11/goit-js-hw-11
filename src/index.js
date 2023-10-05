import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApi from "./pixabay-api";




const refs = {
  form: document.querySelector('.search-form'),
  imgGallery: document.querySelector('.gallery'),
  guard: document.querySelector('.is-guard'),
  searchInput: document.querySelector('.search-form__input'),
  searchButton: document.querySelector('.search-form__button')
};

refs.form.addEventListener('submit', onSearch);

const newsApi = new NewsApi();

const options = {
  root: null,
  rootMargin: "200px",
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

const gallery = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  docClose: 'true'
});


// refs.searchButton.setAttribute('disabled', true)

async function onSearch(evt) { 
 try {
  evt.preventDefault();
  // refs.searchButton.removeAttribute('disabled');
  
  newsApi.searchQueru = evt.currentTarget.searchQuery.value;
  console.log(newsApi.searchQueru);

  if(!newsApi.searchQueru){
        throw new Error()
      }
  newsApi.resetPage();
  refs.imgGallery.innerHTML = '';
  
  const hits = await newsApi.axiosRequest();
   console.log(hits);
  Notiflix.Loading.remove();
  appendMarkup(hits);
  // refs.searchButton.setAttribute('disabled', true);
  Notiflix.Notify.success(
    `Hooray! We found ${newsApi.totalHits} images.`,
    {
      timeout: 6000,
      width: '300px',
    },
  );
  }catch(e){
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 6000,
      width: '300px',
    },
  );
}
  
};

function onLoad(entries, observer){
  entries.forEach(entry => {
    // console.log(entries);
    // console.log(observer);
    if(entry.isIntersecting){
      Notiflix.Loading.standard({
        backgroundColor: 'rgba(0,0,0,0,1)',
      })
      
      newsApi.axiosRequest()
      .then(hits => {
        Notiflix.Loading.remove();
       appendMarkup(hits);
       
       if(newsApi.page === Math.ceil(newsApi.totalHits/newsApi.per_page +1)){
       
        Notiflix.Notify.failure(
          'We are sorry, but you have reached the end of search results.',
          {
            timeout: 10000,
            width: '300px',
          },
        );
        observer.unobserve(refs.guard);
       }
  })
    }
  })
}


function renderCard(arr) {
  return arr.map (({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
  ` <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags} 
     loading="lazy" />
    <div class="info">
    <p class="info-item">
    Likes
      <b>${likes}</b>
    </p>
    <p class="info-item">
    Views
      <b>${views}</b>
    </p>
    <p class="info-item">
    Comments
      <b>${comments}</b>
    </p>
    <p class="info-item">
    Downloads
      <b>${downloads}</b>
    </p>
  </div>
  </a>
</div>`).join('');

}



function appendMarkup(hits) {
  refs.imgGallery.insertAdjacentHTML('beforeend', renderCard(hits));
  gallery.refresh();
  
  observer.observe(refs.guard);

  const { height: cardHeight } = refs.imgGallery
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  }); 
  
 
}









