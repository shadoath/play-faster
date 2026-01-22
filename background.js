// Inject script into main world on every navigation
chrome.webNavigation.onCommitted.addListener((details) => {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId, frameIds: [details.frameId] },
    files: ['inject.js'],
    world: 'MAIN',
    injectImmediately: true
  }).catch(() => {}); // Ignore errors for frames we can't access
});
