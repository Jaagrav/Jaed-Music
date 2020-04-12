var isPlaying = false,
  i = 0;
window.onload = function () {
  i = 0;
  setTimeout(() => {
    load();
    loadFirst();
    loadRecentlyUploaded();
  }, 1000);
};
function audioPlayPause() {
  duration = document.querySelector(".musicToBePlayed").duration;
  if (isPlaying) {
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://image.flaticon.com/icons/png/512/91/91925.png";
    document.querySelector(".musicToBePlayed").pause();
    isPlaying = false;
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "paused";
    document.querySelector(".playPauseMiniPlayer").src =
      "https://webcomicms.net/sites/default/files/clipart/162752/play-button-png-162752-841916.png";
  } else {
    document.querySelector(".playPause").style.height = "70px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    document.querySelector(".musicToBePlayed").play();
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    document.querySelector(".playPauseMiniPlayer").src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_pause.svg/1200px-OOjs_UI_icon_pause.svg.png";
    isPlaying = true;
  }
}
var k = 0;
function prev() {
  document.querySelector(".musicToBePlayed").pause();
  document.querySelector(".playPause").style.height = "70px";
  document.querySelector(".playPause").src =
    "https://image.flaticon.com/icons/png/512/91/91925.png";
  pauseGraphics();
  if (i == 0) i = k;
  i--;
  load();
  setTimeout(() => {
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    document.querySelector(".musicToBePlayed").play();
    isPlaying = true;
  }, 1500);
}
function pauseGraphics() {
  for (var i = 1; i <= 26; i++) {
    document.querySelector("#soundStick" + i).style.animationPlayState =
      "paused";
  }
}
function next() {
  pauseGraphics();
  document.querySelector(".musicToBePlayed").pause();
  document.querySelector(".playPause").style.height = "70px";
  document.querySelector(".playPause").src =
    "https://image.flaticon.com/icons/png/512/91/91925.png";
  if (i == k) i = 0;
  i++;
  load();
  setTimeout(() => {
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    document.querySelector(".musicToBePlayed").play();
    isPlaying = true;
  }, 1500);
}
function load() {
  var api = "https://rhythm-3ef06.firebaseio.com/MusicFileNames.json";
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
      document.querySelector(".thumbnailMiniPlayer").src = url;
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
  document.querySelector(
    ".miniPlayerSongTitle"
  ).innerHTML = document.querySelector(".songTitle").innerHTML;
  document.querySelector(
    ".miniPlayerArtistName"
  ).innerHTML = document.querySelector(".songArtist").innerHTML;
}
function openPlayer() {
  document.querySelector(".player").style.transform = "translateY(0)";
}
function closePlayer() {
  document.querySelector(".player").style.transform = "translateY(-100%)";
}
var topIndex = 0;
function loadFirst() {
  topLoadGraphicMedia();
}
function topLoadGraphicMedia() {
  var api = "https://rhythm-3ef06.firebaseio.com/MusicFileNames.json";
  $.getJSON(api, playTopLoadGraphicMedia);
}
function playTopLoadGraphicMedia(data) {
  var c = 0;
  for (var n in data) {
    addressArray.push(n);
    c++;
  }
  k = c;
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[topIndex]] + "/Thumbnail")
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
      var img = document.querySelector(".topThumbnail");
      img.src = url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  var underscoreIndex = data[addressArray[topIndex]].indexOf("_");
  document.querySelector(".topTitle").innerHTML = data[
    addressArray[topIndex]
  ].substring(0, underscoreIndex);
  document.querySelector(".topArtist").innerHTML = data[
    addressArray[topIndex]
  ].substring(underscoreIndex + 1);
}
function topLoad() {
  var api = "https://rhythm-3ef06.firebaseio.com/MusicFileNames.json";
  $.getJSON(api, playTop);
}
function playIndex(index) {
  console.log(index);
  topIndex = index;
  i = index;
  topLoad();
}
function playTop(data) {
  var c = 0;
  for (var n in data) {
    addressArray.push(n);
    c++;
  }
  k = c;
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[topIndex]] + "/Thumbnail")
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
      document.querySelector(".thumbnailMiniPlayer").src = url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error);
    });
  storageRef
    .child(data[addressArray[topIndex]] + "/Background")
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
    .child(data[addressArray[topIndex]] + "/Audio")
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
  var underscoreIndex = data[addressArray[topIndex]].indexOf("_");
  document.querySelector(".songTitle").innerHTML = data[
    addressArray[topIndex]
  ].substring(0, underscoreIndex);
  document.querySelector(".songArtist").innerHTML = data[
    addressArray[topIndex]
  ].substring(underscoreIndex + 1);
  document.querySelector(
    ".miniPlayerSongTitle"
  ).innerHTML = document.querySelector(".songTitle").innerHTML;
  document.querySelector(
    ".miniPlayerArtistName"
  ).innerHTML = document.querySelector(".songArtist").innerHTML;
  setTimeout(() => {
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    document.querySelector(".musicToBePlayed").play();
    isPlaying = true;
    document.querySelector(".playPauseMiniPlayer").src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_pause.svg/1200px-OOjs_UI_icon_pause.svg.png";
  }, 1500);
}
function loadRecentlyUploaded() {
  var api = "https://rhythm-3ef06.firebaseio.com/MusicFileNames.json";
  $.getJSON(api, loadRecentlyUploads);
}
function loadRecentlyUploads(data) {
  var c = 0;
  for (var n in data) {
    addressArray.push(n);
    c++;
  }
  k = c;
  document.querySelector(".actualContainer").innerHTML = "";
  var p = k - 1;
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[p]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        p-- +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 2]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 2) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 3]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 3) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 4]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 4) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 5]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 5) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 6]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 6) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 7]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 7) +
        ")'>";
    });
  var storageRef = firebase.storage().ref();
  storageRef
    .child(data[addressArray[k - 8]] + "/Thumbnail")
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
      console.log(p);
      // Or inserted into an <img> element:
      document.querySelector(".actualContainer").innerHTML +=
        "<img src='" +
        url +
        "' class='recentImgs' onclick='playIndex(" +
        (k - 8) +
        ")'>";
    });
}
setInterval(() => {
  if (document.querySelector(".musicToBePlayed").paused) {
    document.querySelector(".playPause").style.height = "65px";
    document.querySelector(".playPause").src =
      "https://image.flaticon.com/icons/png/512/91/91925.png";
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "paused";
    document.querySelector(".playPauseMiniPlayer").src =
      "https://webcomicms.net/sites/default/files/clipart/162752/play-button-png-162752-841916.png";
  } else {
    document.querySelector(".playPause").style.height = "70px";
    document.querySelector(".playPause").src =
      "https://cdn4.iconfinder.com/data/icons/rounded-black-music-player/139/Pause-RoundedBlack_musicplayer-512.png";
    for (var i = 1; i <= 26; i++)
      document.querySelector("#soundStick" + i).style.animationPlayState =
        "running";
    document.querySelector(".playPauseMiniPlayer").src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/OOjs_UI_icon_pause.svg/1200px-OOjs_UI_icon_pause.svg.png";
  }
}, 100);
