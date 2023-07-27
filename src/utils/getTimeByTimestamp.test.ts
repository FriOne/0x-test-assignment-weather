import { getTimeByTimestamp } from './getTimeByTimestamp';

it('getTimeByTimestamp gets correct time', () => {
  let time

  time = getTimeByTimestamp(new Date().getTime());
  expect(time).toBe('Now');

  time = getTimeByTimestamp(1690454683);
  expect(time).toBe('1PM');
});
