export function isToday(timestamp: number) {
  return new Date(timestamp).toDateString() === new Date().toDateString();
}