export type Data = {
  id: number;
  image: any;
  title: string;
  text: string;
};

export const data: Data[] = [
  {
    id: 1,
    image: require("../../../../assets/images/books.json"),
    title: "Kelime Dağarcığını Geliştir",
    text: "Her gün yeni kelimeler öğrenerek kelime dağarcığını geliştir.",
  },
  {
    id: 2,
    image: require("../../../../assets/images/clock.json"),
    title: "Zamana Karşı Yarış",
    text: "Zamana karşı yarışarak kendine meydan oku.",
  },
  {
    id: 3,
    image: require("../../../../assets/images/sword.json"),
    title: "Rakiplerini Yen",
    text: "Rakiplerini yenerek sıralamada üst sıralara yüksel.",
  },
];
