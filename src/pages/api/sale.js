export default function handler(req, res) {
  const saleItems = [
    { id: 1, name: 'Gold Earrings', image: '/images/earrings.jpg', originalPrice: 100, salePrice: 75 },
    { id: 2, name: 'Silver Necklace', image: '/images/necklace.jpg', originalPrice: 150, salePrice: 120 },
    { id: 3, name: 'Diamond Ring', image: '/images/ring.jpg', originalPrice: 500, salePrice: 400 },
    { id: 4, name: 'Pearl Bracelet', image: '/images/bracelet.jpg', originalPrice: 200, salePrice: 150 },
  ];
  res.status(200).json(saleItems);
}
