import type { HexagramInstance } from "./hexagram";
import type { NormalizedLine } from "./divination";
import type { CalendarContext } from "../core/calendar/types";

export interface ChartLine extends NormalizedLine {
  position: number;
  stem?: string;
  branch?: string;
  element?: string;
  ganzhi?: string;
  relation?: string;
  spirit?: string;
  isShi?: boolean;
  isYing?: boolean;
}

export interface HiddenChartLine {
  position: number;
  stem: string;
  branch: string;
  element: string;
  ganzhi: string;
  relation: string;
}

export interface ChartResult {
  originalHexagram: HexagramInstance;
  changedHexagram: HexagramInstance;
  calendar: CalendarContext;
  monthBranch: string;
  dayGanzhi: string;
  dayXunKong: string;
  movingLines: number[];
  lines: ChartLine[];
  changedLines: ChartLine[];
  hiddenLines: HiddenChartLine[];
  sixRelations: string[];
  sixSpirits: string[];
  shiYing: {
    palace?: string;
    shi: number;
    ying: number;
  };
  changedShiYing: {
    palace?: string;
    shi: number;
    ying: number;
  };
  meta: {
    generatedAt: string;
  };
}
