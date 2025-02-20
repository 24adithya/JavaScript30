const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => console.log(`Something went wrong! ${err}`));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Get the pixels from the image
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    // Mess with the pixels
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1; // ghosting effect by slowing down frame rate

    // Put the pixels back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 100; // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 100; // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 1.1; // Blue
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 500] = pixels.data[i]; // Red
    pixels.data[i - 350] = pixels.data[i + 1]; // Green
    pixels.data[i + 200] = pixels.data[i + 2]; // Blue
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
// paintToCanvas();

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Handsome"/>`;
  strip.insertBefore(link, strip.firstChild);
}
