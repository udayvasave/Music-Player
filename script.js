var currentPlayingSongIndex = 0;
var repeatState = 0;
var progress = 0;

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let pause = document.getElementById("pausebtn");
let gif = document.getElementById("gif");
let repeatElement = document.getElementById("repeat");
let songTitle = document.getElementById("songTitle");
let albumArt = document.getElementById("albumArt");

let songItem = Array.from(document.getElementsByClassName("songItem"));
let songListPlayBtn = Array.from(
  document.getElementsByClassName("songListPlayBtn")
);
let masterPlay2 = document.getElementById("masterPlaySongListPLayBtn");
let previous = document.getElementsByClassName("previous");

// let timeStamp = Array.from(document.getElementsByClassName("timeStamp"));

//REPEAT STATES
// {
//0 = repeatAll,
// 1 = repeatOne,
// 2 = repeatNone -not using
//}

let songs = [
  {
    songName: "Beetein Lamhein",
    filePath: "./assets/music/0.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "Labon Ko",
    filePath: "./assets/music/1.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
  {
    songName: "Haan Tu Hai",
    filePath: "./assets/music/2.mp3",
    coverPath: "./assets/cover/3.jpg",
  },
  {
    songName: "Zara Si",
    filePath: "./assets/music/3.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "Ajab Si",
    filePath: "./assets/music/4.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
  {
    songName: "Dil Ibadat",
    filePath: "./assets/music/5.mp3",
    coverPath: "./assets/cover/3.jpg",
  },
  {
    songName: "Kya Muze Pyaar",
    filePath: "./assets/music/6.mp3",
    coverPath: "./assets/cover/1.jpeg",
  },
  {
    songName: "O Meri Jaan",
    filePath: "./assets/music/8.mp3",
    coverPath: "./assets/cover/2.jpeg",
  },
];

checkRepeatState(0);

// songs.forEach((k) => {
//   console.log(k);
// });

let audioElement = new Audio(songs[currentPlayingSongIndex].filePath);

// console.log(audioElement.duration);
//On load calculation
// audioElement.onloadedmetadata = function() {
//   //alert(audioElement.duration);
// };

function playNewSong() {
  // console.log("Play new song");

  switch (repeatState) {
    case 0:
      // console.log(songs.length);
      // console.log(currentPlayingSongIndex);
      if (currentPlayingSongIndex == songs.length - 1) {
        currentPlayingSongIndex = 0;
      } else {
        currentPlayingSongIndex++;
      }

      audioElement = new Audio(songs[currentPlayingSongIndex].filePath);

      togglePlayBackState();
      break;
    case 1:
      togglePlayBackState();
      break;
    case 2:
      break;
  }

  // progress = 0;
  // myProgressBar.value = 0;
  // console.log("here we will handle changing songs");
}

//Listening progress bar values on seeking song progress
-(
  //play pause click
  masterPlay.addEventListener("click", function () {
    togglePlayBackState();
  })
);

repeatElement.addEventListener("click", () => {
  if (repeatState == 2) {
    repeatState = 0;
  } else {
    repeatState++;
  }
  checkRepeatState();
});

myProgressBar.addEventListener("input", function () {
  var newTime = (myProgressBar.value * audioElement.duration) / 1000;
  audioElement.currentTime = newTime;
});

//Change playing to pause if already playing
//change pause to playing if already paused
//change song title and album art

function togglePlayBackState() {
  //change song title and album art
  songTitle.innerText = songs[currentPlayingSongIndex].songName;
  albumArt.src = songs[currentPlayingSongIndex].coverPath;
  audioElement.addEventListener("ended", () => {
    // console.log("ended");
    masterPlay.src = "./Icons/Play.svg";
    playNewSong();
  });

  //Listening progress bar values on seeking song progress
  audioElement.addEventListener("timeupdate", () => {
    var totalSong = audioElement.duration;
    var currentTime = audioElement.currentTime;

    var seekToTime = (currentTime * 1000) / totalSong;
    myProgressBar.value = seekToTime;
  });

  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("play");
    masterPlay.classList.add("pause");
    masterPlay.src = "./Icons/Pause.svg";
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("pause");
    masterPlay.classList.add("play");
    masterPlay.src = "./Icons/Play.svg";
    gif.style.opacity = 0;
  }
}

//change the repeat state icon based on the repeat State variable
function checkRepeatState() {
  switch (repeatState) {
    case 0:
      repeatElement.src = "./Icons/repeat.svg";
      break;
    case 1:
      repeatElement.src = "./Icons/repeat-once.png";
      break;
    case 2:
      repeatElement.src = "./Icons/repeat-off.svg";
      break;
    default:
      repeatElement.src = "./Icons/repeat-off.svg";
  }
}

// Adding Song Titles & covers in the verticle song list(inside big container) from songs array

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// //                          *****adding duration******
Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    const audio = new Audio(songs[i].filePath);
    //audio.play()
    audio.onloadedmetadata = function () {
      //  console.log(audio.duration);
      // var totalDuration = parseInt(audio.duration /60) .toFixed(2)
      // console.log("actualDuration", audio.duration);
      var totalDuration =
        parseInt(audio.duration / 60).toFixed(1) +
        parseInt(audio.duration % 60);
      element.getElementsByClassName("timeStamp")[0].innerText = totalDuration;
    };

    //element.getElementsByClassName("timeStamp")[0].innerText =
  }
);

// getAudioArrayDuration(songs[1].filePath){
//   // takes in an array of audio paths, finds the total audio duration
//   // in seconds

//   return new Promise((resolve)=>{
//       var duration = 0;

