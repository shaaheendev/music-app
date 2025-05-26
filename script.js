//music info
const musics = [
  {
    name: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    src: "./resources/lost-in-city-lights-145038.mp3",
    coverSrc: "./resources/cover-1.jpg",
  },
  {
    name: "Forest Lullaby",
    artist: "Lesfm",
    src: "./resources/forest-lullaby-110624.mp3",
    coverSrc: "./resources/cover-2.jpg",
  },
];

//handle playing music
let currentMusicIndex = 0;
// let currentMusic = musics[currentMusicIndex];

//new audio element
const audio = new Audio();

//simplify getting elements
const gebi = (id) => document.getElementById(id);

//get the elements
const elements = {
  coverImg: gebi("cover-img"),
  title: gebi("title"),
  artist: gebi("artist"),
  crntTime: gebi("current-time"),
  duration: gebi("duration"),
  progress: gebi("progress-bar"),
  playBtn: gebi("play-btn"),
  preBtn: gebi("pre-btn"),
  nextBtn: gebi("next-btn"),
  progRange: gebi("prog-range"),
};

displayInfo(currentMusicIndex);

//event listenner for buttons
elements.playBtn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
});
elements.nextBtn.addEventListener("click", function () {
  changeMusic(1);
});
elements.preBtn.addEventListener("click", function () {
  changeMusic(-1);
});
//event listenner for music end
audio.addEventListener("ended", () => {
  changeMusic(1);
});

//handle progress and time nav
audio.addEventListener("loadeddata", function () {
  elements.duration.innerText = formatTime(this.duration);
  this.addEventListener("timeupdate", () => {
    elements.progress.setAttribute(
      "value",
      `${(this.currentTime / this.duration) * 100}`
    );
    elements.crntTime.innerText = formatTime(this.currentTime);
  });
  elements.progRange.addEventListener("change", function () {
    elements.progress.value = this.value;
    audio.currentTime = Math.round((this.value / 100) * audio.duration);
  });
});

function displayInfo(musicIndex) {
  let music = musics[musicIndex];
  elements.coverImg.src = music.coverSrc;
  elements.title.innerText = music.name;
  elements.artist.innerText = music.artist;
  audio.src = music.src;
}

function formatTime(seconds) {
  // Calculate hours, minutes, and remaining seconds
  let hours = Math.floor(seconds / 3600),
    minutes = Math.floor((seconds % 3600) / 60),
    secs = Math.floor(seconds % 60);

  // Pad the numbers with leading zeros if necessary
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return formattedTime;
}
//function for changing the music
function changeMusic(preOrNext) {
  currentMusicIndex =
    (musics.length + preOrNext + currentMusicIndex) % musics.length;
  displayInfo(currentMusicIndex);
  audio.play();
}
