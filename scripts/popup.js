let domInput = document.querySelector('.dom-input')
let noDom = document.querySelector('.no-dom')
let screenshot = document.querySelector('.screenshot')

screenshot.onclick = () => {
  setVisible(noDom, false)
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        from: 'popup',
        action: 'screenshot',
        dom: domInput.value
      }
    )
  })
}

const setVisible = (dom, isVisible) => {
  if (isVisible) {
    dom.style.display = 'inline-block'
  } else {
    dom.style.display = 'none'
  }
}

chrome.runtime.onMessage.addListener(request => {
  if (request.from === 'contentscript' && request.action === 'setNoDomVisible') {
    setVisible(noDom, request.isVisible)
  }
})
