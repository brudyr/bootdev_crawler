function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}

module.exports = {
  removeTrailingSlash
}
