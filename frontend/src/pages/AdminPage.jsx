import { useEffect, useState, useRef } from 'react';
import {
  Container, Row, Col, Card, Table, Badge, Button, Spinner,
  Alert, Form, Modal, Tab, Nav
} from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import {
  FaUsers, FaBox, FaShoppingBag, FaRupeeSign,
  FaEdit, FaTrash, FaPlus, FaChartPie
} from 'react-icons/fa';
import { FaCrown, FaUserCircle, FaShoppingCart } from 'react-icons/fa';

Chart.register(...registerables);

const CATEGORIES = ['Laptops','Computers','Smartphones','Audio','TVs','Cameras','Gaming','Accessories','Sports & Fitness','Books & Stationery','Clothing & Fashion'];
const STATUS_OPTIONS = ['Pending','Processing','Shipped','Delivered','Cancelled'];
const STATUS_COLORS = {
  Pending: '#6c757d', Processing: '#0d6efd',
  Shipped: '#0dcaf0', Delivered: '#198754', Cancelled: '#dc3545',
};

// ─── Reusable Chart Hook ──────────────────────────────────────
const useChart = (ref, config, deps) => {
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, config);
    return () => chart.destroy();
  }, deps);
};

// ─── Stat Card ───────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <Card style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: 12 }} className="p-3 h-100">
    <div className="d-flex align-items-center gap-3">
      <div style={{ background: color + '22', borderRadius: 10, padding: '0.8rem', color, fontSize: '1.4rem' }}>
        {icon}
      </div>
      <div>
        <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{label}</div>
        <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  </Card>
);

