// TODO Move to Test
export const lectures = [
  { title: 'セクション１', kind: 'section' },
  {
    id: 1,
    order: 1,
    title: 'レクチャーA',
    kind: 'lecture',
    duration: 30,
    isCompleted: true,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 2,
    order: 2,
    title: 'レクチャーB',
    kind: 'lecture',
    duration: 60,
    isCompleted: true,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 3,
    order: 3,
    title: 'レクチャーC',
    kind: 'lecture',
    duration: 90,
    isCompleted: true,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  { title: 'セクション2', kind: 'section' },
  {
    id: 4,
    order: 4,
    title: 'レクチャーD',
    kind: 'lecture',
    duration: 30,
    isCompleted: false,
    type: 'TextLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 5,
    order: 5,
    title: 'レクチャーE',
    kind: 'lecture',
    duration: 60,
    isCompleted: false,
    type: 'PdfLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 6,
    order: 6,
    title: 'レクチャーF',
    kind: 'lecture',
    duration: 90,
    isCompleted: false,
    type: 'AudioLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  { title: 'セクション3', kind: 'section' },
  {
    id: 7,
    order: 7,
    title: 'レクチャーG',
    kind: 'lecture',
    duration: 30,
    isCompleted: false,
    type: 'QuizLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 8,
    order: 8,
    title: 'レクチャーH',
    kind: 'lecture',
    duration: 60,
    isCompleted: false,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 9,
    order: 9,
    title: 'レクチャーI',
    kind: 'lecture',
    duration: 90,
    isCompleted: false,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  { title: 'セクション4', kind: 'section' },
  {
    id: 10,
    order: 10,
    title: 'レクチャーJ',
    kind: 'lecture',
    duration: 30,
    isCompleted: false,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 11,
    order: 11,
    title: 'レクチャーK',
    kind: 'lecture',
    duration: 60,
    isCompleted: false,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
  {
    id: 12,
    order: 12,
    title: 'レクチャーL',
    kind: 'lecture',
    duration: 90,
    isCompleted: false,
    type: 'VideoLecture',
    url: 'http://embed.wistia.com/deliveries/442c0200e6412dc5fbf26d3f89dc9bfa8fd4e76c.bin',
  },
];


export const courses = [
  {
    title: '差がつくビジネス戦略講座 | 事業開発・Platform戦略(R)・ITマーケティング',
    imageUrl: 'https://act-production.s3.amazonaws.com/uploads/course/image/23/normal_sekaide70000_programming.png',
    nb_lectures_watched: 110,
    total_nb_lectures: 202,
    lectures,
  }, {
    title: '未経験からプロのWebデザイナーに！ 450レッスン完全マスターコース',
    imageUrl: 'https://act-production.s3.amazonaws.com/uploads/course/image/214/normal_%E5%85%A8%E4%BD%93%E7%B5%B1%E5%90%88%E3%82%B3%E3%83%BC%E3%82%B9_460-258.jpg',
    nb_lectures_watched: 0,
    total_nb_lectures: 20,
    lectures,
  },
];