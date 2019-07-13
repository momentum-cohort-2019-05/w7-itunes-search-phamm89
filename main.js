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
let checkedRadioButton
let fullURL
const searchForm = q('#searchForm')
const searchButton = q('#searchButton')
const searchBar = q('#searchBar')
const musicResults = q('#musicResults')
const artist = q('#artist')
const trackDiv = q('#trackDiv')
const audioPreview = q('#audioPreview')
const musicPlayer = q('#musicPlayer')
const currentlyPlaying = q('.currentlyPlaying')
const searchRadioButton = qAll('.searchType')

// When user releases Enter key, act as if submit button has been clicked
searchForm.addEventListener('keyup', function(event){
    if(event.keyCode === 'Enter'){
        event.preventDefault()
        searchButton.click()
    }
})



// Function to display music tracks by selected artist or band
function getMusic(songs){
    // Play a song by the artist before any button is clicked
    audioPreview.src = songs.previewUrl
    audioPreview.autoplay = 'true'

    const resultsDiv = document.createElement('div')
    resultsDiv.setAttribute("id", "resultsDiv")
    resultsDiv.innerHTML = `
        <ul style="list-style: none;" class="detail-list">
            <li class="list-item img"><a id="#songName" href="${songs.trackViewUrl}"><img src="${songs.artworkUrl100}"></a></li>
            <br>
            <li class="list-item music-button"><button id='playSample' data-url="${songs.previewUrl}" data-track="${songs.trackName}" data-artist="${songs.artistName}">Click Button to Preview: ${songs.trackName}</button></li>
            <li class="list-item artist-and-genre"><h4>Artist: ${songs.artistName} <br> Genre: ${songs.primaryGenreName}</h4></li> 
        </ul>   
    `
    // Display the song title and artist name of song being played
    currentlyPlaying.innerHTML = `<p class="currentlyPlaying">Currently Playing: ${songs.trackName} by ${songs.artistName}</p>`

    return resultsDiv
}


// Function to return checked radio button
function getCheckedRadioButton(buttons){
    for(button of buttons){
        if(button.checked){
            return button.value
        }
    }
}


// Main execution
document.addEventListener('DOMContentLoaded', function() {
    // Execution for playing a specific track if clicked
    musicResults.addEventListener('click', function(event) {
        console.log(event.target)
        if (event.target && event.target.matches('#playSample')) {
            audioPreview.src = event.target.dataset['url']
            audioPreview.autoplay = 'true'
            audioPreview.loop = 'true'
            // When preview button is clicked, also display song title and artist using data attribute from event.target
            currentlyPlaying.innerHTML = `<p class="currentlyPlaying">Currently Playing: ${event.target.dataset['track']} by ${event.target.dataset['artist']}</p>`
          }
        })


    // Execution for generating list of results upon search button clicked or enter key pressed
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault()
        input = encodeURIComponent(searchBar.value)
        checkedButton = getCheckedRadioButton(searchRadioButton)
        searchURL = `https://itunes-api-proxy.glitch.me/search?term=${(input)}&media=music&entity=musicTrack`
        fullURL = searchURL + checkedButton

        fetch(fullURL)
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