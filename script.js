const apiKey = 'bn6dSO8V63p0eUpE1rt3cwkUNM6sznbfwRSZ2U4k';
const searchURL = 'https://developer.nps.gov/api/v1/parks'


function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson){
  console.log(responseJson);
  $('#loading').empty();
  $('#resultsList').empty();
  $('#results').removeClass('hidden');
  for (let i = 0; i < responseJson.data.length; i++){
    $('#resultsList').append(
      `<li><h2>${responseJson.data[i].name}</h2>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].name}</a>
      </li>`
    )};
}


function getResults(stateName, maxResults){
  const params = {
    api_key: apiKey,
    stateCode: stateName,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  
  fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err=> {$('#error').html(`<p>Something went wrong :(</p><p>Make sure you're connected to the internet.</p>`);
  });
}



function watchForm(){
  $('form').submit(event =>{
    event.preventDefault();
    const stateName = $('#stateNameID').val();
    const maxResults = $('#maxResultsID').val();
    $('#loading').html("Loading...");
    getResults(stateName, maxResults);
  });
}


$(watchForm);