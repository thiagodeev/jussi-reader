async function main (){
  numberOfNewsPerPage = 6;

  newsFromAPI = await getAPINews();
  const allAPINews = getAllNewsOf(newsFromAPI);
  allNewsInHTMLFormat = createsHTMLNewsFrom(allAPINews);

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


  //save the news offline
  localStorage.setItem('newsFromAPI', JSON.stringify(newsFromAPI));
};

//just executes when DOM is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  main();
});

// window.addEventListener('load', (event) => {
//   addNewAPI()
//   console.log("load");
// });

// document.addEventListener('readystatechange', (event) => {
//   for( let i = 0; i < 2000000000; i++)
// {}
// console.log("readystate" + document.readyState);
// });

// document.addEventListener('DOMContentLoaded', (event) => {
//   for( let i = 0; i < 2000000000; i++)
// {}
// console.log("DOMContentLoaded");
// });
