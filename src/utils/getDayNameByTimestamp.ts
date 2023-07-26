import { isToday } from './isToday';

export function getDayNameByTimestamp(timestamp: number) {
  if (isToday(timestamp)) {
    return 'Today';
  }

  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(timestamp));
}
