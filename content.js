// Content script - handles storage and sets playback rate
let currentRate = 2;

chrome.storage.local.get('playbackRate', (data) => {
  currentRate = data.playbackRate || 2;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.playbackRate) {
    currentRate = changes.playbackRate.newValue;
  }
});

setInterval(() => {
  document.querySelectorAll('audio, video').forEach(media => {
    media.playbackRate = currentRate;
  });
}, 1000);
