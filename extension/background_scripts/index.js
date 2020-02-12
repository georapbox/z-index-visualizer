const APPLICABLE_PROTOCOLS = ['http:', 'https:'];
const TITLE_APPLY = 'Enable z-index visualizer';
const TITLE_REMOVE = 'Disable z-index visualizer';

function protocolIsApplicable(url) {
  const anchor = document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: 'icons/z-index-visualizer-off.svg'});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    browser.pageAction.show(tab.id);
  }
}

function toggleZIndex(tab) {
  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.pageAction.setIcon({tabId: tab.id, path: 'icons/z-index-visualizer-on.svg'});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      browser.tabs.executeScript({file: 'content_scripts/delete-z-index.js', allFrames: true});
      browser.tabs.executeScript({file: 'content_scripts/inject-z-index.js', allFrames: true});
    } else {
      browser.pageAction.setIcon({tabId: tab.id, path: 'icons/z-index-visualizer-off.svg'});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
      browser.tabs.executeScript({file: 'content_scripts/delete-z-index.js', allFrames: true});
    }
  }

  browser.pageAction.getTitle({tabId: tab.id}).then(gotTitle);
}


browser.tabs.query({}).then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
  browser.tabs.executeScript({file: 'content_scripts/delete-z-index.js', allFrames: true});
});

browser.pageAction.onClicked.addListener(toggleZIndex);
