import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearProduct());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart!');
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!product) return null;

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>← Back</Button>
      <Row>
        <Col md={5}>
          <img
            src={product.image || 'https://via.placeholder.com/500x400?text=No+Image'}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.brand} · {product.category}</p>
          <h4 className="my-3">₹{product.price}</h4>
          <p>{product.description}</p>
          <p>⭐ {product.rating} ({product.numReviews} reviews)</p>
          <p>
            Stock:{' '}
            <Badge bg={product.countInStock > 0 ? 'success' : 'danger'}>
              {product.countInStock > 0 ? `${product.countInStock} available` : 'Out of Stock'}
            </Badge>
          </p>
          <Button
            variant="dark"
            size="lg"
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;