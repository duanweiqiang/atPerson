// 生成uuid函数
function createUuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  const uuid = s.join('');
  return uuid;
}

const mapPerson = [
  {
    name: '彭万里',
  },
  {
    name: '高大山',
  },
  {
    name: '谢大海',
  },
  {
    name: '马宏宇',
  },
  {
    name: '林莽',
  },
  {
    name: '黄强辉',
  },
  {
    name: '章汉夫',
  },
  {
    name: '范长江',
  },
  {
    name: '林君雄',
  },
  {
    name: '谭平山',
  },
  {
    name: '朱希亮',
  },
  {
    name: '李四光',
  },
  {
    name: '甘铁生',
  },
  {
    name: '张伍',
  },
  {
    name: '绍祖',
  },
  {
    name: '马继祖',
  },
  {
    name: '程孝先',
  },
  {
    name: '宗敬先',
  },
  {
    name: '年广嗣',
  },
  {
    name: '汤绍箕',
  },
  {
    name: '吕显祖',
  },
  {
    name: '何光宗',
  },
  {
    name: '孙念祖',
  },
  {
    name: '马建国',
  },
  {
    name: '节振国',
  },
  {
    name: '冯兴国',
  },
  {
    name: '郝爱民',
  },
  {
    name: '于学忠',
  },
  {
    name: '马连良',
  },
  {
    name: '胡宝善',
  },
  {
    name: '李宗仁',
  },
  {
    name: '洪学智',
  },
  {
    name: '余克勤',
  },
  {
    name: '吴克俭',
  },
  {
    name: '杨惟义',
  },
  {
    name: '李文信',
  },
  {
    name: '王德茂',
  },
  {
    name: '李书诚',
  },
  {
    name: '杨勇',
  },
  {
    name: '高尚德',
  },
  {
    name: '刁富贵',
  },
  {
    name: '汤念祖',
  },
  {
    name: '吕奉先',
  },
  {
    name: '何光宗',
  },
  {
    name: '冷德友',
  },
  {
    name: '安怡孙',
  },
  {
    name: '贾德善',
  },
  {
    name: '蔡德霖',
  },
  {
    name: '关仁',
  },
  {
    name: '郑义',
  },
  {
    name: '贾怡',
  },
  {
    name: '孙天民',
  },
  {
    name: '赵大华',
  },
  {
    name: '赵进喜',
  },
  {
    name: '赵德荣',
  },
  {
    name: '赵德茂',
  },
  {
    name: '钱汉祥',
  },
  {
    name: '钱运高',
  },
  {
    name: '钱生禄',
  },
  {
    name: '孙寿康',
  },
  {
    name: '孙应吉',
  },
  {
    name: '孙顺达',
  },
  {
    name: '李秉贵',
  },
  {
    name: '李厚福',
  },
  {
    name: '李开富',
  },
  {
    name: '王子久',
  },
  {
    name: '刘永生',
  },
  {
    name: '刘宝瑞',
  },
  {
    name: '关玉和',
  },
  {
    name: '王仁兴',
  },
  {
    name: '李泰',
  },
  {
    name: '罗元发',
  },
  {
    name: '刘造时',
  },
  {
    name: '刘超',
  },
  {
    name: '刘长胜',
  },
  {
    name: '张成基',
  },
  {
    name: '张国柱',
  },
  {
    name: '张志远',
  },
  {
    name: '张广才',
  },
  {
    name: '吕德榜',
  },
  {
    name: '吕文达',
  },
  {
    name: '吴家栋',
  },
  {
    name: '吴国梁',
  },
  {
    name: '吴立',
  },
  {
    name: '李大江',
  },
  {
    name: '张石山',
  },
  {
    name: '王海',
  },
];

export const getPerson = (text, count) => {
  const p = mapPerson.filter(e => e.name.indexOf(text) > -1);
  p.map(i => {
    i.id = createUuid();
  });
  return {
    personList: p.slice(0, count),
    total: p.length,
  };
};
