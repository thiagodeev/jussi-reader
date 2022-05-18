async function getAPINews(){
  let newsOffline = JSON.parse(localStorage.getItem('newsFromAPI'));

  if(newsOffline === null){
    const newsFromAPI = await fetchAPI(newsURLs);

    //save the news offline
    localStorage.setItem('newsFromAPI', JSON.stringify(newsFromAPI));

    return newsFromAPI;
  } else {
    const newsFromAPI = newsOffline;
    return newsFromAPI;
  }
};