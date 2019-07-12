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
const track = q('#track')

// When user releases Enter key, act as if submit button has been clicked
searchForm.addEventListener('keyup', function(event){
    if(event.keyCode === 'Enter'){
        event.preventDefault()
        searchButton.click()
    }
})

// Function to display music tracks by selected artist or band
function getMusic(songs){

    

}



// Main execution
document.addEventListener('DOMContent Loaded', function() {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault()
        input = encodeURIComponent(searchBar.value)
        searchURL = `https://itunes-api-proxy.glitch.me/search?term=${input}&media=music&entity=musicTrack`

        fetch(URL)
            .then(response => response.json())
            .then(function (data) {
                musicResults.innerHTML = ''
                
                for (let song of data.results){
                    musicResults.appendChild(getMusic(song))
                }
                console.log(data.results[0])
        })
    })
})