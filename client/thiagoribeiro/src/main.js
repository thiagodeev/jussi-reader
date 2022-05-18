newsURLs = [
  "https://jussi-reader.netlify.app/.netlify/functions/news-one",
  "https://jussi-reader.netlify.app/.netlify/functions/news-two",
];

async function fetchAPI (urlList){
  const newsList = [];
  let listOfAPIWithErrors = [];

  for await (const url of urlList) {
    try{
      const response = await fetch(url);
      const data = await response.json();
      newsList.push(data);
    }
    catch {
      listOfAPIWithErrors.push(url);
    }
  };

  if (listOfAPIWithErrors.length > 0){
    console.log(`Ocorreram erros de conexão na(s) seguinte(s) API(s): ${listOfAPIWithErrors}`)
  }

  return newsList;
};



async function main (){
  numberOfNewsPerPage = 6;

  const newsFromAPI = await fetchAPI(newsURLs);
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
};
main();

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

function deleteChildElements(element){
  //Faster to remove content than .innerHTML=""
  while (element.firstChild) {element.removeChild(element.lastChild);};
};

function titleLink(organizedNews){
  document.getElementById("title").onclick= function(){
    renderNews(organizedNews);
    addOrderBy(organizedNews);
    addSearch(organizedNews);
    
    //remove Active class from categories
    let categoriesListElement = document.getElementById("categories-list");
    let categoriesListElement_2 = document.getElementById("categories-list-2");
    
    for (let i=0; i < categoriesListElement.children.length; i++){
      categoriesListElement.children[i].classList.remove('active');
    }
    for (let i=0; i < categoriesListElement_2.children.length; i++){
      categoriesListElement_2.children[i].classList.remove('active');
    }
  }
}

function addNewAPI(){
  let input = document.getElementById("input-api-link");
  let button = document.getElementById("submit-api-button");
  let APILink = "";
  
  button.addEventListener("click", element => {
    element.preventDefault();
    

    APILink = input.value;
    console.log(input.value);
    newsURLs.push(APILink);
    console.log(newsURLs);
    main();
  }, {once : true});
}
function getAllNewsOf (newsFromAPI) {
  let allNews = [];

  for (let newsLists of newsFromAPI){
    Object.entries(newsLists).forEach(([key, value]) => {
      allNews.push(...value);
    });
  };

  return allNews;
};

function divideTheArray(arrayToDivide){
  let tempArray = Array.from(arrayToDivide);
  let organizedNewsList = [];
  
  while (tempArray.length) {
    organizedNewsList.push(tempArray.splice(0, numberOfNewsPerPage));
  }

  return organizedNewsList;
};

function makeFavoriteElement(){
  let favoriteElement = document.createElement("span");
  favoriteElement.classList.add("newsList__news__favorite");
  
  let defaultPath = "<path d='M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z'></path>";
  let clickedPath = "<path d='M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z'></path>";


  let SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  SVGElement.setAttribute("viewBox", "0 0 36 32");

  SVGElement.innerHTML = defaultPath;
  favoriteElement.append(SVGElement);

  favoriteElement.addEventListener("click", element => {
    element.currentTarget.classList.toggle("favorite");
    let theSVGElement = element.currentTarget.firstChild;

    if(element.currentTarget.classList.contains("favorite")){
      theSVGElement.innerHTML = clickedPath;
    } else {
      theSVGElement.innerHTML = defaultPath;
    }
  });

  return favoriteElement;
}

