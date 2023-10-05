import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export default class NewsApi {
  constructor() {
    this.searchQueru = '';
    this.page = 1;
    this.totalHits = 1;
    this.per_page = 40;
  }

  // axiosRequest() {
  //   const BASE_URL = 'https://pixabay.com/api/';
  //   const keyApi = '39533790-85df6cbf34193d8f2f0ca09de';

  //   const queryParameters = {
  //     'key': keyApi,
  //     'q' : this.searchQueru,
  //     'image_type': 'photo',
  //     'orientation': 'horizontal',
  //     'safesearch': 'true',
  //     'per_page': this.per_page,
  //     'page': this.page,
  //     // 'order': 'latest',
  //   };
  
  //   return axios.get(BASE_URL, {
  //     params: queryParameters,
  //   })
  //   .then( (response)=> {
  //     return response.data})
  //   .then(data => {
  //     this.incrementPage();
  //     this.totalHits = data.totalHits;

  //     return data.hits;
  //   })    
  // };

  async axiosRequest() {
    
    const BASE_URL = 'https://pixabay.com/api/';
    const keyApi = '39533790-85df6cbf34193d8f2f0ca09de';

    const queryParameters = {
      'key': keyApi,
      'q' : this.searchQueru,
      'image_type': 'photo',
      'orientation': 'horizontal',
      'safesearch': 'true',
      'per_page': this.per_page,
      'page': this.page,
      // 'order': 'latest',
    };
  
    const response = await axios.get(BASE_URL, {
      params: queryParameters,
    });
    
    const data =   response.data;
    this.incrementPage();
    this.totalHits = data.totalHits;
    return data.hits;
       
  };

  incrementPage() {
    this.page += 1;
  };

  resetPage() {
    this.page = 1;
  };

  // get query() {
  //   return this.searchQueru;
  // };

  // set query (newQwuery) {
  //   this.searchQueru = newQwuery;
  // }
}






