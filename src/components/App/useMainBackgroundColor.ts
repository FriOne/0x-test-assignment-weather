import { useEffect } from 'react';

export function useMainBackgroundColor() {
  useEffect(() => {
    const currentHour = new Date().getHours();
    let currentTheme = 'evening';

    if (currentHour >= 5 && currentHour < 11) {
      currentTheme = 'morning';
    } else if (currentHour >= 11 && currentHour < 17) {
      currentTheme = 'day';
    } else if (currentHour >= 17 && currentHour < 21) {
      currentTheme = 'evening';
    } else {
      currentTheme = 'night';
    }

    const root = document.getElementById('root')!;
    root.setAttribute('data-theme', currentTheme);
  }, []);
}