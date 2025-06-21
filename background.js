chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrollToTop
  });
});


function scrollToTop() {
  
  const allDivs = document.querySelectorAll('div');

  for (const div of allDivs) {
    const style = getComputedStyle(div);
    const isScrollable = (
      (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
      div.scrollHeight > div.clientHeight &&
      div.scrollTop > 0
    );

    // Avoid small elements like dropdowns
    if (isScrollable && div.clientHeight > 300) {
      div.scrollTo({ top: 0, behavior: 'smooth' });
      console.log("✅ Scrolled element:", div);
      return;
    }
  }

  // Fallback: try scrolling window
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log("⚠️ Fallback scroll used.");
}
