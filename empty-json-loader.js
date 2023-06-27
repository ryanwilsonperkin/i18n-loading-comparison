module.exports = function EmptyJsonLoader(source) {
  const {locale} = this.getOptions();
  if (!this.resourcePath.includes(`${locale}.json`)) {
    return '{}';
  }
  return source;
}