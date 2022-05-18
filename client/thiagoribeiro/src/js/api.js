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

function addNewAPI(){
  let input = document.getElementById("input-api-link");
  let button = document.getElementById("submit-api-button");
  let APILink = "";
  
  button.addEventListener("click", async element => {
    element.preventDefault();
    
    APILink = input.value;
    newsURLs.push(APILink);
    
    const newsFromAPI = await fetchAPI(newsURLs);
    //update the offline news list
    localStorage.setItem('newsFromAPI', JSON.stringify(newsFromAPI));
    main();
    //clean input
    input.value = "";
  }, {once : true});
};