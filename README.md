# Youtube-component
Example usage of Youtube API in combination with Open Calais.

# Usage
This example shows how the Youtube API can be used to search for videos. It works as follows:
in app.js a Vue object is made to do the API calls. The `onClientLoaded` function is called
when the Google API is loaded. Then, the Youtube API is loaded, with a callback to `onYouTubeApiLoad` once it is loaded.
In this callback, the API key is set, which is needed for making calls to the API. 
To show the videos on a web page, the Iframe API is needed which is loaded when the Vue object is created.

When the APIs are loaded, a search can be done by entering input and clicking search. This creates a request
and calls the callback function `onSearchResponse` in which the response can be processed. 

To filter for correct videos, the Open Calais service can be used. To use it, just uncomment the call in `onSearchResponse`. 

## Token.js
To use the APIs, a file `token.js` must be added with a global variable `GOOGLE_API_KEY` and `OPEN_CALAIS_TOKEN`.

## Youtube-frame
Each videos can be displayed with the Vue component `youtube-frame`. This needs a video id for getting the iFrame from Youtube.
When the component is ready, a Youtube player is created, which handles all the calls to Youtube.
