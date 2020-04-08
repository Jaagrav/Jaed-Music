var isPlaying = false,
  i = 0;
window.onload = function () {
  i = 0;
  load();
};
function audioPlayPause() {
  if (isPlaying) {
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://image.flaticon.com/icons/png/512/91/91925.png";
    document.querySelector(".musicToBePlayed").pause();
    isPlaying = false;
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "paused";
  } else {
    document.querySelector(".playPause").style.height = "70px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    document.querySelector(".musicToBePlayed").play();
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    isPlaying = true;
  }
}
var k = 0;
function prev() {
  if (i == 0) i = k;
  i--;
  load();
  pauseGraphics();
  document.querySelector(".playPause").style.height = "65px";
  document.querySelector(".playPause").src =
    "https://image.flaticon.com/icons/png/512/91/91925.png";
  document.querySelector(".musicToBePlayed").pause();
  isPlaying = false;
}
function pauseGraphics() {
  for (var i = 1; i <= 26; i++) {
    document.querySelector("#soundStick" + i).style.animationPlayState =
      "paused";
  }
}
function next() {
  if (i == k) i = 0;
  i++;
  load();
  pauseGraphics();
  document.querySelector(".playPause").style.height = "65px";
  document.querySelector(".playPause").src =
    "https://image.flaticon.com/icons/png/512/91/91925.png";
  document.querySelector(".musicToBePlayed").pause();
  isPlaying = false;
}
function load() {
  var api = "https://musicapp-43362.firebaseio.com/MusicFileNames.json";
  $.getJSON(api, gotData);
}
var addressArray = [];
function gotData(data) {
  var c = 0;
  for (var n in data) {
    addressArray.push(n);
    c++;
  }
  k = c;
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[i]] + "/Thumbnail")
    .getDownloadURL()
    .then(function (url) {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element:
      var img = document.querySelector(".thumbnail");
      img.src = url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  storageRef
    .child(data[addressArray[i]] + "/Background")
    .getDownloadURL()
    .then(function (url) {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element:
      var img = document.querySelector(".bg");
      img.src = url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  storageRef
    .child(data[addressArray[i]] + "/Audio")
    .getDownloadURL()
    .then(function (url) {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element:
      var img = document.querySelector(".musicToBePlayed");
      img.src = url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  var underscoreIndex = data[addressArray[i]].indexOf("_");
  document.querySelector(".songTitle").innerHTML = data[
    addressArray[i]
  ].substring(0, underscoreIndex);
  document.querySelector(".songArtist").innerHTML = data[
    addressArray[i]
  ].substring(underscoreIndex + 1);
}
