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