//       for(const aud_path in aud_path_arr){
//           var audio = new Audio();
//           audio.src = aud_path;
//           audio.onloadedmetadata = ()=>{
//               console.log(audio.duration);
//               duration += audio.duration;
//           }
//           resolve(duration);
//       }

//   });

// }
// songItem.forEach((element, i) => {
//   let gettingElement = element.getElementsByClassName("timeStamp")[0].innerText;
//   if (currentPlayingSongIndex <= 0) {
//     let first = new Audio(songs[0].filePath.duration);
//     console.log(first);
//   }
//   // audioDuration = new Audio(songs[currentPlayingSongIndex].duration);
//   // console.log(audioDuration);
// });
// let duration = songs[1].filePath.duration;
// console.log(duration);

//               ***************Listening to play buttons in song list*************
//
//                                      ***TRY-1***

// const makeAllPlays = () => {
//   Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//     (element) => {
//       element.remove((src = "./Icons/Pause.svg"));
//       element.classList.add("play");
//     }
//   );
// };

// Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//   (element) => {
//     element.addEventListener("click", (e) => {
//       makeAllPlays();
//       e.target.classList.remove("play");
//       e.target.add((src = "./Icons/Pause.svg"));
//     });
//   }
// );

//                             ***TRY-2*** progess 5%

// Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
//   (element, i) => {
//     element.addEventListener("click", (e) => {
//       console.log("click");

//       const audio1 = new Audio(songs[3].filePath);
//       const item1 = (document.getElementsByClassName("SongListPlayBtn")[0] =
//         audio1);

//       console.log();
//       if (audioElement.paused || audioElement.currentTime <= 0) {
//         e.target.classList.remove("songListPlayBtn");
//         e.target.classList.add("pause");
//         audio1.play();

//         e.target.src = "./Icons/Pause.svg";
//       } else {
//         audio1.pause();
//         e.target.classList.remove("pause");
//         e.target.src = "./Icons/Play.svg";
//         e.target.classList.add("songListPlayBtn");
//       }
//     });
//   }
// );

//                         ***TRY-3****

// songListPlayBtn.forEach((element) => {
//   element.addEventListener("click", (e) => {
//     console.log(e.target);
//     if (audioElement.paused || audioElement.currentTime <= 0) {
//       audioElement.play();
//       e.target.classList.remove("songListPlayBtn");
//       e.target.classList.add("pause");
//       masterPlay2.src = "./Icons/Pause.svg";
//     } else {
//       audioElement.pause();
//       e.target.classList.remove("pause");
//       e.target.classList.add("songListPlayBtn");
//       masterPlay2.src = "./Icons/Play.svg";
//     }
//   });
// });

//                                 ***TRY-4***

// const makeAllPlays = () => {
//   Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
//     // element.classList.remove("pause");
//     element.target.remove((masterPlay2.src = "./Icons/Pause.svg"));
//     element.classList.add("songListPlayBtn");
//   });
// };

// Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
//   element.addEventListener("click", (e) => {
//     makeAllPlays();
//     // songIndex = parseInt(e.target.id);
//     e.target.classList.remove("songListPlayBtn");
//     e.target.classList.add("pause");
//     e.target.masterPlay2.src = "./Icons/Pause.svg";
//   });
// });

////

//        ***************play next song-***************

let nextSong = document.getElementById("nextBtn");
nextSong.addEventListener("click", () => {
  audioElement.pause();
  if (currentPlayingSongIndex == songs.length - 1) {
    currentPlayingSongIndex = 0;
  } else {
    currentPlayingSongIndex++;
  }
  audioElement = new Audio(songs[currentPlayingSongIndex].filePath);
  audioElement.play();
  togglePlayBackState();
});

//               ************* play previous song****************

let previousSong = document.getElementById("previousBtn");

previousSong.addEventListener("click", () => {
  audioElement.pause();
  if (currentPlayingSongIndex == 0) {
    currentPlayingSongIndex = songs.length;
  } else {
    currentPlayingSongIndex--;
  }
  audioElement = audioElement = new Audio(
    songs[currentPlayingSongIndex].filePath
  );
  audioElement.play();
  togglePlayBackState();
});

console.log(songs.length);

function seekBar() {
  audioElement.addEventListener("timeupdate", () => {
    var totalSong = audioElement.duration;
    var currentTime = audioElement.currentTime;

    var seekToTime = (currentTime * 1000) / totalSong;
    myProgressBar.value = seekToTime;
  });
}
//            *************** SongListPlayBtn***********
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
    (element) => {
      element.classList.remove("pause");
      element.src = "./Icons/Play.svg";
      element.classList.add("play");
    }
  );
};
Array.from(document.getElementsByClassName("songListPlayBtn")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();
      currentPlayingSongIndex = parseInt(e.target.id);
      e.target.classList.remove("play");
      e.target.src = "./Icons/Pause.svg";
      audioElement.src = `./assets/music/${currentPlayingSongIndex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      songTitle.innerText = songs[currentPlayingSongIndex].songName;
      albumArt.src = songs[currentPlayingSongIndex].coverPath;
      seekBar();
      masterPlay.classList.remove("play");
      masterPlay.classList.add("pause");
      masterPlay.src = "./Icons/Pause.svg";
    });
  }
);

// if (audioElement.paused || audioElement.currentTime <= 0) {
//   audioElement.play();
//   masterPlay.classList.remove("play");
//   masterPlay.classList.add("pause");
//   masterPlay.src = "./Icons/Pause.svg";
//   gif.style.opacity = 1;
// } else {
//   audioElement.pause();
//   masterPlay.classList.remove("pause");
//   masterPlay.classList.add("play");
//   masterPlay.src = "./Icons/Play.svg";
//   gif.style.opacity = 0;
// }
