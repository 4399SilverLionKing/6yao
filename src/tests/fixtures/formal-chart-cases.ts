export const FORMAL_CHART_CASES = [
  {
    name: "pure qian chart",
    input: {
      throws: [7, 7, 7, 7, 7, 7],
      dateTime: "2026-03-23T10:30"
    },
    expected: {
      monthBranch: "辛卯",
      dayGanzhi: "丙申",
      dayXunKong: "辰巳",
      shiYing: {
        palace: "qian",
        shi: 6,
        ying: 3
      },
      firstLine: {
        ganzhi: "甲子",
        relation: "子孙",
        spirit: "朱雀"
      },
      hiddenLines: []
    }
  },
  {
    name: "gou chart with hidden wealth line",
    input: {
      throws: [8, 7, 7, 7, 7, 7],
      dateTime: "2026-03-23T10:30"
    },
    expected: {
      monthBranch: "辛卯",
      dayGanzhi: "丙申",
      dayXunKong: "辰巳",
      shiYing: {
        palace: "qian",
        shi: 1,
        ying: 4
      },
      firstLine: {
        ganzhi: "辛丑",
        relation: "父母",
        spirit: "朱雀"
      },
      hiddenLines: [
        {
          position: 2,
          ganzhi: "甲寅",
          relation: "妻财"
        }
      ]
    }
  }
] as const;

