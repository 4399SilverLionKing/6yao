export interface BeijingDateTimeParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface CalendarContext {
  inputDateTime: string;
  timezone: "Asia/Shanghai";
  solarDate: string;
  lunarDate: string;
  monthBranch: string;
  dayGanzhi: string;
  dayXun: string;
  dayXunKong: string;
}

