import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Badge, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { fetchMyOrders } from '../redux/orderSlice';
import { toast } from 'react-toastify';
import { FaUser, FaMapMarkerAlt, FaLock, FaBoxOpen, FaRupeeSign, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!userInfo) { navigate('/login'); return; }
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/users/profile');
        setProfileData(data);
        setName(data.name || '');
        setPhone(data.phone || '');
        setStreet(data.address?.street || '');
        setCity(data.address?.city || '');
        setState(data.address?.state || '');
        setPostalCode(data.address?.postalCode || '');
        setCountry(data.address?.country || 'India');
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
    dispatch(fetchMyOrders());
  }, [userInfo, navigate, dispatch]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.put('/users/profile', {
        name, phone,
        address: { street, city, state, postalCode, country },
      });
      setProfileData(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordError('');
    setLoading(true);
    try {
      await axiosInstance.put('/users/profile', { password: newPassword });
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  if (!profileData) return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" style={{ color: '#f5a623' }} />
    </div>
  );

  const inputStyle = { background: '#2a2a2a', color: '#fff', border: '1px solid #444' };
  const labelStyle = { color: '#aaa', fontSize: '0.9rem' };

  return (
    <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Container className="py-4">

        {/* Profile Header */}
        <div style={{ background: 'linear-gradient(135deg, #1e1e1e 0%, #2a1f0a 100%)', borderRadius: 16, border: '1px solid #333', padding: '2rem', marginBottom: '2rem' }}>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #f5a623, #e08e00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 700, color: '#000', flexShrink: 0,
              boxShadow: '0 4px 15px rgba(245,166,35,0.4)',
            }}>
              {getInitials(profileData.name)}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>{profileData.name}</h4>
              <div className="d-flex align-items-center gap-2 mt-1">
                <FaEnvelope style={{ color: '#f5a623', fontSize: '0.85rem' }} />
                <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{profileData.email}</span>
              </div>
              {profileData.phone && (
                <div className="d-flex align-items-center gap-2 mt-1">
                  <FaPhone style={{ color: '#f5a623', fontSize: '0.85rem' }} />
                  <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{profileData.phone}</span>
                </div>
              )}
              <div className="d-flex align-items-center gap-2 mt-1">
                <FaCalendarAlt style={{ color: '#f5a623', fontSize: '0.85rem' }} />
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  Joined {new Date(profileData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Role badge */}
            <Badge bg={profileData.role === 'admin' ? 'warning' : 'secondary'}
              text={profileData.role === 'admin' ? 'dark' : undefined}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              {profileData.role === 'admin' ? 'Admin' : 'Customer'}
            </Badge>
          </div>

          {/* Stats Row */}
          <Row className="mt-4 g-3">
            <Col xs={6} md={3}>
              <div style={{ background: '#1a1a1a', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #2a2a2a' }}>
                <FaBoxOpen style={{ color: '#f5a623', marginBottom: 6 }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{orders.length}</div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>Total Orders</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div style={{ background: '#1a1a1a', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #2a2a2a' }}>
                <FaRupeeSign style={{ color: '#f5a623', marginBottom: 6 }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>₹{totalSpent.toLocaleString()}</div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>Total Spent</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div style={{ background: '#1a1a1a', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #2a2a2a' }}>
                <FaBoxOpen style={{ color: '#198754', marginBottom: 6 }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>
                  {orders.filter(o => o.status === 'Delivered').length}
                </div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>Delivered</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div style={{ background: '#1a1a1a', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #2a2a2a' }}>
                <FaBoxOpen style={{ color: '#0dcaf0', marginBottom: 6 }} />
                <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>
                  {orders.filter(o => ['Pending', 'Processing', 'Shipped'].includes(o.status)).length}
                </div>
                <div style={{ color: '#888', fontSize: '0.78rem' }}>Active Orders</div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Tabs */}
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="mb-4" style={{ borderColor: '#333' }}>
            {[
              { key: 'profile', label: 'Personal Info', icon: <FaUser /> },
              { key: 'address', label: 'Address', icon: <FaMapMarkerAlt /> },
              { key: 'password', label: 'Change Password', icon: <FaLock /> },
            ].map(tab => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key} style={{
                  color: activeTab === tab.key ? '#f5a623' : '#aaa',
                  background: activeTab === tab.key ? '#1e1e1e' : 'transparent',
                  border: activeTab === tab.key ? '1px solid #333' : '1px solid transparent',
                  borderBottom: 'none', marginRight: 4,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {tab.icon} {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>

            {/* Personal Info Tab */}
            <Tab.Pane eventKey="profile">
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '2rem', maxWidth: 600 }}>
                <h6 style={{ color: '#f5a623', marginBottom: '1.5rem' }}>
                  <FaUser className="me-2" />Personal Information
                </h6>
                <Form onSubmit={handleSaveProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Full Name</Form.Label>
                    <Form.Control style={inputStyle} value={name}
                      onChange={e => setName(e.target.value)} required placeholder="Your full name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Email Address</Form.Label>
                    <Form.Control style={{ ...inputStyle, opacity: 0.6 }}
                      value={profileData.email} disabled />
                    <Form.Text style={{ color: '#666' }}>Email cannot be changed.</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={labelStyle}>Phone Number</Form.Label>
                    <Form.Control style={inputStyle} value={phone}
                      onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                  </Form.Group>
                  <Button type="submit" variant="warning" className="fw-bold" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Save Changes'}
                  </Button>
                </Form>
              </div>
            </Tab.Pane>

            {/* Address Tab */}
            <Tab.Pane eventKey="address">
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '2rem', maxWidth: 600 }}>
                <h6 style={{ color: '#f5a623', marginBottom: '1.5rem' }}>
                  <FaMapMarkerAlt className="me-2" />Saved Address
                </h6>
                <Form onSubmit={handleSaveProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Street Address</Form.Label>
                    <Form.Control style={inputStyle} value={street}
                      onChange={e => setStreet(e.target.value)} placeholder="House No., Street, Area" />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>City</Form.Label>
                        <Form.Control style={inputStyle} value={city}
                          onChange={e => setCity(e.target.value)} placeholder="Chennai" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>State</Form.Label>
                        <Form.Control style={inputStyle} value={state}
                          onChange={e => setState(e.target.value)} placeholder="Tamil Nadu" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>Postal Code</Form.Label>
                        <Form.Control style={inputStyle} value={postalCode}
                          onChange={e => setPostalCode(e.target.value)} placeholder="600001" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>Country</Form.Label>
                        <Form.Select style={inputStyle} value={country}
                          onChange={e => setCountry(e.target.value)}>
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
                  <Button type="submit" variant="warning" className="fw-bold" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Save Address'}
                  </Button>
                </Form>
              </div>
            </Tab.Pane>

            {/* Password Tab */}
            <Tab.Pane eventKey="password">
              <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '2rem', maxWidth: 500 }}>
                <h6 style={{ color: '#f5a623', marginBottom: '1.5rem' }}>
                  <FaLock className="me-2" />Change Password
                </h6>
                {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                <Form onSubmit={handleChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>New Password</Form.Label>
                    <Form.Control style={inputStyle} type="password" value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Min. 6 characters" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label style={labelStyle}>Confirm New Password</Form.Label>
                    <Form.Control style={inputStyle} type="password" value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password" required />
                  </Form.Group>
                  <Button type="submit" variant="warning" className="fw-bold" disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : 'Update Password'}
                  </Button>
                </Form>
              </div>
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>

      </Container>
    </div>
  );
};

export default ProfilePage;