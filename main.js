document.addEventListener('DOMContent Loaded', function() {
    fetch('https://itunes-api-proxy.glitch.me/search?term=""media=music&entity=musicTrack"')
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            // Create functions for populating music tracks
        })
}
)