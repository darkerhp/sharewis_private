export const courses = {
  73: {
    id: 73,
    title: '会話のポイント！コミュニケーション術 基礎コース',
    imageUrl:
      'https://act-staging.s3.amazonaws.com/uploads/course/image/73/fuwapo_banner.jpg',
    lectureCount: 7,
    lectureProgress: 3,
    type: 'ProCourse'
  },
  180: {
    id: 180,
    title: '初心者のためのPhotoshop超基礎講座 Webデザイン編',
    imageUrl:
      'https://act-staging.s3.amazonaws.com/uploads/course/image/180/photoshopact_1_.png',
    lectureCount: 40,
    lectureProgress: 12,
    type: 'ProCourse'
  },
  999: {
    id: 999,
    title: 'スナックコース',
    imageUrl:
      'https://act-staging.s3.amazonaws.com/uploads/course/image/180/photoshopact_1_.png',
    lectureCount: 1,
    lectureProgress: 0,
    type: 'SnackCourse'
  }
};

export const lectures = {
  5921: {
    id: 5921,
    courseId: 180,
    title: 'はじめに',
    estimatedTime: 26,
    order: 1,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/51559062784985da094679d8d0cd6bddb6b1a3bb.bin',
    isDownloaded: false
  },
  5923: {
    id: 5923,
    courseId: 180,
    title: 'カンバスの設定',
    estimatedTime: 54,
    order: 2,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/88e9054bee268576fd4cfafb39cc6c923aeeac9a.bin',
    isDownloaded: false
  },
  5924: {
    id: 5924,
    courseId: 180,
    title: '定規・ガイド',
    estimatedTime: 79,
    order: 3,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/5c7720d9c27e548025e188e2a994a8af24af07bc.bin',
    isDownloaded: false
  },
  5925: {
    id: 5925,
    courseId: 180,
    title: 'シェイプで配置イメージをつくる',
    estimatedTime: 47,
    order: 4,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/8b97a96f11f5ac426c0b01986a1e185420a52a52.bin',
    isDownloaded: false
  },
  5926: {
    id: 5926,
    courseId: 180,
    title: '背景の効果(パターンオーバーレイ)',
    estimatedTime: 55,
    order: 5,
    kind: 'lecture',
    type: 'video',
    status: 'viewed',
    videoUrl:
      'http://embed.wistia.com/deliveries/083a72a68dfeeacbc07ff9d231cb293f1070a1d2.bin',
    isDownloaded: false
  },
  5927: {
    id: 5927,
    courseId: 180,
    title: '背景の色(カラーオーバーレイ)',
    estimatedTime: 53,
    order: 6,
    kind: 'lecture',
    type: 'video',
    status: 'viewed',
    videoUrl:
      'http://embed.wistia.com/deliveries/a22cee442e0187d7ed5083d3efbb0f3b25450642.bin',
    isDownloaded: false
  },
  5928: {
    id: 5928,
    courseId: 180,
    title: '大きな写真の配置(クリッピングマスク)',
    estimatedTime: 60,
    order: 7,
    kind: 'lecture',
    type: 'pdf',
    status: 'not_started'
  },
  5929: {
    id: 5929,
    courseId: 180,
    title: 'ロゴとほかの写真の配置',
    estimatedTime: 32,
    order: 8,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/812543688957f95a13626c8b1c6072a1900f1d9e.bin',
    isDownloaded: false
  },
  5930: {
    id: 5930,
    courseId: 180,
    title: 'レイヤーの整理',
    estimatedTime: 19,
    order: 9,
    kind: 'lecture',
    type: 'video',
    status: 'finished',
    videoUrl:
      'http://embed.wistia.com/deliveries/a2d9ccad60e78647fb0a376eb3b4859ef3640cff.bin',
    isDownloaded: false
  },
  9999: {
    id: 9999,
    courseId: 999,
    title: 'スナックレクチャー',
    estimatedTime: 90,
    order: 1,
    kind: 'lecture',
    type: 'video',
    status: '',
    videoUrl:
      'http://embed.wistia.com/deliveries/a2d9ccad60e78647fb0a376eb3b4859ef3640cff.bin',
    isDownloaded: false
  }
};

export const sections = {
  649: {
    id: 649,
    courseId: 180,
    title: '画面の設定とデザインの準備',
    order: 1,
    kind: 'section'
  },
  651: {
    id: 651,
    courseId: 180,
    title: '色・形・パターンでだいたいのイメージをつくる',
    order: 4,
    kind: 'section'
  },
  652: {
    id: 652,
    courseId: 180,
    title: 'データを配置する',
    order: 7,
    kind: 'section'
  }
};
