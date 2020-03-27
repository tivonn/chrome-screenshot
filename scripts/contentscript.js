(async () => {
  await import(chrome.runtime.getURL("scripts/utils/html2canvas.min.js"))
  await import(chrome.runtime.getURL("scripts/utils/fileSaver.min.js"))
})()

const screenshot = async (dom) => {
  let container
  try {
    container = document.querySelector(dom || 'body')
  } catch {
    console.log('error from querySelector')
  }
  if (!container) {
    chrome.runtime.sendMessage({
      from: 'contentscript',
      action: 'setNoDomVisible',
      isVisible: true
    })
    return
  }
  const width = container.scrollWidth
  const height = container.scrollHeight
  const factor = 0.6
  const canvas = await window.html2canvas(
    container,
    {
      windowWidth: width * factor,
      windowHeight: height * factor,
      scale: 1.2,
      useCORS: true
    }
  )
  const fileName = `${ document.title ? `${document.title} - ` : ''}${Date.now()}.png`
  canvas.toBlob(blob => window.saveAs(blob, fileName))
}

chrome.runtime.onMessage.addListener(request => {
  if (request.from === 'popup' && request.action === 'screenshot') {
    screenshot(request.dom)
  }
})
