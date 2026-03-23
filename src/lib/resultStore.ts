import type { ChartResult } from "../types/chartResult";

const STORAGE_KEY = "liuyao.chart.result";

let cachedResult: ChartResult | null = null;

export function saveResult(result: ChartResult) {
  cachedResult = result;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadResult() {
  const raw = window.sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    cachedResult = null;
    return null;
  }

  if (cachedResult) {
    return cachedResult;
  }

  cachedResult = JSON.parse(raw) as ChartResult;

  return cachedResult;
}

export function clearResult() {
  cachedResult = null;
  window.sessionStorage.removeItem(STORAGE_KEY);
}
