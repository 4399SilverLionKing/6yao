import { DAY_STEM_SIX_SPIRITS } from "../../data/zengshan/sixSpirits";

export function getFormalSixSpirits(dayGanzhi: string) {
  const dayStem = dayGanzhi.charAt(0);
  const spirits = DAY_STEM_SIX_SPIRITS[dayStem];

  if (!spirits) {
    throw new Error(`Unsupported day stem for six spirits: ${dayGanzhi}`);
  }

  return spirits;
}

