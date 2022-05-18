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
    };
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
  
  element.addEventListener("click", element => {
    if((element.target.localName != "span") && (element.target.localName != "svg") && (element.target.localName != "path")){
      window.location.href = newsList.url;
    }
  });

  return element;
};

function renderNewsOnHTML(organizedNews, currentPage = 0){
  let newsListDiv = document.getElementById("newsList");

  if(newsListDiv.childElementCount > 0){
    deleteChildElements(newsListDiv);
  }

  organizedNews[currentPage].forEach(news => {
    newsListDiv.append(news);
  });
};

function createsHTMLNewsFrom(listToConvert){
  let listWithHTMLElements = [];

  listToConvert.forEach(element => {
    listWithHTMLElements.push(newsTemplate(element));
  });

  return listWithHTMLElements;
};