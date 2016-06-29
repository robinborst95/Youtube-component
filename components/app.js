var app;
$(document).ready(function() {
  app = new Vue({
    el: "#app",

    data: function() {
      return {
        clientLoaded: false,
        youtubeApiLoaded: false,
        youtubeIframeApiLoaded: false,
        videos: [],
        query: ""
      }
    },

    computed: {
      isInitDone: {
        cache: false,
        get: function() {
          return this.clientLoaded && this.youtubeApiLoaded && this.youtubeIframeApiLoaded;
        }
      }
    },

    created: function() {
      this.initIFramePlayerAPICode();
    },

    methods: {
      initIFramePlayerAPICode: function() {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      },

      onClientLoad: function() {
        console.log("Google API loaded.");
        this.clientLoaded = true;

        gapi.client.load("youtube", "v3", this.onYouTubeApiLoad);
      },

      onYouTubeApiLoad: function() {
        console.log("YouTube API loaded.");
        this.youtubeApiLoaded = true;

        gapi.client.setApiKey(GOOGLE_API_KEY);
      },

      onYouTubeIframeAPIReady: function() {
        console.log("YouTube IFrame API ready");
        this.youtubeIframeApiLoaded = true;
      },

      search: function() {
        var request = gapi.client.youtube.search.list({
            part: "id, snippet",
            q: this.query,
            eventType: "live",
            type: "video"
        });

        request.execute(this.onSearchResponse);
      },

      onSearchResponse: function(response) {
        this.videos = [];
        for (var i = 0; i < response.items.length; i++) {
          this.videos.push(response.items[i].id.videoId);
        }
        //this.openCalaisRequest(response.items[0].snippet.description);
      },

      openCalaisRequest: function(inputData) {
        var token = OPEN_CALAIS_TOKEN;
        $.ajax({
          type: "POST",
          dataType: "text",
          data: inputData,
          url: "https://api.thomsonreuters.com/permid/calais?access-token=" + token,
          beforeSend: function (jqXHR, settings) {
            jqXHR.setRequestHeader("Content-Type", "text/raw");
      			jqXHR.setRequestHeader("OutputFormat", "application/json");
            jqXHR.setRequestHeader("X-AG-Access-Token", token);
          },
          success: function(data, textStatus, jqXHR) {
            console.log("Response: ", JSON.stringify(jqXHR.responseText));
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: ", JSON.stringify(jqXHR));
          }
        });
      }
    }
  });
});

function onClientLoad() {
  app.onClientLoad();
}

function onYouTubeIframeAPIReady() {
  app.onYouTubeIframeAPIReady();
}
