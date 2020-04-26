const observer = (container, profile) => {

  const callback = (entries) => {
    entries.forEach(entry => {
      const { width, height } = entry.contentRect
      container.innerHTML = `
        <p>size is now width:<span class="emphasis">${width}</span> height:<span class="emphasis">${height}</span></p>
      `
    })
  }

  const resizeObserver = new ResizeObserver(callback)
  resizeObserver.observe(profile)
}

export default { observer }
