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

// When user releases Enter key, act as if submit button has been clicked
searchForm.addEventListener('keyup', function(event){
    if(event.keyCode === 'Enter'){
        event.preventDefault()
        searchButton.click()
    }
})


function getMusic(){
// Write the stuff that gets music data
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
                getMusic(data.results)
                console.log(data.results[0])
        })
    })
})