// Shorthand function for calling document.querySelector
function q (selector) {
    return document.querySelector(selector)
}

// Shorthand function for calling document.querySelectorAll
function qAll (selector) {
    return document.querySelectorAll(selector)
}

// Variables
let input
let searchURL
const searchForm = q('#searchForm')
const searchButton = q('#searchButton')
const searchBar = q('#searchBar')
const musicResults = q('#musicResults')
const artist = q('#artist')
const trackDiv = q('#trackDiv')
const audioPreview = q('#audioPreview')

// When user releases Enter key, act as if submit button has been clicked
searchForm.addEventListener('keyup', function(event){
    if(event.keyCode === 'Enter'){
        event.preventDefault()
        searchButton.click()
    }
})

// Function to display music tracks by selected artist or band
function getMusic(songs){
    
    const resultsDiv = document.createElement('div')
    resultsDiv.innerHTML = `
        <a id="#songName" href="${songs.trackViewUrl}"><img src="${songs.artworkUrl100}"></a>
        <br>
        <h3>Click to Preview: <a id="#songName" href="${songs.previewUrl}"> ${songs.trackName}</a></h3>
        <h4>Artist: ${songs.artistName} <br> Genre: ${songs.primaryGenreName}</h4>
    `
    return resultsDiv
}



// Main execution
document.addEventListener('DOMContentLoaded', function() {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault()
        input = encodeURIComponent(searchBar.value)
        searchURL = `https://itunes-api-proxy.glitch.me/search?term=${(input)}&media=music&entity=musicTrack`

        fetch(searchURL)
            .then(response => response.json())
            .then(function (data) {
                console.log(data)
                musicResults.innerHTML = ''
                
                for (let songs of data.results){
                    musicResults.appendChild(getMusic(songs))
                }
        })
    })
})