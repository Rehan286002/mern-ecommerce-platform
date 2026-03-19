import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../redux/orderSlice';
import { FaArrowLeft, FaBoxOpen, FaTruck, FaCheckCircle, FaClock, FaCog, FaTimes } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import { FaCreditCard, FaPhoneAlt} from 'react-icons/fa';

const steps = [
  { key: 'Pending',    label: 'Order Placed',  icon: <FaClock />,       desc: 'Your order has been received' },
  { key: 'Processing', label: 'Processing',    icon: <FaCog />,         desc: 'We are preparing your items' },
  { key: 'Shipped',    label: 'Shipped',       icon: <FaTruck />,       desc: 'Your order is on the way' },
  { key: 'Delivered',  label: 'Delivered',     icon: <FaCheckCircle />, desc: 'Order delivered successfully' },
];

const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const getDeliveryEstimate = (createdAt, deliveryOption) => {
  const date = new Date(createdAt);
  const days = deliveryOption === 'express' ? 2 : 5;
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders.length === 0) dispatch(fetchMyOrders());
  }, [dispatch, orders.length]);

  const order = orders.find((o) => o._id === id);

  if (loading) return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" style={{ color: '#f5a623' }} />
    </div>
  );

  if (!order) return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Container className="pt-5">
        <Alert variant="danger">Order not found.</Alert>
        <Button variant="warning" onClick={() => navigate('/my-orders')}>Back to Orders</Button>
      </Container>
    </div>
  );

  const currentStep = order.status === 'Cancelled'
    ? -1
    : statusOrder.indexOf(order.status);

  const isCancelled = order.status === 'Cancelled';

  return (
    <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '3rem' }}>
      <Container className="py-4">

        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <Button variant="outline-secondary" size="sm" onClick={() => navigate('/my-orders')}>
            <FaArrowLeft />
          </Button>
          <div>
            <h5 style={{ color: '#fff', margin: 0 }}>
              Order #{order._id.slice(-8).toUpperCase()}
            </h5>
            <small style={{ color: '#888' }}>
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </small>
          </div>
          <Badge bg={isCancelled ? 'danger' : 'success'} className="ms-auto" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            {isCancelled  ? <><FaTimes className="me-1" />Cancelled</>  : <><FaTruck className="me-1" />{order.status}</>}
          </Badge>
        </div>

        <Row>
          <Col lg={8}>

            {/* Tracking Timeline */}
            <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h6 style={{ color: '#f5a623', marginBottom: '1.5rem' }}>  <FaMapMarkerAlt className="me-2" />Order Tracking
              </h6>

              {isCancelled ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
                  <FaTimes size={40} className="mb-3" />
                  <h6>This order was cancelled</h6>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>
                    If you were charged, a refund will be processed within 5-7 business days.
                  </p>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isActive = index === currentStep;
                    return (
                      <div key={step.key} className="d-flex gap-3" style={{ marginBottom: index < steps.length - 1 ? '0' : '0' }}>
                        {/* Icon + Line */}
                        <div className="d-flex flex-column align-items-center">
                          <div style={{
                            width: 42, height: 42, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: isCompleted ? '#f5a623' : '#2a2a2a',
                            color: isCompleted ? '#000' : '#555',
                            border: `2px solid ${isCompleted ? '#f5a623' : '#444'}`,
                            fontSize: '1rem',
                            boxShadow: isActive ? '0 0 12px rgba(245,166,35,0.6)' : 'none',
                            transition: 'all 0.3s',
                            flexShrink: 0,
                          }}>
                            {step.icon}
                          </div>
                          {index < steps.length - 1 && (
                            <div style={{
                              width: 2, height: 48,
                              background: index < currentStep ? '#f5a623' : '#333',
                              transition: 'background 0.3s',
                            }} />
                          )}
                        </div>

                        {/* Text */}
                        <div style={{ paddingTop: 8, paddingBottom: index < steps.length - 1 ? 32 : 0 }}>
                          <div style={{
                            color: isCompleted ? '#fff' : '#555',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '0.95rem',
                          }}>
                            {step.label}
                            {isActive && (
                              <Badge bg="warning" text="dark" className="ms-2" style={{ fontSize: '0.7rem' }}>
                                Current
                              </Badge>
                            )}
                          </div>
                          <div style={{ color: isCompleted ? '#aaa' : '#444', fontSize: '0.82rem' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delivery Estimate */}
            {!isCancelled && order.status !== 'Delivered' && (
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.2rem', marginBottom: '1.5rem' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Estimated Delivery</div>
                    <div style={{ color: '#f5a623', fontWeight: 700, fontSize: '1rem' }}>
                      {getDeliveryEstimate(order.createdAt, order.deliveryOption)}
                    </div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>
                      {order.deliveryOption === 'express'  ? <><FaBolt className="me-1" style={{ color: '#f5a623' }} />Express Delivery</>  : <><FaTruck className="me-1" style={{ color: '#f5a623' }} />Standard Delivery</>}
                    </div>
                  </div>
                  <FaTruck size={32} style={{ color: '#f5a623', opacity: 0.6 }} />
                </div>
              </div>
            )}

            {/* Order Items */}
            <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem' }}>
              <h6 style={{ color: '#f5a623', marginBottom: '1rem' }}>
                <FaBoxOpen className="me-2" />Order Items
              </h6>
              {order.orderItems?.map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-3 py-2"
                  style={{ borderBottom: index < order.orderItems.length - 1 ? '1px solid #2a2a2a' : 'none' }}>
                  <img src={item.image} alt={item.name}
                    style={{ width: 55, height: 55, objectFit: 'cover', borderRadius: 8, border: '1px solid #333' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ color: '#f5a623', fontWeight: 700 }}>
                    ₹{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

          </Col>

          {/* Right Summary */}
          <Col lg={4} className="mt-4 mt-lg-0">

            {/* Price Summary */}
            <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginBottom: '1rem' }}>
               
              <h6 style={{ color: '#f5a623', marginBottom: '1rem' }}>
                  <FaRupeeSign className="me-2" />Price Summary
                  </h6>
              <div className="d-flex justify-content-between mb-2" style={{ color: '#aaa' }}>
                <span>Subtotal</span>
                <span>₹{order.orderItems?.reduce((a, i) => a + i.price * i.qty, 0).toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ color: '#aaa' }}>
                <span>Delivery</span>
                <span style={{ color: '#90ee90' }}>
                  {order.deliveryOption === 'express' ? '₹499' : '₹99'}
                </span>
              </div>
              <div className="d-flex justify-content-between pt-2 mt-2"
                style={{ borderTop: '1px solid #333', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Total</span>
                <span style={{ color: '#f5a623' }}>₹{order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginBottom: '1rem' }}>
              <h6 style={{ color: '#f5a623', marginBottom: '1rem' }}>  <FaBoxOpen className="me-2" />Shipping Address
              </h6>

              {order.shippingAddress ? (
                <div style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  <div style={{ color: '#fff' }}>{order.shippingAddress.address}</div>
                  {order.shippingAddress.landmark && <div>{order.shippingAddress.landmark}</div>}
                  <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                  <div>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</div>
                  {order.shippingAddress.phone && (
                    <div style={{ marginTop: 4 }}>
                        <FaPhoneAlt className="me-1" />{order.shippingAddress.phone}
                    </div>
                  )}
                </div>
              ) : <div style={{ color: '#555' }}>No address info</div>}
            </div>

            {/* Payment Info */}
            <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem' }}>
              <h6 style={{ color: '#f5a623', marginBottom: '1rem' }}>
                  <FaCreditCard className="me-2" />Payment
              </h6>
              <div className="d-flex justify-content-between" style={{ color: '#aaa', fontSize: '0.9rem' }}>
                <span>Method</span>
                <span style={{ color: '#fff' }}>{order.paymentMethod}</span>
              </div>
              <div className="d-flex justify-content-between mt-2" style={{ color: '#aaa', fontSize: '0.9rem' }}>
                <span>Status</span>
                <Badge bg={order.isPaid ? 'success' : 'danger'}>
                  {order.isPaid  ? <><FaCheckCircle className="me-1" />Paid</>  : <><FaClock className="me-1" />Pending</>}                </Badge>
              </div>
            </div>

            <Button variant="warning" className="w-100 fw-bold mt-3" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderDetailPage;