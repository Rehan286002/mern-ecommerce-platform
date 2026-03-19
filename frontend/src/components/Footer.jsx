import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const linkStyle = {
    color: '#aaa', textDecoration: 'none', fontSize: '0.9rem',
    display: 'block', marginBottom: '0.5rem', transition: 'color 0.2s',
  };

  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid #222', paddingTop: '3rem', paddingBottom: '1.5rem', marginTop: 'auto' }}>
      <Container>
        <Row className="mb-4">

          {/* Brand */}
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaShoppingCart style={{ color: '#f5a623', fontSize: '1.4rem' }} />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>MERN Shop</span>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: 280 }}>
              Your one-stop destination for premium electronics, fashion, sports gear and more.
              Powered by Rehan Pvt Ltd.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://github.com/Rehan286002" target="_blank" rel="noreferrer"
                style={{ color: '#aaa', fontSize: '1.2rem' }}><FaGithub /></a>
              <a href="https://www.linkedin.com/in/syedrehan2/" target="_blank" rel="noreferrer"
                style={{ color: '#aaa', fontSize: '1.2rem' }}><FaLinkedin /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 style={{ color: '#f5a623', fontWeight: 600, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Shop
            </h6>
            {[
              { label: 'All Products', to: '/' },
              { label: 'Laptops', to: '/category/Laptops' },
              { label: 'Smartphones', to: '/category/Smartphones' },
              { label: 'Gaming', to: '/category/Gaming' },
              { label: 'Accessories', to: '/category/Accessories' },
            ].map(l => (
              <Link key={l.label} to={l.to} style={linkStyle}
                onMouseOver={e => e.target.style.color = '#f5a623'}
                onMouseOut={e => e.target.style.color = '#aaa'}>
                {l.label}
              </Link>
            ))}
          </Col>

          {/* Account */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 style={{ color: '#f5a623', fontWeight: 600, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Account
            </h6>
            {[
              { label: 'Login', to: '/login' },
              { label: 'Register', to: '/register' },
              { label: 'My Orders', to: '/my-orders' },
              { label: 'Profile', to: '/profile' },
              { label: 'Cart', to: '/cart' },
            ].map(l => (
              <Link key={l.label} to={l.to} style={linkStyle}
                onMouseOver={e => e.target.style.color = '#f5a623'}
                onMouseOut={e => e.target.style.color = '#aaa'}>
                {l.label}
              </Link>
            ))}
          </Col>

          {/* Policies */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 style={{ color: '#f5a623', fontWeight: 600, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Policies
            </h6>
            {[
              { label: 'FAQ', to: '/faq' },
              { label: 'Return & Refund', to: '/refund-policy' },
              { label: 'Terms & Conditions', to: '/terms' },
              { label: 'Privacy Policy', to: '/privacy' },
            ].map(l => (
              <Link key={l.label} to={l.to} style={linkStyle}
                onMouseOver={e => e.target.style.color = '#f5a623'}
                onMouseOut={e => e.target.style.color = '#aaa'}>
                {l.label}
              </Link>
            ))}
          </Col>

          {/* Contact */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 style={{ color: '#f5a623', fontWeight: 600, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Contact
            </h6>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaEnvelope style={{ color: '#f5a623' }} />
                <span>support@mernshop.com</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaPhone style={{ color: '#f5a623' }} />
                <span>+91 98765 43210</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt style={{ color: '#f5a623', marginTop: 3 }} />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </Col>

        </Row>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #222', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: '#555', fontSize: '0.82rem', margin: 0 }}>
            © {new Date().getFullYear()} Rehan Pvt Ltd. All rights reserved.
          </p>
          <div className="d-flex align-items-center gap-3">
            {[
              { label: 'Privacy', to: '/privacy' },
              { label: 'Terms', to: '/terms' },
              { label: 'Refund', to: '/refund-policy' },
            ].map(l => (
            <Link key={l.label} to={l.to}
            style={{ color: '#555', fontSize: '0.82rem', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.color = '#f5a623'}
            onMouseOut={e => e.target.style.color = '#555'}>
              {l.label}
            </Link>
          ))}
          
          <a href="https://github.com/Rehan286002/mern-ecommerce-platform"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: '#1a1a1a', border: '1px solid #333',
            color: '#ccc', fontSize: '0.82rem', textDecoration: 'none',
            padding: '0.3rem 0.75rem', borderRadius: 6,
            transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.color = '#f5a623'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#ccc'; }}
            >
            <FaGithub style={{ fontSize: '0.9rem' }} />View Source</a>
            </div>
            </div>
            </Container>
            </footer>
          );
        };

export default Footer;