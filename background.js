chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith('chrome://')) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrollToTop
    });
  } catch (err) {}
});

function scrollToTop() {
  try {
    const allDivs = document.querySelectorAll('div');

    for (const div of allDivs) {
      const style = getComputedStyle(div);
      const isScrollable =
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        div.scrollHeight > div.clientHeight &&
        div.scrollTop > 0;

      if (isScrollable && div.clientHeight > 300) {
        div.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {}
}
