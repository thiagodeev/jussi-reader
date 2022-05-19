loadingAnimation = function loadingAnimation(){
  document.body.classList.toggle("loading-overflow");
  document.getElementById("body-wrapper").classList.toggle("visibility-off");
  document.getElementById("loading").classList.toggle("visibility-on");
};

async function main (){
  numberOfNewsPerPage = 6;

  newsFromAPI = await getAPINews();
  const allAPINewsInOneList = getAllNewsOf(newsFromAPI);
  allNewsInHTMLFormat = createsHTMLNewsFrom(allAPINewsInOneList);

  offlineFavoritesFeature(allNewsInHTMLFormat);

  renderNews = function (arrayToRender){
    const organizedNews = divideTheArray(arrayToRender, numberOfNewsPerPage);
    renderNewsOnHTML(organizedNews);
    writePagination(organizedNews);
  };

  renderNews(allNewsInHTMLFormat);
  addOrderBy(allNewsInHTMLFormat);
  addSearch(allNewsInHTMLFormat);
  favorites(allNewsInHTMLFormat);

  //categories
  renderCategorieList(createsCategoriesObject(allNewsInHTMLFormat));
  seeAllCategories();
  
  //add title click event 
  titleLink(allNewsInHTMLFormat);
  //add functionality to input API
  addNewAPI();

  //scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  //save the news list offline
  localStorage.setItem('newsFromAPI', JSON.stringify(newsFromAPI));
};
main();


window.addEventListener('load', (event) => {
  loadingAnimation()
});