import type { BeijingDateTimeParts } from "./types";

const DATETIME_PATTERN =
  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hour>\d{2}):(?<minute>\d{2})$/;

export function parseBeijingDateTime(input: string): BeijingDateTimeParts {
  if (!input) {
    throw new Error("Datetime is required.");
  }

  const match = DATETIME_PATTERN.exec(input);

  if (!match?.groups) {
    throw new Error("Invalid datetime format.");
  }

  const parts = {
    year: Number(match.groups.year),
    month: Number(match.groups.month),
    day: Number(match.groups.day),
    hour: Number(match.groups.hour),
    minute: Number(match.groups.minute)
  };

  if (
    Number.isNaN(parts.year) ||
    Number.isNaN(parts.month) ||
    Number.isNaN(parts.day) ||
    Number.isNaN(parts.hour) ||
    Number.isNaN(parts.minute)
  ) {
    throw new Error("Invalid datetime value.");
  }

  if (
    parts.month < 1 ||
    parts.month > 12 ||
    parts.day < 1 ||
    parts.day > 31 ||
    parts.hour < 0 ||
    parts.hour > 23 ||
    parts.minute < 0 ||
    parts.minute > 59
  ) {
    throw new Error("Invalid datetime value.");
  }

  return parts;
}

