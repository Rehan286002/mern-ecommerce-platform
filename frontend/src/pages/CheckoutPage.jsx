import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder, resetOrderSuccess } from '../redux/orderSlice';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa';
import { FaMobileAlt, FaUniversity, FaMoneyBillWave, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';


const getDeliveryDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, error, success } = useSelector((state) => state.orders);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [phone, setPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryCharge = totalPrice > 50000 ? 0 : deliveryOption === 'express' ? 499 : 99;
  const grandTotal = totalPrice + deliveryCharge;

  const deliveryDays = deliveryOption === 'express' ? 2 : 5;
  const estimatedDelivery = getDeliveryDate(deliveryDays);

  useEffect(() => {
    if (success) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      dispatch(resetOrderSuccess());
      navigate('/');
    }
  }, [success, dispatch, navigate]);

  const handlePlaceOrder = () => {
    dispatch(placeOrder({
      orderItems: cartItems.map((i) => ({
        product: i._id, name: i.name, price: i.price, qty: i.qty, image: i.image,
      })),
      shippingAddress: { address, city, state, postalCode, country, phone, landmark },
      paymentMethod,
      deliveryOption,
      totalPrice: grandTotal,
    }));
  };

  if (cartItems.length === 0) {
    return <Container className="mt-5"><Alert variant="info">Your cart is empty.</Alert></Container>;
  }

  const stepStyle = (s) => ({
    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem',
    background: step >= s ? '#f5a623' : '#2a2a2a',
    color: step >= s ? '#000' : '#888',
    border: `2px solid ${step >= s ? '#f5a623' : '#444'}`,
  });

  return (
    <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Container className="py-4">
        <h4 className="mb-4" style={{ color: '#fff' }}>Checkout</h4>

        {/* Step Indicator */}
        <div className="d-flex align-items-center mb-4 gap-2">
          {[['1', 'Address'], ['2', 'Delivery'], ['3', 'Payment']].map(([s, label], i) => (
            <div key={s} className="d-flex align-items-center gap-2">
              <div style={stepStyle(Number(s))}>
                {step > Number(s) ? <FaCheckCircle /> : s}
              </div>
              <span style={{ color: step >= Number(s) ? '#f5a623' : '#666', fontSize: '0.85rem' }}>{label}</span>
              {i < 2 && <div style={{ width: 40, height: 2, background: step > Number(s) ? '#f5a623' : '#333' }} />}
            </div>
          ))}
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          <Col lg={7}>

            {/* Step 1 — Address */}
            {step === 1 && (
              <Card style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: 12 }} className="p-4 mb-3">
                <h5 className="mb-3" style={{ color: '#f5a623' }}>
                  <FaMapMarkerAlt className="me-2" />Shipping Address
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#aaa' }}>Phone Number *</Form.Label>
                      <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210" required
                        style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#aaa' }}>Country *</Form.Label>
                      <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}
                        style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }}>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>UAE</option>
                        <option>Singapore</option>
                        <option>Australia</option>
                        <option>Canada</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#aaa' }}>Street Address *</Form.Label>
                  <Form.Control value={address} onChange={(e) => setAddress(e.target.value)}
                    placeholder="House No., Street, Area"
                    style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#aaa' }}>Landmark (Optional)</Form.Label>
                  <Form.Control value={landmark} onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near landmark, building name..."
                    style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#aaa' }}>City *</Form.Label>
                      <Form.Control value={city} onChange={(e) => setCity(e.target.value)}
                        placeholder="Chennai"
                        style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#aaa' }}>State *</Form.Label>
                      <Form.Control value={state} onChange={(e) => setState(e.target.value)}
                        placeholder="Tamil Nadu"
                        style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#aaa' }}>Postal Code *</Form.Label>
                      <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="600001"
                        style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444' }} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="warning" className="w-100 fw-bold mt-2"
                  disabled={!address || !city || !postalCode || !phone}
                  onClick={() => setStep(2)}>
                  Continue to Delivery →
                </Button>
              </Card>
            )}

            {/* Step 2 — Delivery Options */}
            {step === 2 && (
              <Card style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: 12 }} className="p-4 mb-3">
                <h5 className="mb-3" style={{ color: '#f5a623' }}>
                  <FaTruck className="me-2" />Delivery Options
                </h5>

                {/* Standard */}
                <div onClick={() => setDeliveryOption('standard')}
                  style={{ background: deliveryOption === 'standard' ? '#2a2a2a' : '#1a1a1a', border: `2px solid ${deliveryOption === 'standard' ? '#f5a623' : '#333'}`, borderRadius: 10, padding: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>
                        <FaTruck className="me-1" style={{ color: '#f5a623' }} />Standard Delivery
                      </div>
                      <div style={{ color: '#aaa', fontSize: '0.85rem' }}>Arrives by {getDeliveryDate(5)}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>5 business days</div>
                    </div>
                    <div style={{ color: '#f5a623', fontWeight: 700 }}>
                      {totalPrice > 50000 ? 'FREE' : '₹99'}
                    </div>
                  </div>
                </div>

                {/* Express */}
                <div onClick={() => setDeliveryOption('express')}
                  style={{ background: deliveryOption === 'express' ? '#2a2a2a' : '#1a1a1a', border: `2px solid ${deliveryOption === 'express' ? '#f5a623' : '#333'}`, borderRadius: 10, padding: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>
                        <FaBolt className="me-1" style={{ color: '#f5a623' }} />
                        Express Delivery <Badge bg="warning" text="dark" style={{ fontSize: '0.7rem' }}>FAST</Badge>
                        </div>
                      <div style={{ color: '#aaa', fontSize: '0.85rem' }}>Arrives by {getDeliveryDate(2)}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>2 business days</div>
                    </div>
                    <div style={{ color: '#f5a623', fontWeight: 700 }}>
                      {totalPrice > 50000 ? 'FREE' : '₹499'}
                    </div>
                  </div>
                </div>

                {totalPrice > 50000 && (
                  <Alert variant="success" style={{ background: '#1a3a1a', border: '1px solid #2d5a2d', color: '#90ee90' }}>
                    🎉 Congratulations! You qualify for <strong>FREE delivery</strong> on both options.
                  </Alert>
                )}

                {/* Delivery Address Summary */}
                <div style={{ background: '#2a2a2a', borderRadius: 8, padding: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: 4 }}>Delivering to:</div>
                  <div style={{ color: '#fff', fontSize: '0.9rem' }}>{address}, {landmark && `${landmark}, `}{city}, {state} - {postalCode}</div>
                  import { FaPhoneAlt } from 'react-icons/fa';
                  <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
                    <FaPhoneAlt className="me-1" />{phone}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" className="w-50" onClick={() => setStep(1)}>← Back</Button>
                  <Button variant="warning" className="w-50 fw-bold" onClick={() => setStep(3)}>Continue to Payment →</Button>
                </div>
              </Card>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <Card style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: 12 }} className="p-4 mb-3">
                <h5 className="mb-3" style={{ color: '#f5a623' }}>
                  <FaCreditCard className="me-2" />Payment Method
                </h5>

                {['Stripe', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method) => (
                  <div key={method} onClick={() => setPaymentMethod(method)}
                    style={{ background: paymentMethod === method ? '#2a2a2a' : '#1a1a1a', border: `2px solid ${paymentMethod === method ? '#f5a623' : '#333'}`, borderRadius: 10, padding: '0.8rem 1rem', marginBottom: '0.8rem', cursor: 'pointer', color: '#fff' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${paymentMethod === method ? '#f5a623' : '#666'}`, background: paymentMethod === method ? '#f5a623' : 'transparent' }} />
                      <span style={{ fontWeight: paymentMethod === method ? 600 : 400 }}>
                        
{method === 'Stripe' && <FaCreditCard className="me-2" style={{ color: '#f5a623' }} />}
{method === 'UPI' && <FaMobileAlt className="me-2" style={{ color: '#f5a623' }} />}
{method === 'Net Banking' && <FaUniversity className="me-2" style={{ color: '#f5a623' }} />}
{method === 'Cash on Delivery' && <FaMoneyBillWave className="me-2" style={{ color: '#f5a623' }} />}
                        {method}
                      </span>
                      {method === 'Stripe' && <Badge bg="success" style={{ fontSize: '0.65rem' }}>Recommended</Badge>}
                      {method === 'Cash on Delivery' && <Badge bg="secondary" style={{ fontSize: '0.65rem' }}>+₹50 COD fee</Badge>}
                    </div>
                  </div>
                ))}

                <div className="d-flex gap-2 mt-3">
                  <Button variant="outline-secondary" className="w-50" onClick={() => setStep(2)}>← Back</Button>
                  <Button variant="warning" className="w-50 fw-bold" disabled={loading}
                    onClick={handlePlaceOrder}>
                    {loading ? <Spinner size="sm" animation="border" />  : <><FaShoppingCart className="me-2" />Place Order</>}
                  </Button>
                </div>
              </Card>
            )}
          </Col>

          {/* Order Summary */}
          <Col lg={5}>
            <Card style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: 12 }} className="p-4">
              <h5 className="mb-3" style={{ color: '#fff' }}>Order Summary</h5>
              <div style={{ maxHeight: 250, overflowY: 'auto' }} className="mb-3">
                {cartItems.map((item) => (
                  <div key={item._id} className="d-flex justify-content-between align-items-center mb-2 pb-2"
                    style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.image} alt={item.name}
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                      <div>
                        <div style={{ color: '#fff', fontSize: '0.85rem' }}>{item.name}</div>
                        <div style={{ color: '#888', fontSize: '0.75rem' }}>Qty: {item.qty}</div>
                      </div>
                    </div>
                    <span style={{ color: '#f5a623', fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #333', paddingTop: '1rem' }}>
                <div className="d-flex justify-content-between mb-2" style={{ color: '#aaa' }}>
                  <span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2" style={{ color: '#aaa' }}>
                  <span>Delivery</span>
                  <span style={{ color: deliveryCharge === 0 ? '#90ee90' : '#aaa' }}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3 pt-2" style={{ borderTop: '1px solid #333', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                  <span>Total</span><span style={{ color: '#f5a623' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
                {/* Delivery Estimate */}
                <div style={{ background: '#2a2a2a', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Estimated Delivery</div>
                  <div style={{ color: '#f5a623', fontWeight: 600, fontSize: '0.9rem' }}>{estimatedDelivery}</div>
                  <div style={{ color: '#888', fontSize: '0.75rem' }}>
                    {deliveryOption === 'express' ? <><FaBolt className="me-1" />Express (2 days)</>  : <><FaTruck className="me-1" />Standard (5 days)</>}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;