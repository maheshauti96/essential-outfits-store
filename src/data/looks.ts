/** Styled pairings. Each card uses one of the piece photos from the catalogue. */
export interface Look {
  title: string;
  image: string;
  shirt: string;
  bottom: string;
}

export const looks: Look[] = [
  { title: 'Forest Green Shirt + Beige Trousers', image: '/products/p-forest.jpg', shirt: 'Forest Green', bottom: 'Beige Trousers' },
  { title: 'Black Shirt + Beige Trousers', image: '/products/p-black.jpg', shirt: 'Black', bottom: 'Beige Trousers' },
  { title: 'White Shirt + Black Trousers', image: '/products/p-white.jpg', shirt: 'White', bottom: 'Black Trousers' },
  { title: 'Burgundy Shirt + Black Trousers', image: '/products/p-burgundy.jpg', shirt: 'Burgundy', bottom: 'Black Trousers' },
  { title: 'Sky Blue Shirt + Beige Trousers', image: '/products/p-skyblue.jpg', shirt: 'Sky Blue', bottom: 'Beige Trousers' },
  { title: 'Army Green Shirt + Black Trousers', image: '/products/p-army.jpg', shirt: 'Army Green', bottom: 'Black Trousers' },
  { title: 'White Shirt + Blue Jeans', image: '/products/t-bluejeans.jpg', shirt: 'White', bottom: 'Blue Jeans' },
  {
    title: 'Forest Green Shirt + Black Stretchable Jeans',
    image: '/products/t-blackjeans.jpg',
    shirt: 'Forest Green',
    bottom: 'Black Stretchable Jeans',
  },
  { title: 'Sky Blue Shirt + Black Trousers', image: '/products/t-black.jpg', shirt: 'Sky Blue', bottom: 'Black Trousers' },
  { title: 'Black Shirt + White Trousers', image: '/products/t-white.jpg', shirt: 'Black', bottom: 'White Trousers' },
];
