import { Container, Table, Button, Alert, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!userInfo) return navigate('/login?redirect=/checkout');
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Your cart is empty. <Alert.Link href="/">Shop now</Alert.Link></Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h3 className="mb-4">Shopping Cart</h3>
      <Table responsive hover>
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <Form.Select
                  size="sm"
                  style={{ width: 70 }}
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                >
                  {[...Array(Math.min(item.countInStock, 5)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </Form.Select>
              </td>
              <td>₹{(item.price * item.qty).toFixed(2)}</td>
              <td>
                <Button size="sm" variant="outline-danger" onClick={() => dispatch(removeFromCart(item._id))}>
                  <FaTrash />
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="justify-content-end">
        <Col md={4}>
          <div className="border rounded p-3 shadow-sm">
            <h5>Total: ₹{totalPrice.toFixed(2)}</h5>
            <p className="text-muted">{cartItems.reduce((a, i) => a + i.qty, 0)} item(s)</p>
            <Button variant="dark" className="w-100" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;