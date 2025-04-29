import books from 'assets/images/books.json';
import clock from 'assets/images/clock.json';
import sword from 'assets/images/sword.json';

export type Data = {
  id: number;
  image: any;
  title: string;
  text: string;
};

export const data: Data[] = [
  {
    id: 1,
    image: books,
    title: 'Kelime Dağarcığını Geliştir',
    text: 'Her gün yeni kelimeler öğrenerek kelime dağarcığını geliştir.',
  },
  {
    id: 2,
    image: clock,
    title: 'Zamana Karşı Yarış',
    text: 'Zamana karşı yarışarak kendine meydan oku.',
  },
  {
    id: 3,
    image: sword,
    title: 'Rakiplerini Yen',
    text: 'Rakiplerini yenerek sıralamada üst sıralara yüksel.',
  },
];
