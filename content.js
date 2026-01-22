// Spoof playbackRate getter to bypass rate limit checks
// The getter returns max 2 to fool checks, but the actual rate is set correctly
const desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'playbackRate');

if (desc) {
  Object.defineProperty(HTMLMediaElement.prototype, 'playbackRate', {
    get: function() {
      const real = desc.get.call(this);
      return real > 2 ? 2 : real;
    },
    set: function(val) {
      desc.set.call(this, val);
    },
    configurable: true
  });
}

// Automatically set playback rate on all media elements
let currentRate = 2;

// Load saved rate
chrome.storage.local.get('playbackRate', (data) => {
  currentRate = data.playbackRate || 2;
});

// Listen for changes from popup
chrome.storage.onChanged.addListener((changes) => {
  if (changes.playbackRate) {
    currentRate = changes.playbackRate.newValue;
  }
});

setInterval(() => {
  document.querySelectorAll('audio, video').forEach(media => {
    if (desc.get.call(media) !== currentRate) {
      media.playbackRate = currentRate;
    }
  });
}, 1000);
