// data/nightMenu.ts
export const nightMenuItems = [
  {
    category: "Beer",
    items: [
      { name: "キリン", image: "/images/kirin.jpg", description: "・一番搾り" },
      { name: "アサヒ", image: "/images/asahi.jpg", description: "・ｽｰﾊﾟｰﾄﾞﾗｲ" },
      {
        name: "Blend",
        image: "/images/shandygaff.jpg",
        description: "・ｼｬﾝﾃﾞｨｶﾞﾌ\n・ｺｰｸﾋﾞｱ\n・ﾊﾟﾅｼｪ\n・ｶｼｽﾋﾞｱ",
      },
    ],
  },
  {
    category: "Cocktail",
    items: [
      {
        name: "Gin",
        image: "/images/gin.jpg",
        description: "・ｼﾞﾝﾄﾆｯｸ\n・ｼﾞﾝﾊﾞｯｸ\n・ｵﾚﾝｼﾞﾌﾞﾛｯｻﾑ\n・ｷﾞﾑﾚｯﾄ",
      },
      {
        name: "Vodka",
        image: "/images/vodka.jpg",
        description: "・ｳｫｯｶﾄﾆｯｸ\n・ﾓｽｺﾐｭｰﾙ\n・ｽｸﾘｭｰﾄﾞﾗｲﾊﾞｰ\n・ﾌﾞﾙﾄﾞｯｸ",
      },
      // ...省略（もとのNightComponentの内容に合わせて記述）
    ],
  },
  {
    category: "Whisky",
    note: "ﾛｯｸ / ﾊｲﾎﾞｰﾙ / ｼﾞﾝｼﾞｬｰﾊｲﾎﾞｰﾙ",
    items: [
      {
        name: "MACALLAN",
        image: "/images/macallan.jpg",
        description: "(ｽｺｯﾁ)",
      },
      {
        name: "JACK DANIELS",
        image: "/images/jack.jpg",
        description: "(ｱﾒﾘｶﾝ)",
      },
      {
        name: "角",
        image: "/images/kaku.jpg",
        description: "(ｼﾞｬﾊﾟﾆｰｽﾞ)",
      },
    ],
  },
];