function returnAListOfCategories(listOfCategories){
  let divCategoriesList = document.createElement("div");
  divCategoriesList.classList.add("newsList__news__categories");

  let headerCategorieList = document.getElementById("categories-list");
  let headerCategorieList_2 = document.getElementById("categories-list-2");
  let categorieElement;

  for (let categorie of listOfCategories){
    categorieElement = document.createElement("span");
    categorieElement.innerText = categorie.name;

    categorieElement.addEventListener("click", element => {
      //pass through both clategories lists
      for (let headerCategorie of headerCategorieList.children){
        if(headerCategorie.innerText == categorie.name){
          headerCategorie.click();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          for (let headerCategorie of headerCategorieList_2.children){
            if(headerCategorie.innerText == categorie.name){
              headerCategorie.click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          };
        }
      };
    });

    divCategoriesList.append(categorieElement);
  }

  return divCategoriesList;
};

function newsTemplate(newsList){
  let element;

  //settings to correctly show the dates
  let date = new Date(newsList.date_published);
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  //reduces the number of characters in the Excerpt
  let excerpt = (function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  })(newsList.excerpt, 75);

  let divCategoriesList = returnAListOfCategories(newsList.categories);
  let favoriteElement = makeFavoriteElement();


  element = document.createElement("div");
  element.classList.add("newsList__news");
  element.innerHTML = `
    
    <img class="newsList__news__image" src="${newsList.image}" onerror="this.onerror=null; this.src='assets/image-placeholder.jpg'" alt="">
    <h2 class="newsList__news__title">${newsList.title}</h2>
    <p class="newsList__news__date_published">${date.toLocaleDateString("pt-BR", options)}</p>
    <p class="newsList__news__excerpt">${excerpt}</p>
  `;
  element.prepend(favoriteElement);
  element.append(divCategoriesList);

  // <span class="newsList__news__favorite"><svg viewBox="0 0 36 32"><path d="M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z"></path></svg></span> 
  
  element.addEventListener("click", element => {
    if((element.target.localName != "span") && (element.target.localName != "svg") && (element.target.localName != "path")){
      window.location.href = newsList.url;
    }
  });

  return element;
};

function renderNewsOnHTML(organizedNews, currentPage = 0){
  deleteChildElements(document.getElementById("newsList"));

  organizedNews[currentPage].forEach(news => {
    document.getElementById("newsList").append(news);
  });
};

function createsHTMLNewsFrom(listToConvert){
  let listWithHTMLElements = [];

  listToConvert.forEach(element => {
    listWithHTMLElements.push(newsTemplate(element));
  });

  return listWithHTMLElements;
};
  function writePagination(organizedNews){
    let paginationElement = document.getElementById("pagination");
    let paginationItem, paginationNumber;

    //removes previous paginations
    deleteChildElements(paginationElement);

    for (let index=0; index < organizedNews.length; index++){
      paginationNumber = index + 1;

      //creates the pagination item
      paginationItem = document.createElement("div");
      paginationItem.setAttribute("data-pagination", index);
      paginationItem.innerText = paginationNumber;

      //adds the click event
      paginationItem.addEventListener("click", element => {
        if(!element.currentTarget.classList.contains("active")){
          window.scrollTo({ top: 0, behavior: 'smooth' });
          //removes the class Active from all pagination items 
          for (let i=0; i < paginationElement.children.length; i++){
            paginationElement.children[i].removeAttribute('class');
          }

          //write the page on HTML
          renderNewsOnHTML(organizedNews, element.currentTarget.dataset.pagination);

          //adds the Active class to current clicked element
          element.currentTarget.classList.add("active");
        }
      });
      paginationElement.append(paginationItem);
    }
    paginationElement.firstChild.classList.add("active")
  }
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

        //removes the class Active from all categories items 
        for (let i=0; i < categoriesListElement.children.length; i++){
          categoriesListElement.children[i].classList.remove('active');
        }
        for (let i=0; i < categoriesListElement_2.children.length; i++){
          categoriesListElement_2.children[i].classList.remove('active');
        }
        
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
};

//////////// see all categories //////////////
isTheSeeAllCategoriesEventAddedForTheFirstTime = false;

