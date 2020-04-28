function getAllRepos(searchRepo){
  const url = `https://api.github.com/users/${searchRepo}/repos`

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong with your request: ${err.message}`);
    });
}


function displayResults(responseJson){
  $('.results').empty();
  responseJson.forEach(function(repo){
    $('.results').append(`<li><a href="${repo.owner.url}" target="_blank">${repo.name}</a></li>`)
    $('#result-list').removeClass('hidden');
  });
}

function watchSubmit(){
  $('form').submit(event=> {
    event.preventDefault();
    const searchRepo = $('#js-search-form').val();
    getAllRepos(searchRepo);
  });
}

$(watchSubmit());