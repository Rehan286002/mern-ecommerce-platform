import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCrown } from 'react-icons/fa';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      const redirect = new URLSearchParams(location.search).get('redirect');
      navigate(redirect || '/');
    }
  }, [userInfo, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* Demo Credentials */}
<div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: 8, padding: '0.9rem', marginBottom: '1rem' }}>
  <p style={{ color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 0.6rem' }}>
    Demo credentials — click to fill
  </p>
  <div className="d-flex gap-2">
    <button onClick={() => fillCredentials('user')}
      style={{ flex: 1, background: '#fff', border: '1px solid #ddd', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.82rem' }}>
      <div className="d-flex align-items-center gap-1 mb-1">
        <FaUserCircle style={{ color: '#666' }} />
        <span style={{ fontWeight: 600 }}>User</span>
      </div>
      <div style={{ color: '#888', fontSize: '0.75rem' }}>user@test.com / 123456</div>
    </button>
    <button onClick={() => fillCredentials('admin')}
      style={{ flex: 1, background: '#fff', border: '1px solid #ddd', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.82rem' }}>
      <div className="d-flex align-items-center gap-1 mb-1">
        <FaCrown style={{ color: '#f5a623' }} />
        <span style={{ fontWeight: 600 }}>Admin</span>
      </div>
      <div style={{ color: '#888', fontSize: '0.75rem' }}>admin@test.com / 123456</div>
    </button>
  </div>
</div>
      <Card style={{ width: '100%', maxWidth: 420 }} className="p-4 shadow">
        <h3 className="mb-4 text-center">Sign In</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="dark" className="w-100" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>
        <div className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;