const searchURL = `https://api.github.com/users/`

function getGithubRepos(query) {
    const url = searchURL + query + '/repos';
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson)
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><a href=${responseJson[i]["html_url"]}>${responseJson[i].name}</a>
        </li>`
        )
    }; 
    $('#results').removeClass('hidden');
};

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getGithubRepos(searchTerm)
    })
}

$(watchForm)