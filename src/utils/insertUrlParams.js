function insertUrlParam(key, value) {
  if (history.pushState) {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, encodeURI(value))
    const newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      searchParams.toString()
    window.history.pushState({ path: newurl }, '', newurl)
  }
}

export default insertUrlParam
