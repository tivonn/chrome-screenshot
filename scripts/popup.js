let screenshot = document.getElementById('screenshot')
screenshot.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        from: 'popup',
        action: 'screenshot'
      }
    )
  })
}
