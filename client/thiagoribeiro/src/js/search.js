isTheSearchEventAddedForTheFirstTime = true;

function searchEvent(input){
  if(input.currentTarget.allNewsInHTMLFormat.length > 0){
    input.currentTarget.searchResult = [];
    //get input value and remove white spaces
    let valueOfInput = input.currentTarget.value.replace(/\s+/g, '').toUpperCase();
  
    input.currentTarget.allNewsInHTMLFormat.forEach(element => {
      //get title value and remove white spaces
      let newsTitle = element.getElementsByClassName("newsList__news__title")[0].innerText.replace(/\s+/g, '').toUpperCase();
      
      if (newsTitle.indexOf(valueOfInput) > -1){
        input.currentTarget.searchResult.push(element);
      };
    });
    if(input.currentTarget.searchResult.length > 0){
      renderNews(input.currentTarget.searchResult);
      addOrderBy(input.currentTarget.searchResult);
    } else {
      document.getElementById("newsList").innerHTML = "<div class='error-container'><h2 class='error-message'>Nenhum resultado encontrado :/</div></h2>";
      document.getElementById("pagination").innerHTML = "";
    }
  }
}

function addSearch(allNewsInHTMLFormat){
  let input = document.getElementById("searchbar");
  let searchResult = [];

  input.allNewsInHTMLFormat = allNewsInHTMLFormat;
  input.searchResult = searchResult;
  
  if(!isTheSearchEventAddedForTheFirstTime){
    input.removeEventListener('input', searchEvent, true);
  }

  input.addEventListener("input", searchEvent, true);

  isTheSearchEventAddedForTheFirstTime = false;
};