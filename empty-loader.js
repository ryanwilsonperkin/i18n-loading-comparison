/** Return '{}' as the source of any files that don't match the active locale */
module.exports = function EmptyLoader (source) {
  const {activeLocale} = this.getOptions();
  if (this.resourcePath.includes(`${activeLocale}.json`)) return source
  return '{}';
}