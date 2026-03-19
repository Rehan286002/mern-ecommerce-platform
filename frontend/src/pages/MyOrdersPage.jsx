import { useEffect } from 'react';
import { Container, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaEye } from 'react-icons/fa';
import { FaClock, FaCog, FaTruck, FaCheckCircle, FaTimes } from 'react-icons/fa';


const statusVariant = {
  Pending: 'secondary', Processing: 'primary',
  Shipped: 'info', Delivered: 'success', Cancelled: 'danger',
};

const statusIcon = {
  Pending:    <FaClock />,
  Processing: <FaCog />,
  Shipped:    <FaTruck />,
  Delivered:  <FaCheckCircle />,
  Cancelled:  <FaTimes />,
};

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" style={{ color: '#f5a623' }} />
    </div>
  );

  return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Container className="py-4">
        <h4 className="mb-4" style={{ color: '#fff' }}>
          <FaBoxOpen className="me-2" style={{ color: '#f5a623' }} />
          My Orders
        </h4>

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#888' }}>
            <FaBoxOpen size={64} style={{ marginBottom: '1rem', color: '#333' }} />
            <h5 style={{ color: '#aaa' }}>No orders yet</h5>
            <p>You haven't placed any orders. Start shopping!</p>
            <Button variant="warning" className="fw-bold" onClick={() => navigate('/')}>
              Shop Now
            </Button>
          </div>
        ) : (
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
            <Table responsive hover style={{ color: '#e0e0e0', margin: 0 }}>
              <thead style={{ background: '#1a1a1a', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '1rem' }}>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderColor: '#2a2a2a' }}>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#aaa' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td style={{ color: '#aaa', fontSize: '0.85rem' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td style={{ color: '#e0e0e0' }}>
                      {order.orderItems?.length} item(s)
                    </td>
                    <td style={{ color: '#f5a623', fontWeight: 700 }}>
                      ₹{order.totalPrice?.toLocaleString()}
                    </td>
                    <td>
                      <Badge bg={order.isPaid ? 'success' : 'danger'}>
                        {order.isPaid ? <><FaCheckCircle className="me-1" />Paid</>  : <><FaTimes className="me-1" />Unpaid</>}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={statusVariant[order.status] || 'secondary'}>
                        <span className="me-1">{statusIcon[order.status]}</span>{order.status}
                      </Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline-warning"
                        onClick={() => navigate(`/order/${order._id}`)}>
                        <FaEye className="me-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyOrdersPage;