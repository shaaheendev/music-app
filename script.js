//music info
const musics = [
  {
    "name": "Lost in the City Lights",
    "artist": "Cosmo Sheldrake",
    "src": "./resources/lost-in-city-lights-145038.mp3",
    "coverSrc": "./resources/cover-1.jpg"
  },
  {
    "name": "Forest Lullaby",
    "artist": "Lesfm",
    "src": "./resources/forest-lullaby-110624.mp3",
    "coverSrc": "./resources/cover-2.jpg"
  }
];

//new audio element
const audio = new Audio();

//simplify getting elements
const gebi = (id) => document.getElementById(id);

//get the elements
const cover = gebi("cover");
const coverImg = gebi("cover-img");
const title = gebi("title");
const artist = gebi("artist");
const crntTime = gebi("current-time");
const duration = gebi("duration");
const progress = gebi("progress-bar");
const playBtn = gebi("play-btn");
const preBtn = gebi("pre-btn");
const nextBtn = gebi("next-btn");
const progRange = gebi("prog-range");

//handle playing mucis
let currentMusicIndex = 0;
let currentMusic = musics[0];

displayInfo(currentMusic);

//event listenner for buttons
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});
nextBtn.addEventListener("click", function () {
  changeMusic(1);
});
preBtn.addEventListener("click", function () {
  changeMusic(-1);
});
//event listenner for music end
audio.addEventListener("ended", () => {
  changeMusic(1);
});

//handle progress and time nav
progress.setAttribute("max", "100");
audio.addEventListener("loadeddata", () => {
  duration.innerText = formatTime(audio.duration);
  audio.addEventListener("timeupdate", () => {
    progress.setAttribute(
      "value",
      `${(audio.currentTime / audio.duration) * 100}`
    );

    crntTime.innerText = formatTime(audio.currentTime);
  });
  progRange.addEventListener("change", function () {
    progress.value = this.value;
    audio.currentTime = Math.round((this.value / 100) * audio.duration);
  });
});

function displayInfo(music) {
  coverImg.src = music.coverSrc;
  title.innerText = music.name;
  artist.innerText = music.artist;
  audio.src = music.src;
}

function formatTime(seconds) {
  // Ensure the input is a non-negative number
  if (seconds < 0) {
    throw new Error("Time cannot be negative");
  }

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Pad the numbers with leading zeros if necessary
  const formattedTime = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0"),
  ].join(":");

  return formattedTime;
}
//function for changing the music
function changeMusic(preOrNext) {
  //1 indicates the next music and -1 the previous one
  if (preOrNext === 1) {
    if (currentMusicIndex === musics.length - 1) {
      currentMusicIndex = 0;
      currentMusic = musics[currentMusicIndex];
      displayInfo(currentMusic);
      audio.play();
    } else {
      currentMusicIndex++;
      currentMusic = musics[currentMusicIndex];
      displayInfo(currentMusic);
      audio.play();
    }
  } else if (preOrNext === -1) {
    if (currentMusicIndex === 0) {
      currentMusicIndex = musics.length - 1;
      currentMusic = musics[currentMusicIndex];
      displayInfo(currentMusic);
      audio.play();
    } else {
      currentMusicIndex--;
      currentMusic = musics[currentMusicIndex];
      displayInfo(currentMusic);
      audio.play();
    }
  }
}
