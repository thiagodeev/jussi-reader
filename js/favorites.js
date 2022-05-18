function favorites(allNewsInHTMLFormat){
  let favoriteItem = document.getElementById("favorites");

  favoriteItem.addEventListener("click", element => {
    removeActiveClassFromCategoriesItems();

    if(!element.currentTarget.classList.contains("active")){
      let favoritesNewsList = [];
      allNewsInHTMLFormat.forEach(news => {
        if(news.children[0].classList.contains("favorite")){
          favoritesNewsList.push(news);
        }
      });

      if(favoritesNewsList.length > 0){
        renderNews(favoritesNewsList);
        addOrderBy(favoritesNewsList);
        addSearch(favoritesNewsList);
      } else {
        addOrderBy(favoritesNewsList);
        addSearch(favoritesNewsList);
        document.getElementById("newsList").innerHTML = "<div class='error-container'><h2 class='error-message'>Você ainda não adicionou nenhum favorito</h2></div>";
        document.getElementById("pagination").innerHTML = "";
      }

      element.currentTarget.classList.add("active");
    };
  });
};

function offlineFavoritesFeature(allNewsInHTMLFormat){
  let indexesOfFavoritesNews = [];

  //checks if exist an offline favorites list
  if(!(JSON.parse(localStorage.getItem('indexesOfFavoritesNews')) === null)){
    indexesOfFavoritesNews = JSON.parse(localStorage.getItem('indexesOfFavoritesNews'));
  };

  for(let index = 0; index < allNewsInHTMLFormat.length; index++){
    let currentNews = allNewsInHTMLFormat[index];

    //verify if news was favorited in the last session
    if(indexesOfFavoritesNews.includes(index)){
      currentNews.firstChild.classList.add("favorite");

      //change favorite Icon to looking like was clicked
      currentNews.firstChild.firstChild.innerHTML = "<path d='M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z'></path>";
    }
    
    currentNews.firstChild.addEventListener("click", element => {
      let newsIndex = allNewsInHTMLFormat.indexOf(element.currentTarget.parentElement);

      if(element.currentTarget.classList.contains("favorite")){
        indexesOfFavoritesNews.push(newsIndex);
        console.log(indexesOfFavoritesNews);
      } else {
        indexesOfFavoritesNews.splice(indexesOfFavoritesNews.indexOf(newsIndex), 1);
        console.log(indexesOfFavoritesNews);
      }

      localStorage.setItem('indexesOfFavoritesNews', JSON.stringify(indexesOfFavoritesNews));
    });
  };
};