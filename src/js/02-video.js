import lodashThrottle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.getVideoTitle().then(function (title) {});

const onPlay = function (data) {
  if (data.seconds === 0) {
    return;
  }
  localStorage.setItem(
    `videoplayer-current-time`,
    JSON.stringify(data.seconds)
  );
};

player.on('timeupdate', lodashThrottle(onPlay, 1000));

const currentTime = localStorage.getItem(`videoplayer-current-time`);
const parsedCurrentTime = JSON.parse(currentTime);

player
  .setCurrentTime(parsedCurrentTime)
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
