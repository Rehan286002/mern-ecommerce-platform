import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaShoppingCart, FaUser, FaTachometerAlt, FaSignOutAlt, FaBoxOpen } from 'react-icons/fa';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🛒 MERN Shop</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Cart{' '}
              {cartItems.length > 0 && <Badge bg="warning" text="dark">{cartItems.length}</Badge>}
            </Nav.Link>
            {userInfo ? (
              <>
                <Nav.Link as={Link} to="/profile"><FaUser /> {userInfo.name}</Nav.Link>
                {userInfo.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin"><FaTachometerAlt /> Admin</Nav.Link>
                )}
                <Nav.Link as={Link} to="/my-orders" style={{ color: '#fff' }}>
                <FaBoxOpen className="me-1" /> Orders </Nav.Link>
                <Nav.Link onClick={handleLogout}><FaSignOutAlt /> Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login"><FaUser /> Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;