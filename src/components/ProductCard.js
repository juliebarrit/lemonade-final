import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

export default function ProductCard({ product, showToast }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
    showToast();
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.image} style={{ objectFit: 'cover', height: '200px' }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </div>
        <div>
          <div><strong>Price:</strong> {product.price} DKK</div>
          <Button variant="primary" className="mt-3 w-100" onClick={handleAdd}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
