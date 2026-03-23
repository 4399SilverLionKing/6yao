import { buildCalendarContext } from "../calendar/buildCalendarContext";
import { normalizeCastInput } from "../divination/normalizeCastInput";
import { buildChangedHexagram } from "../hexagram/buildChangedHexagram";
import { buildHexagram } from "../hexagram/buildHexagram";
import { getMovingLines } from "../hexagram/getMovingLines";
import {
  buildHiddenLines,
  buildNaJiaLines,
  getFormalShiYing,
  getFormalSixRelations,
  getFormalSixSpirits
} from "../liuyao";
import type { ChartResult } from "../../types/chartResult";

export interface ComputeChartInput {
  throws: readonly number[];
  dateTime: string;
}

export function computeChartResult(input: ComputeChartInput): ChartResult {
  const normalizedLines = normalizeCastInput(input.throws);
  const originalHexagram = buildHexagram(normalizedLines);
  const changedHexagram = buildChangedHexagram(normalizedLines);
  const calendar = buildCalendarContext(input.dateTime);
  const movingLines = getMovingLines(normalizedLines);
  const naJiaLines = buildNaJiaLines(originalHexagram);
  const sixRelations = getFormalSixRelations(originalHexagram, naJiaLines);
  const sixSpirits = getFormalSixSpirits(calendar.dayGanzhi);
  const shiYing = getFormalShiYing(originalHexagram);
  const hiddenLines = buildHiddenLines(originalHexagram);

  return {
    originalHexagram,
    changedHexagram,
    calendar,
    monthBranch: calendar.monthBranch,
    dayGanzhi: calendar.dayGanzhi,
    dayXunKong: calendar.dayXunKong,
    movingLines,
    lines: normalizedLines.map((line, index) => ({
      ...line,
      position: index + 1,
      stem: naJiaLines[index].stem,
      branch: naJiaLines[index].branch,
      element: naJiaLines[index].element,
      ganzhi: naJiaLines[index].ganzhi,
      relation: sixRelations[index],
      spirit: sixSpirits[index],
      isShi: shiYing.shi === index + 1,
      isYing: shiYing.ying === index + 1
    })),
    hiddenLines,
    sixRelations,
    sixSpirits,
    shiYing,
    meta: {
      generatedAt: new Date().toISOString()
    }
  };
}
