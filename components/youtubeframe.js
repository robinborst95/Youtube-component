Vue.component("youtube-frame", {
  template: "#template-youtube-frame",

  props: {
    "videoId": {
      type: String,
      required: true
    },
    "height": {
      type: String,
      required: false,
      default: 390
    },
    "width": {
      type: String,
      required: false,
      default: 640
    },
  },

  data: function() {
    return {
      player: null
    }
  },

  ready: function() {
    this.initPlayer();
  },

  methods: {
    initPlayer: function() {
      this.player = new YT.Player(this.videoId + "-player", {
        height: this.height,
        width: this.width,
        videoId: this.videoId,
        playerVars: {
          controls: 0
        },
        events: {
          "onReady": this.onPlayerReady,
          "onStateChange": this.onPlayerStateChange,
          "onError": this.onError
        }
      });
    },

    onPlayerReady: function(event) {
      console.log("Player for '" + this.videoId + "' is ready.");
      event.target.playVideo();
    },

    onPlayerStateChange: function(event) {
      // console.log("PlayerState change:", event.data);
    },

    onError: function(event) {
      console.log("Error");
    },

    stopVideo: function() {
      this.player.stopVideo();
    }
  }
});
