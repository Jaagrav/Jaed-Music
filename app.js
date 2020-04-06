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
      "https://webcomicms.net/sites/default/files/clipart/162752/play-button-png-162752-841916.png";
    document.querySelector(".musicToBePlayed").pause();
    isPlaying = false;
  } else {
    document.querySelector(".playPause").style.height = "43px";
    document.querySelector(".playPause").src =
      "https://www.shareicon.net/data/512x512/2015/11/20/675035_multimedia_512x512.png";
    document.querySelector(".musicToBePlayed").play();
    isPlaying = true;
  }
}
function openAddFiles() {
  document.querySelector(".fileUploadPage").style.transform = "translateY(0)";
}
document
  .querySelector(".uploadThumbnail")
  .addEventListener("change", function (e) {
    console.log(e);
    var audio = e.target.files[0];
    var databaseRef = firebase.database().ref();
    var storageRef = firebase
      .storage()
      .ref(
        document.querySelector(".uploadSongName").value +
          "_" +
          document.querySelector(".uploadArtistName").value +
          "/Thumbnail"
      );
    var task = storageRef.put(audio);
    task.on("state_changed", function progress(snapshot) {
      console.log(snapshot.bytesTransferred);
    });
  });
document.querySelector(".uploadBg").addEventListener("change", function (e) {
  console.log(e);
  var audio = e.target.files[0];
  var databaseRef = firebase.database().ref();
  var storageRef = firebase
    .storage()
    .ref(
      document.querySelector(".uploadSongName").value +
        "_" +
        document.querySelector(".uploadArtistName").value +
        "/Background"
    );
  var task = storageRef.put(audio);
  task.on("state_changed", function progress(snapshot) {
    console.log(snapshot.bytesTransferred);
  });
});

document.querySelector(".uploadMusic").addEventListener("change", function (e) {
  console.log(e);
  var audio = e.target.files[0];
  var databaseRef = firebase.database().ref();
  var storageRef = firebase
    .storage()
    .ref(
      document.querySelector(".uploadSongName").value +
        "_" +
        document.querySelector(".uploadArtistName").value +
        "/Audio"
    );
  var task = storageRef.put(audio);
  databaseRef
    .child("MusicFileNames")
    .push(
      document.querySelector(".uploadSongName").value +
        "_" +
        document.querySelector(".uploadArtistName").value
    );
  task.on("state_changed", function progress(snapshot) {
    console.log(snapshot.bytesTransferred);
  });
});
var k = 0;
function prev() {
  if (i == -1)
  i = k - 1;
i--;
  load();
}
function next() {
  if (i == k) i = 0;
  i++;
  load();
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
  console.log(i + " " + data[addressArray[i]] + " " + underscoreIndex);
}
