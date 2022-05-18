isTheDataEventAddedForTheFirstTime = true;
isTheTitleEventAddedForTheFirstTime = true;

function dataEvent(element){
  document.getElementById("orderByTitle").removeAttribute('class');

  if(!element.currentTarget.classList.contains("active")){
    if(element.currentTarget.elementToRender.length > 0){
      renderNews(element.currentTarget.elementToRender);
    }
    
    element.currentTarget.classList.add("active");
  };
}

function titleEvent(element){
  document.getElementById("orderByDate").removeAttribute('class');

  if(!element.currentTarget.classList.contains("active")){
    if(element.currentTarget.elementToRender.length > 0){
      renderNews(element.currentTarget.elementToRender);
    }
    
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

  if(!isTheTitleEventAddedForTheFirstTime){
    orderByTitleElement.removeEventListener('click', titleEvent, true);
  }

  orderByTitleElement.addEventListener("click", titleEvent, true);

  isTheTitleEventAddedForTheFirstTime = false;
};

//********** date **********//
function orderByDate(newsList){
  let ordenedList = Array.from(newsList).sort((a, b) => {
    let x = a.getElementsByClassName("newsList__news__date_published")[0].innerText;
    let y = b.getElementsByClassName("newsList__news__date_published")[0].innerText;

    return x > y ? -1 : 1;
  });

  return ordenedList;
};

function renderHTMLListOrderedByDate(elementToRender){
  let orderByDateElement = document.getElementById("orderByDate");
  orderByDateElement.removeAttribute('class');

  orderByDateElement.elementToRender = elementToRender;

  if(!isTheDataEventAddedForTheFirstTime){
    orderByDateElement.removeEventListener('click', dataEvent, true);
  }
  orderByDateElement.addEventListener("click", dataEvent, true);

  isTheDataEventAddedForTheFirstTime = false;
};

//********** title and date **********//
function addOrderBy(elementToRender){
  let HTMLnewsOrganizedByTitle = orderByTitle(elementToRender);
  let HTMLnewsOrganizedByDate = orderByDate(elementToRender);

  renderHTMLListOrderedByTitle(HTMLnewsOrganizedByTitle);
  renderHTMLListOrderedByDate(HTMLnewsOrganizedByDate);
}