import { Solar } from 'lunar-typescript';

import { parseBeijingDateTime } from './parseBeijingDateTime';
import type { CalendarContext } from './types';

export function buildCalendarContext(inputDateTime: string): CalendarContext {
  const { year, month, day, hour, minute } =
    parseBeijingDateTime(inputDateTime);
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();

  return {
    inputDateTime,
    timezone: 'Asia/Shanghai',
    solarDate: solar.toYmdHms(),
    lunarDate: lunar.toString(),
    monthBranch: lunar.getMonthInGanZhiExact(),
    dayGanzhi: lunar.getDayInGanZhiExact(),
    dayXun: lunar.getDayXunExact(),
    dayXunKong: lunar.getDayXunKongExact(),
  };
}
