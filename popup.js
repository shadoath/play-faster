const buttons = document.querySelectorAll('button');

// Load current rate and highlight active button
chrome.storage.local.get('playbackRate', (data) => {
  const rate = data.playbackRate || 2;
  buttons.forEach(btn => {
    if (parseFloat(btn.dataset.speed) === rate) {
      btn.classList.add('active');
    }
  });
});

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const rate = parseFloat(btn.dataset.speed);
    chrome.storage.local.set({ playbackRate: rate });
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
