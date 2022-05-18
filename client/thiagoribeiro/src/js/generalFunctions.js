function deleteChildElements(element){
  //Faster to remove content than .innerHTML=""
  while (element.firstChild) {element.removeChild(element.lastChild);};
};

function removeActiveClassFromFavoriteMenu(){
  let favoriteItem = document.getElementById("favorites");

  favoriteItem.classList.remove("active");
}

function removeActiveClassFromCategoriesItems(){
  let categoriesListElement = document.getElementById("categories-list");
  let categoriesListElement_2 = document.getElementById("categories-list-2");
  
  for (let i=0; i < categoriesListElement.children.length; i++){
    categoriesListElement.children[i].classList.remove('active');
  }
  for (let i=0; i < categoriesListElement_2.children.length; i++){
    categoriesListElement_2.children[i].classList.remove('active');
  };
}

function titleLink(organizedNews){
  document.getElementById("title").onclick= function(){
    renderNews(organizedNews);
    addOrderBy(organizedNews);
    addSearch(organizedNews);
    
    removeActiveClassFromCategoriesItems();
    removeActiveClassFromFavoriteMenu();
  };
};