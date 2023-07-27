import { getDayNameByTimestamp } from './getDayNameByTimestamp';

it('getDayNameByTimestamp gets correct day', () => {
  let day

  day = getDayNameByTimestamp(new Date().getTime());
  expect(day).toBe('Today');

  day = getDayNameByTimestamp(1690454683);
  expect(day).toBe('Tue');
});
