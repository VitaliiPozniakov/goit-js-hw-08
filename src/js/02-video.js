const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  localStorage.setItem(`videoplayer-current-time`, JSON.stringify(data));
};

player.on('timeupdate', onPlay);

const currentTime = localStorage.getItem(`videoplayer-current-time`);
const parsedCurrentTime = JSON.parse(currentTime);
const currentSeconds = parsedCurrentTime.seconds;
// console.log(currentSeconds);

player
  .setCurrentTime(currentSeconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
