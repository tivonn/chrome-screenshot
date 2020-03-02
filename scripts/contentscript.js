(async () => {
  await import(chrome.runtime.getURL("scripts/utils/html2canvas.min.js"))
  await import(chrome.runtime.getURL("scripts/utils/fileSaver.min.js"))
})()

const screenshot = async () => {
  const dom = document.body
  const width = dom.offsetWidth
  const height = dom.offsetHeight
  const factor = 0.6
  const canvas = await window.html2canvas(
    dom,
    {
      windowWidth: width * factor,
      windowHeight: height * factor,
      scale: 1.2
    }
  )
  const fileName = `${ document.title ? `${document.title} - ` : ''}${Date.now()}`
  canvas.toBlob(blob => window.saveAs(blob, fileName))
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === 'popup' && request.action === 'screenshot') {
    screenshot()
  }
})