function seeAllCategories(){
  let toggleButton = document.getElementById("show-all-categories");
  let categoriesWrapper =document.getElementById("categories-wrapper");
  //reset when called again
  toggleButton.innerText = "Ver mais";
  categoriesWrapper.classList.remove("show-list");

  //checks if the event has not been added yet
  if (!isTheSeeAllCategoriesEventAddedForTheFirstTime){
    //trick to access this value inside event function
    toggleButton.categoriesWrapper = categoriesWrapper;

    toggleButton.addEventListener("click", seeAllCategoriesEvent);

    isTheSeeAllCategoriesEventAddedForTheFirstTime = true;
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
isTheDataEventAddedForTheFirstTime = false;
isTheTitleEventAddedForTheFirstTime = false;

function dataEvent(element){
  document.getElementById("orderByTitle").removeAttribute('class');

  if(!element.currentTarget.classList.contains("active")){
    renderNews(element.currentTarget.elementToRender);
    
    element.currentTarget.classList.add("active");
  };
}

function titleEvent(element){
  document.getElementById("orderByDate").removeAttribute('class');

  if(!element.currentTarget.classList.contains("active")){
    renderNews(element.currentTarget.elementToRender);
    
    element.currentTarget.classList.add("active");
  };
}

//********** title **********//
function orderByTitle(newsList){
  let ordenedList = Array.from(newsList).sort((a, b) => {
    let x = a.getElementsByClassName("newsList__news__title")[0].innerText.toUpperCase();
    let y = b.getElementsByClassName("newsList__news__title")[0].innerText.toUpperCase();

    return x < y ? -1 : 1;
  });

  return ordenedList;
};

function renderHTMLListOrderedByTitle(elementToRender){
  let orderByTitleElement = document.getElementById("orderByTitle");
  orderByTitleElement.removeAttribute('class');

  orderByTitleElement.elementToRender = elementToRender;

  if(isTheTitleEventAddedForTheFirstTime){
    orderByTitleElement.removeEventListener('click', titleEvent, true);
  }

  orderByTitleElement.addEventListener("click", titleEvent, true);

  isTheTitleEventAddedForTheFirstTime = true;
};

//********** date **********//
function orderByDate(newsList){
  let ordenedList = Array.from(newsList).sort((a, b) => {
    let x = a.getElementsByClassName("newsList__news__date_published")[0].innerText
    let y = b.getElementsByClassName("newsList__news__date_published")[0].innerText

    return x > y ? -1 : 1;
  });

  return ordenedList;
};

function renderHTMLListOrderedByDate(elementToRender){
  let orderByDateElement = document.getElementById("orderByDate");
  orderByDateElement.removeAttribute('class');

  orderByDateElement.elementToRender = elementToRender;

  if(isTheDataEventAddedForTheFirstTime){
    orderByDateElement.removeEventListener('click', dataEvent, true);
  }
  orderByDateElement.addEventListener("click", dataEvent, true);

  isTheDataEventAddedForTheFirstTime = true;
};

//********** title and date **********//
function addOrderBy(elementToRender){
  let HTMLnewsOrganizedByTitle = orderByTitle(elementToRender);
  let HTMLnewsOrganizedByDate = orderByDate(elementToRender);

  renderHTMLListOrderedByTitle(HTMLnewsOrganizedByTitle);
  renderHTMLListOrderedByDate(HTMLnewsOrganizedByDate);
}
function favorites(allNewsInHTMLFormat){
  let favoriteItem = document.getElementById("favorites");
  let favoritesNewsList = [];
  let favoriteNews;

  favoriteItem.addEventListener("click", element => {
    favoritesNewsList = [];
    allNewsInHTMLFormat.forEach(news => {
      if(news.children[0].classList.contains("favorite")){
        favoritesNewsList.push(news);
      }
    });

    renderNews(favoritesNewsList);
    addOrderBy(favoritesNewsList);
    addSearch(favoritesNewsList);

    console.log(favoritesNewsList)
  });
}
isTheSearchEventAddedForTheFirstTime = false;

function searchEvent(input){
  input.target.searchResult = [];
  //get input value and remove white spaces
  let valueOfInput = input.target.value.replace(/\s+/g, '').toUpperCase();

  input.target.allNewsInHTMLFormat.forEach(element => {
    //get title value and remove white spaces
    let newsTitle = element.getElementsByClassName("newsList__news__title")[0].innerText.replace(/\s+/g, '').toUpperCase();
    
    if (newsTitle.indexOf(valueOfInput) > -1){
      input.target.searchResult.push(element);
    };
  });
  if(input.target.searchResult.length > 0){
    renderNews(input.target.searchResult);
    addOrderBy(input.target.searchResult);
  } else {
    document.getElementById("newsList").innerHTML = "<h2 class='search-error'>Nenhum resultado encontrado :/</h2>";
    document.getElementById("pagination").innerHTML = "";
  }
}

function addSearch(allNewsInHTMLFormat){
  let input = document.getElementById("searchbar");
  let searchResult = [];

  input.allNewsInHTMLFormat = allNewsInHTMLFormat;
  input.searchResult = searchResult;
  
  if(isTheSearchEventAddedForTheFirstTime){
    input.removeEventListener('input', searchEvent, true);
  }

  input.addEventListener("input", searchEvent, true);

  isTheSearchEventAddedForTheFirstTime = true;
};