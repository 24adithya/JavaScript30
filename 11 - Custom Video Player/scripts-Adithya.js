/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/** Add event listeners */

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skipTime() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // console.log(this.name); //prints 'volume'/'playback rate'
  // console.log(this.value); //prints 'actual value' moved

  video[this.name] = this.value; //append the new value to the 'video' element
}

function handleProgress() {
  //actual time / duration will give the exact location of the video
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function updateProgress(e) {
  //If we click at the middle point and the clip is 60 seconds clip then we need to jump to mid point of the video
  const actualTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = actualTime;
}

//Play/pause the video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

//Rather than adding a 'click' on 'toggle' button, we are listening to play/pause from anywhere and updating the icon
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//Skip forward/backward
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipTime));

//'Volume'/'playback rate' both are part of 'ranges'
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

//update 'Progress bar'
video.addEventListener('timeupdate', handleProgress);

//'click' on actual progress and update 'video' accordingly
let mouseDown = false;
progress.addEventListener('click', updateProgress);

//'drag' event to update actual progress
progress.addEventListener('mousemove', e => mouseDown && updateProgress(e));
progress.addEventListener('mouseup', () => (mouseDown = false));
progress.addEventListener('mousedown', () => (mouseDown = true));
