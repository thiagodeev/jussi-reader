async function fetchAPI(e){const t=[];let n=[];for await(const r of e)try{const e=await fetch(r),s=await e.json();t.push(s)}catch{n.push(r)}return n.length>0&&console.log(`Ocorreram erros de conexão na(s) seguinte(s) API(s): ${n}`),t}function addNewAPI(){let e=document.getElementById("input-api-link"),t=document.getElementById("submit-api-button"),n="";t.addEventListener("click",async t=>{t.preventDefault(),loadingAnimation(),n=e.value,newsURLs.push(n);const r=await fetchAPI(newsURLs);localStorage.setItem("newsFromAPI",JSON.stringify(r)),main(),loadingAnimation(),e.value=""},{once:!0})}async function main(){numberOfNewsPerPage=6,newsFromAPI=await getAPINews();const e=getAllNewsOf(newsFromAPI);allNewsInHTMLFormat=createsHTMLNewsFrom(e),offlineFavoritesFeature(allNewsInHTMLFormat),renderNews=function(e){const t=divideTheArray(e,numberOfNewsPerPage);renderNewsOnHTML(t),writePagination(t)},renderNews(allNewsInHTMLFormat),addOrderBy(allNewsInHTMLFormat),addSearch(allNewsInHTMLFormat),favorites(allNewsInHTMLFormat),renderCategorieList(createsCategoriesObject(allNewsInHTMLFormat)),seeAllCategories(),titleLink(allNewsInHTMLFormat),addNewAPI(),window.scrollTo({top:0,behavior:"smooth"}),localStorage.setItem("newsFromAPI",JSON.stringify(newsFromAPI))}async function getAPINews(){let e=JSON.parse(localStorage.getItem("newsFromAPI"));if(null===e){const e=await fetchAPI(newsURLs);return localStorage.setItem("newsFromAPI",JSON.stringify(e)),e}return e}function deleteChildElements(e){for(;e.firstChild;)e.removeChild(e.lastChild)}function removeActiveClassFromFavoriteMenu(){document.getElementById("favorites").classList.remove("active")}function removeActiveClassFromCategoriesItems(){let e=document.getElementById("categories-list"),t=document.getElementById("categories-list-2");for(let t=0;t<e.children.length;t++)e.children[t].classList.remove("active");for(let e=0;e<t.children.length;e++)t.children[e].classList.remove("active")}function titleLink(e){document.getElementById("title").onclick=function(){renderNews(e),addOrderBy(e),addSearch(e),removeActiveClassFromCategoriesItems(),removeActiveClassFromFavoriteMenu()}}function getAllNewsOf(e){let t=[];for(let n of e)Object.entries(n).forEach(([e,n])=>{t.push(...n)});return t}function divideTheArray(e){let t=Array.from(e),n=[];for(;t.length;)n.push(t.splice(0,numberOfNewsPerPage));return n}function makeFavoriteElement(){let e=document.createElement("span");e.classList.add("newsList__news__favorite");let t="<path d='M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z'></path>",n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 36 32"),n.innerHTML=t,e.append(n),e.addEventListener("click",e=>{e.currentTarget.classList.toggle("favorite");let n=e.currentTarget.firstChild;e.currentTarget.classList.contains("favorite")?n.innerHTML="<path d='M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z'></path>":n.innerHTML=t}),e}function returnAListOfCategories(e){let t=document.createElement("div");t.classList.add("newsList__news__categories");let n,r=document.getElementById("categories-list"),s=document.getElementById("categories-list-2");for(let i of e)(n=document.createElement("span")).innerText=i.name,n.addEventListener("click",e=>{for(let e of r.children)if(e.innerText==i.name)e.click(),window.scrollTo({top:0,behavior:"smooth"});else for(let e of s.children)e.innerText==i.name&&(e.click(),window.scrollTo({top:0,behavior:"smooth"}))}),t.append(n);return t}function newsTemplate(e){let t,n=new Date(e.date_published),r=(s=e.excerpt,i=75,s.length<=i?s:s.slice(0,i)+"...");var s,i;let a=returnAListOfCategories(e.categories),l=makeFavoriteElement();return(t=document.createElement("div")).classList.add("newsList__news"),t.innerHTML=`\n    <img class="newsList__news__image" src="${e.image}" onerror="this.onerror=null; this.src='assets/image-placeholder.jpg'" alt="">\n    <h2 class="newsList__news__title">${e.title}</h2>\n    <p class="newsList__news__date_published">${n.toLocaleDateString("pt-BR",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}</p>\n    <p class="newsList__news__excerpt">${r}</p>\n  `,t.prepend(l),t.append(a),t.addEventListener("click",t=>{"span"!=t.target.localName&&"svg"!=t.target.localName&&"path"!=t.target.localName&&(window.location.href=e.url)}),t}function renderNewsOnHTML(e,t=0){let n=document.getElementById("newsList");n.childElementCount>0&&deleteChildElements(n),e[t].forEach(e=>{n.append(e)})}function createsHTMLNewsFrom(e){let t=[];return e.forEach(e=>{t.push(newsTemplate(e))}),t}function writePagination(e){let t,n,r=document.getElementById("pagination");deleteChildElements(r);for(let s=0;s<e.length;s++)n=s+1,(t=document.createElement("div")).setAttribute("data-pagination",s),t.innerText=n,t.addEventListener("click",t=>{if(!t.currentTarget.classList.contains("active")){window.scrollTo({top:0,behavior:"smooth"});for(let e=0;e<r.children.length;e++)r.children[e].removeAttribute("class");renderNewsOnHTML(e,t.currentTarget.dataset.pagination),t.currentTarget.classList.add("active")}}),r.append(t);r.firstChild.classList.add("active")}function createsCategoriesObject(e){let t={"Sem Categoria":[]};return e.forEach(e=>{let n=e.getElementsByClassName("newsList__news__categories")[0];0==n.childElementCount?t["Sem Categoria"].push(e):Array.from(n.children).forEach(n=>{let r=n.innerText;t.hasOwnProperty(r)?t[r].push(e):(t[r]=[],t[r].push(e))})}),t}function renderCategorieList(e){let t=document.getElementById("categories-list"),n=document.getElementById("categories-list-2"),r=0;deleteChildElements(t),deleteChildElements(n),Object.entries(e).forEach(([e,s])=>{r++;let i=document.createElement("a");i.setAttribute("href","#"),i.innerText=e;let a=document.createElement("li");a.classList.add("flex-item"),a.append(i),a.addEventListener("click",e=>{e.currentTarget.classList.contains("active")||(removeActiveClassFromCategoriesItems(),removeActiveClassFromFavoriteMenu(),renderNews(s),addOrderBy(s),addSearch(s),e.currentTarget.classList.add("active"))}),r<=3?t.append(a):n.append(a)});let s=document.createElement("p");s.innerText="Categorias:",t.prepend(s)}function seeAllCategories(){let e=document.getElementById("show-all-categories"),t=document.getElementById("categories-wrapper");e.innerText="Ver mais",t.classList.remove("show-list"),isTheSeeAllCategoriesEventAddedForTheFirstTime&&(e.categoriesWrapper=t,e.addEventListener("click",seeAllCategoriesEvent),isTheSeeAllCategoriesEventAddedForTheFirstTime=!1)}function seeAllCategoriesEvent(e){e.target.categoriesWrapper.classList.toggle("show-list"),e.target.categoriesWrapper.classList.contains("show-list")?e.target.innerText="Ocultar":e.target.innerText="Ver mais"}function dataEvent(e){document.getElementById("orderByTitle").removeAttribute("class"),e.currentTarget.classList.contains("active")||(e.currentTarget.elementToRender.length>0&&renderNews(e.currentTarget.elementToRender),e.currentTarget.classList.add("active"))}function titleEvent(e){document.getElementById("orderByDate").removeAttribute("class"),e.currentTarget.classList.contains("active")||(e.currentTarget.elementToRender.length>0&&renderNews(e.currentTarget.elementToRender),e.currentTarget.classList.add("active"))}function orderByTitle(e){return Array.from(e).sort((e,t)=>{return e.getElementsByClassName("newsList__news__title")[0].innerText.toUpperCase()<t.getElementsByClassName("newsList__news__title")[0].innerText.toUpperCase()?-1:1})}function renderHTMLListOrderedByTitle(e){let t=document.getElementById("orderByTitle");t.removeAttribute("class"),t.elementToRender=e,isTheTitleEventAddedForTheFirstTime||t.removeEventListener("click",titleEvent,!0),t.addEventListener("click",titleEvent,!0),isTheTitleEventAddedForTheFirstTime=!1}function orderByDate(e){return Array.from(e).sort((e,t)=>{return e.getElementsByClassName("newsList__news__date_published")[0].innerText>t.getElementsByClassName("newsList__news__date_published")[0].innerText?-1:1})}function renderHTMLListOrderedByDate(e){let t=document.getElementById("orderByDate");t.removeAttribute("class"),t.elementToRender=e,isTheDataEventAddedForTheFirstTime||t.removeEventListener("click",dataEvent,!0),t.addEventListener("click",dataEvent,!0),isTheDataEventAddedForTheFirstTime=!1}function addOrderBy(e){let t=orderByTitle(e),n=orderByDate(e);renderHTMLListOrderedByTitle(t),renderHTMLListOrderedByDate(n)}function favorites(e){document.getElementById("favorites").addEventListener("click",t=>{if(removeActiveClassFromCategoriesItems(),!t.currentTarget.classList.contains("active")){let n=[];e.forEach(e=>{e.children[0].classList.contains("favorite")&&n.push(e)}),n.length>0?(renderNews(n),addOrderBy(n),addSearch(n)):(addOrderBy(n),addSearch(n),document.getElementById("newsList").innerHTML="<div class='error-container'><h2 class='error-message'>Você ainda não adicionou nenhum favorito</h2></div>",document.getElementById("pagination").innerHTML=""),t.currentTarget.classList.add("active")}})}function offlineFavoritesFeature(e){let t=[];null!==JSON.parse(localStorage.getItem("indexesOfFavoritesNews"))&&(t=JSON.parse(localStorage.getItem("indexesOfFavoritesNews")));for(let n=0;n<e.length;n++){let r=e[n];t.includes(n)&&(r.firstChild.classList.add("favorite"),r.firstChild.firstChild.innerHTML="<path d='M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z'></path>"),r.firstChild.addEventListener("click",n=>{let r=e.indexOf(n.currentTarget.parentElement);n.currentTarget.classList.contains("favorite")?t.push(r):t.splice(t.indexOf(r),1),localStorage.setItem("indexesOfFavoritesNews",JSON.stringify(t))})}}function searchEvent(e){if(e.currentTarget.allNewsInHTMLFormat.length>0){e.currentTarget.searchResult=[];let t=e.currentTarget.value.replace(/\s+/g,"").toUpperCase();e.currentTarget.allNewsInHTMLFormat.forEach(n=>{n.getElementsByClassName("newsList__news__title")[0].innerText.replace(/\s+/g,"").toUpperCase().indexOf(t)>-1&&e.currentTarget.searchResult.push(n)}),e.currentTarget.searchResult.length>0?(renderNews(e.currentTarget.searchResult),addOrderBy(e.currentTarget.searchResult)):(document.getElementById("newsList").innerHTML="<div class='error-container'><h2 class='error-message'>Nenhum resultado encontrado :/</div></h2>",document.getElementById("pagination").innerHTML="")}}function addSearch(e){let t=document.getElementById("searchbar");t.allNewsInHTMLFormat=e,t.searchResult=[],isTheSearchEventAddedForTheFirstTime||t.removeEventListener("input",searchEvent,!0),t.addEventListener("input",searchEvent,!0),isTheSearchEventAddedForTheFirstTime=!1}newsURLs=["https://jussi-reader.netlify.app/.netlify/functions/news-one","https://jussi-reader.netlify.app/.netlify/functions/news-two"],loadingAnimation=function(){document.body.classList.toggle("loading-overflow"),document.getElementById("body-wrapper").classList.toggle("visibility-off"),document.getElementById("loading").classList.toggle("visibility-on")},main(),window.addEventListener("load",e=>{loadingAnimation()}),isTheSeeAllCategoriesEventAddedForTheFirstTime=!0,isTheDataEventAddedForTheFirstTime=!0,isTheTitleEventAddedForTheFirstTime=!0,isTheSearchEventAddedForTheFirstTime=!0;