const engines = {
  Yandex: "https://yandex.com/images/search?rpt=imageview&url=",
  TinEye: "https://tineye.com/search?url="
};

chrome.runtime.onInstalled.addListener(() => {
  for (const [name, url] of Object.entries(engines)) {
    chrome.contextMenus.create({
      id: name,
      title: `Recherche via ${name}`,
      contexts: ["image"]
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const engineUrl = engines[info.menuItemId];
  if (engineUrl && info.srcUrl) {
    const searchUrl = engineUrl + encodeURIComponent(info.srcUrl);
    chrome.tabs.create({ url: searchUrl });
  }
});
