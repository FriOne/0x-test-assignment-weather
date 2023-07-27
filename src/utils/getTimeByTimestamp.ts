export function getTimeByTimestamp(timestamp: number) {
  if (new Date(timestamp).getHours() === new Date().getHours()) {
    return 'Now';
  }

  return new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })
    .format(new Date(timestamp))
    .replace(/:\d+/, '')
    .replace(' ', '');
}