// ─── Main AdminPage ───────────────────────────────────────────
const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Product Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', price: '', description: '', image: '',
    brand: '', category: 'Laptops', countInStock: '', seller: 'Rehan Pvt Ltd.',
  });

  // User Modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'user' });

  // Chart refs
  const statusChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const topCatChartRef = useRef(null);

  // Load all data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, ordersRes, usersRes, productsRes] = await Promise.all([
          axiosInstance.get('/admin/stats'),
          axiosInstance.get('/admin/orders'),
          axiosInstance.get('/admin/users'),
          axiosInstance.get('/admin/products'),
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Orders by status — Doughnut
  useChart(statusChartRef, {
    type: 'doughnut',
    data: {
      labels: stats ? Object.keys(stats.ordersByStatus) : [],
      datasets: [{
        data: stats ? Object.values(stats.ordersByStatus) : [],
        backgroundColor: Object.values(STATUS_COLORS),
        borderColor: '#1e1e1e', borderWidth: 3,
      }],
    },
    options: {
      plugins: {
        legend: { labels: { color: '#e0e0e0', font: { size: 12 } } },
        title: { display: true, text: 'Orders by Status', color: '#f5a623', font: { size: 14 } },
      },
    },
  }, [stats]);

  // Products by category — Bar
  useChart(categoryChartRef, {
    type: 'bar',
    data: {
      labels: stats?.productsByCategory?.map(c => c._id) || [],
      datasets: [{
        label: 'Products',
        data: stats?.productsByCategory?.map(c => c.count) || [],
        backgroundColor: '#f5a62388',
        borderColor: '#f5a623',
        borderWidth: 2, borderRadius: 6,
      }],
    },
    options: {
      plugins: {
        legend: { labels: { color: '#e0e0e0' } },
        title: { display: true, text: 'Products by Category', color: '#f5a623', font: { size: 14 } },
      },
      scales: {
        x: { ticks: { color: '#aaa' }, grid: { color: '#2a2a2a' } },
        y: { ticks: { color: '#aaa' }, grid: { color: '#2a2a2a' } },
      },
    },
  }, [stats]);

  // Top selling categories — Bar
  useChart(topCatChartRef, {
    type: 'bar',
    data: {
      labels: stats?.topCategories?.map(c => c._id || 'Unknown') || [],
      datasets: [{
        label: 'Units Sold',
        data: stats?.topCategories?.map(c => c.totalSold) || [],
        backgroundColor: '#0d6efd88',
        borderColor: '#0d6efd',
        borderWidth: 2, borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { labels: { color: '#e0e0e0' } },
        title: { display: true, text: 'Top Selling Categories', color: '#f5a623', font: { size: 14 } },
      },
      scales: {
        x: { ticks: { color: '#aaa' }, grid: { color: '#2a2a2a' } },
        y: { ticks: { color: '#aaa' }, grid: { color: '#2a2a2a' } },
      },
    },
  }, [stats]);

  // ─── Product CRUD ─────────────────────────────────────────
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ name:'', price:'', description:'', image:'', brand:'', category:'Laptops', countInStock:'', seller:'Rehan Pvt Ltd.' });
    setShowProductModal(true);
  };

  const openEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({ name: p.name, price: p.price, description: p.description,
      image: p.image, brand: p.brand, category: p.category,
      countInStock: p.countInStock, seller: p.seller || 'Rehan Pvt Ltd.' });
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        const { data } = await axiosInstance.put(`/admin/products/${editingProduct._id}`, productForm);
        setProducts(products.map(p => p._id === data._id ? data : p));
        toast.success('Product updated!');
      } else {
        const { data } = await axiosInstance.post('/admin/products', productForm);
        setProducts([data, ...products]);
        toast.success('Product created!');
      }
      setShowProductModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axiosInstance.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted!');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  // ─── User CRUD ────────────────────────────────────────────
  const openEditUser = (u) => {
    setEditingUser(u);
    setUserForm({ name: u.name, email: u.email, role: u.role });
    setShowUserModal(true);
  };

  const handleSaveUser = async () => {
    try {
      await axiosInstance.put(`/admin/users/${editingUser._id}`, userForm);
      setUsers(users.map(u => u._id === editingUser._id ? { ...u, ...userForm } : u));
      toast.success('User updated!');
      setShowUserModal(false);
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted!');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  // ─── Order Status Update ──────────────────────────────────
  const handleOrderStatus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/admin/orders/${orderId}/status`, { status });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
      toast.success('Status updated!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" style={{ color: '#f5a623' }} />
    </div>
  );

  if (error) return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Container className="pt-5"><Alert variant="danger">{error}</Alert></Container>
    </div>
  );

  const inputStyle = { background: '#2a2a2a', color: '#fff', border: '1px solid #444' };
  const labelStyle = { color: '#aaa' };

  return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Container fluid className="py-4 px-4">
        <h4 className="mb-4" style={{ color: '#fff' }}>
          <FaChartPie className="me-2" style={{ color: '#f5a623' }} />
          Admin Dashboard
        </h4>

        {/* Tabs */}
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="mb-4" style={{ borderColor: '#333' }}>
            {[
              { key: 'dashboard', label: <><FaChartPie className="me-2" />Dashboard</> },
              { key: 'products', label: <><FaBox className="me-2" />Products ({products.length})</> },
              { key: 'orders', label: <><FaShoppingCart className="me-2" />Orders ({orders.length})</> },
              { key: 'users', label: <><FaUsers className="me-2" />Users ({users.length})</> },
            ].map(tab => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key} style={{
                  color: activeTab === tab.key ? '#f5a623' : '#aaa',
                  background: activeTab === tab.key ? '#1e1e1e' : 'transparent',
                  border: activeTab === tab.key ? '1px solid #333' : '1px solid transparent',
                  borderBottom: 'none', marginRight: 4,
                }}>
                  {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            {/* ── DASHBOARD TAB ── */}
            <Tab.Pane eventKey="dashboard">
              {/* Stat Cards */}
              <Row className="mb-4 g-3">
                <Col xs={6} md={3}><StatCard icon={<FaUsers />} label="Total Users" value={stats?.totalUsers} color="#0d6efd" /></Col>
                <Col xs={6} md={3}><StatCard icon={<FaBox />} label="Total Products" value={stats?.totalProducts} color="#f5a623" /></Col>
                <Col xs={6} md={3}><StatCard icon={<FaShoppingBag />} label="Total Orders" value={stats?.totalOrders} color="#0dcaf0" /></Col>
                <Col xs={6} md={3}><StatCard icon={<FaRupeeSign />} label="Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`} color="#198754" /></Col>
              </Row>

              {/* Charts */}
              <Row className="g-3">
                <Col md={4}>
                  <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.2rem' }}>
                    <canvas ref={statusChartRef} />
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.2rem' }}>
                    <canvas ref={categoryChartRef} />
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.2rem' }}>
                    <canvas ref={topCatChartRef} />
                  </div>
                </Col>
              </Row>
            </Tab.Pane>

            {/* ── PRODUCTS TAB ── */}
            <Tab.Pane eventKey="products">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: '#fff', margin: 0 }}>All Products</h6>
                <Button variant="warning" size="sm" className="fw-bold" onClick={openAddProduct}>
                  <FaPlus className="me-1" /> Add Product
                </Button>
              </div>
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
                <Table responsive hover style={{ color: '#e0e0e0', margin: 0 }}>
                  <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                      <th style={{ padding: '1rem', color: '#aaa' }}>Image</th>
                      <th style={{ color: '#aaa' }}>Name</th>
                      <th style={{ color: '#aaa' }}>Category</th>
                      <th style={{ color: '#aaa' }}>Price</th>
                      <th style={{ color: '#aaa' }}>Stock</th>
                      <th style={{ color: '#aaa' }}>Seller</th>
                      <th style={{ color: '#aaa' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id} style={{ borderColor: '#2a2a2a' }}>
                        <td style={{ padding: '0.8rem' }}>
                          <img src={p.image} alt={p.name}
                            style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: 6 }} />
                        </td>
                        <td style={{ color: '#fff', maxWidth: 200, fontSize: '0.85rem' }}>{p.name}</td>
                        <td><Badge bg="dark" style={{ border: '1px solid #444' }}>{p.category}</Badge></td>
                        <td style={{ color: '#f5a623', fontWeight: 600 }}>₹{p.price?.toLocaleString()}</td>
                        <td>
                          <Badge bg={p.countInStock > 0 ? 'success' : 'danger'}>
                            {p.countInStock > 0 ? p.countInStock : 'Out'}
                          </Badge>
                        </td>
                        <td style={{ color: '#aaa', fontSize: '0.85rem' }}>{p.seller}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-warning" onClick={() => openEditProduct(p)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProduct(p._id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            {/* ── ORDERS TAB ── */}
            <Tab.Pane eventKey="orders">
              <h6 style={{ color: '#fff' }} className="mb-3">All Orders</h6>
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
                <Table responsive hover style={{ color: '#e0e0e0', margin: 0 }}>
                  <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                      {['Order ID','Customer','Items','Total','Payment','Status','Update'].map(h => (
                        <th key={h} style={{ padding: '1rem', color: '#aaa' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderColor: '#2a2a2a' }}>
                        <td style={{ color: '#888', fontSize: '0.8rem' }}>#{order._id.slice(-8).toUpperCase()}</td>
                        <td style={{ color: '#fff', fontSize: '0.85rem' }}>
                          <div>{order.user?.name || 'N/A'}</div>
                          <small style={{ color: '#666' }}>{order.user?.email}</small>
                        </td>
                        <td style={{ color: '#aaa' }}>{order.orderItems?.length}</td>
                        <td style={{ color: '#f5a623', fontWeight: 600 }}>₹{order.totalPrice?.toLocaleString()}</td>
                        <td>
                          <Badge bg={order.isPaid ? 'success' : 'danger'}>
                            {order.isPaid ? 'Paid' : 'Unpaid'}
                          </Badge>
                        </td>
                        <td>
                          <Badge style={{ background: STATUS_COLORS[order.status] }}>
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Form.Select size="sm" value={order.status}
                            onChange={e => handleOrderStatus(order._id, e.target.value)}
                            style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444', width: 130 }}>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </Form.Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            {/* ── USERS TAB ── */}
            <Tab.Pane eventKey="users">
              <h6 style={{ color: '#fff' }} className="mb-3">All Users</h6>
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
                <Table responsive hover style={{ color: '#e0e0e0', margin: 0 }}>
                  <thead style={{ background: '#1a1a1a' }}>
                    <tr>
                      {['Name','Email','Role','Joined','Actions'].map(h => (
                        <th key={h} style={{ padding: '1rem', color: '#aaa' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} style={{ borderColor: '#2a2a2a' }}>
                        <td style={{ color: '#fff', fontWeight: 500 }}>{u.name}</td>
                        <td style={{ color: '#aaa', fontSize: '0.85rem' }}>{u.email}</td>
                        <td>
                          <Badge bg={u.role === 'admin' ? 'warning' : 'secondary'} text={u.role === 'admin' ? 'dark' : undefined}>
                            {u.role === 'admin' ? <><FaCrown className="me-1" />Admin</> : <><FaUserCircle className="me-1" />User</>}
                          </Badge>
                        </td>
                        <td style={{ color: '#888', fontSize: '0.85rem' }}>
                          {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-warning" onClick={() => openEditUser(u)}>
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDeleteUser(u._id)}>
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* ── Product Modal ── */}
        <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg" centered>
          <Modal.Header closeButton style={{ background: '#1e1e1e', borderColor: '#333' }}>
            <Modal.Title style={{ color: '#f5a623' }}>
              {editingProduct ? <><FaEdit className="me-2" />Edit Product</> : <><FaPlus className="me-2" />Add New Product</>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#1e1e1e' }}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Product Name</Form.Label>
                  <Form.Control style={inputStyle} value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Price (₹)</Form.Label>
                  <Form.Control style={inputStyle} type="number" value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Stock</Form.Label>
                  <Form.Control style={inputStyle} type="number" value={productForm.countInStock}
                    onChange={e => setProductForm({ ...productForm, countInStock: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Description</Form.Label>
              <Form.Control style={inputStyle} as="textarea" rows={3} value={productForm.description}
                onChange={e => setProductForm({ ...productForm, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Image URL</Form.Label>
              <Form.Control style={inputStyle} value={productForm.image}
                onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/..." />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Brand</Form.Label>
                  <Form.Control style={inputStyle} value={productForm.brand}
                    onChange={e => setProductForm({ ...productForm, brand: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Category</Form.Label>
                  <Form.Select style={inputStyle} value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Seller</Form.Label>
                  <Form.Select style={inputStyle} value={productForm.seller}
                    onChange={e => setProductForm({ ...productForm, seller: e.target.value })}>
                    <option>Rehan Pvt Ltd.</option>
                    <option>Amazon</option>
                    <option>Test Seller</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {productForm.image && (
              <div className="mt-2">
                <Form.Label style={labelStyle}>Image Preview</Form.Label>
                <img src={productForm.image} alt="preview"
                  style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8, border: '1px solid #444' }} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer style={{ background: '#1e1e1e', borderColor: '#333' }}>
            <Button variant="outline-secondary" onClick={() => setShowProductModal(false)}>Cancel</Button>
            <Button variant="warning" className="fw-bold" onClick={handleSaveProduct}>
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ── User Edit Modal ── */}
        <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
          <Modal.Header closeButton style={{ background: '#1e1e1e', borderColor: '#333' }}>
            <Modal.Title style={{ color: '#f5a623' }}>
              <FaEdit className="me-2" />Edit User
              </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{ background: '#1e1e1e' }}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Name</Form.Label>
              <Form.Control style={inputStyle} value={userForm.name}
                onChange={e => setUserForm({ ...userForm, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Email</Form.Label>
              <Form.Control style={inputStyle} value={userForm.email}
                onChange={e => setUserForm({ ...userForm, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Role</Form.Label>
              <Form.Select style={inputStyle} value={userForm.role}
                onChange={e => setUserForm({ ...userForm, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ background: '#1e1e1e', borderColor: '#333' }}>
            <Button variant="outline-secondary" onClick={() => setShowUserModal(false)}>Cancel</Button>
            <Button variant="warning" className="fw-bold" onClick={handleSaveUser}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};

export default AdminPage;