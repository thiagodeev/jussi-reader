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

//just executes when DOM is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  main();
});


// for( let i = 0; i < 2000000000; i++)
// {}


// window.addEventListener('load', (event) => {
//   for( let i = 0; i < 2000000000; i++)
// {}
//   console.log("load");
// });

// document.addEventListener('readystatechange', (event) => {
//   console.log("readystate" + document.readyState);
//   for( let i = 0; i < 2000000000; i++)
// {}
//   console.log("readystate" + document.readyState);
// });

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log("DOMContentLoaded");
// });
