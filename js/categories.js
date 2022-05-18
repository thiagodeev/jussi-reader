function createsCategoriesObject(listOfNews){

  let categoriesObject = {
    "Sem Categoria": []
  };

  listOfNews.forEach(element => {
    let categoriesList = element.getElementsByClassName("newsList__news__categories")[0];

    if(categoriesList.childElementCount == 0){
      categoriesObject["Sem Categoria"].push(element);

    } else {
      Array.from(categoriesList.children).forEach(categorieElement => {
        let categorie = categorieElement.innerText;

        if(!categoriesObject.hasOwnProperty(categorie)){
          categoriesObject[categorie] = [];
          categoriesObject[categorie].push(element);
        } else {
          categoriesObject[categorie].push(element);
        }
      });
    }
  })
  // console.log(categoriesObject)
  return categoriesObject;
}

function renderCategorieList(categoriesObject){
  let categoriesListElement = document.getElementById("categories-list");
  let categoriesListElement_2 = document.getElementById("categories-list-2");
  let listCounter = 0;

  //delete all existing categories items
  deleteChildElements(categoriesListElement);
  deleteChildElements(categoriesListElement_2);

  Object.entries(categoriesObject).forEach(([key, value]) => {
    listCounter++;

    //create <a> tag
    let categorieItemAnchor = document.createElement("a");
    categorieItemAnchor.setAttribute("href", "#");
    categorieItemAnchor.innerText = key;
    //create <li> tag and append the <a>
    let categorieItem = document.createElement("li");
    categorieItem.classList.add("flex-item");
    categorieItem.append(categorieItemAnchor);


    categorieItem.addEventListener("click", element => {
      if(!element.currentTarget.classList.contains("active")){
        // console.log(categorieElements)

        removeActiveClassFromCategoriesItems();
        removeActiveClassFromFavoriteMenu();
        
        //write the page on HTML
        renderNews(value);
        addOrderBy(value);
        addSearch(value)

        //adds the Active class to current clicked element
        element.currentTarget.classList.add("active");
      }
    });

    if(listCounter <= 3){
      categoriesListElement.append(categorieItem);
    } else {
      categoriesListElement_2.append(categorieItem);
    }
  });

  let categoriesLabel = document.createElement("p");
  categoriesLabel.innerText = "Categorias:";
  categoriesListElement.prepend(categoriesLabel);
};

//////////// see all categories //////////////
isTheSeeAllCategoriesEventAddedForTheFirstTime = true;

function seeAllCategories(){
  let toggleButton = document.getElementById("show-all-categories");
  let categoriesWrapper =document.getElementById("categories-wrapper");
  //reset when called again
  toggleButton.innerText = "Ver mais";
  categoriesWrapper.classList.remove("show-list");

  //checks if the event has not been added yet
  if (isTheSeeAllCategoriesEventAddedForTheFirstTime){
    //trick to access this value inside event function
    toggleButton.categoriesWrapper = categoriesWrapper;

    toggleButton.addEventListener("click", seeAllCategoriesEvent);

    isTheSeeAllCategoriesEventAddedForTheFirstTime = false;
  }
};

function seeAllCategoriesEvent(toggleButton){
  toggleButton.target.categoriesWrapper.classList.toggle("show-list");

  if(toggleButton.target.categoriesWrapper.classList.contains("show-list")){
    toggleButton.target.innerText = "Ocultar";
  } else {
    toggleButton.target.innerText = "Ver mais";
  }
};