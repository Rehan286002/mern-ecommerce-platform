import { Container, Row, Col } from 'react-bootstrap';
import { FaUndoAlt, FaCheckCircle, FaTimesCircle, FaClock, FaTruck, FaBoxOpen } from 'react-icons/fa';

const sections = [
  {
    title: '1. Return Eligibility',
    content: `Products are eligible for return within 7 days of delivery. To be eligible, items must be unused and in the same condition as received, in original packaging with all accessories, tags, and manuals included, and accompanied by the original invoice or order confirmation. Returns initiated after 7 days from the delivery date will not be accepted under any circumstances.`
  },
  {
    title: '2. Non-Returnable Items',
    content: `The following items cannot be returned: software and digital products once downloaded or activated, personal care and hygiene products, products marked as "Final Sale" or "Non-Returnable" on the product page, items damaged due to misuse, accidental damage, or unauthorized modifications, and products without original packaging or missing accessories.`
  },
  {
    title: '3. How to Initiate a Return',
    content: `To initiate a return, go to My Orders in your account and find the relevant order. Click "View" to open the order detail page and select "Request Return", providing a reason for the return. Our team will review your request within 24 hours and send a confirmation email. Once approved, you will receive a pickup schedule from our courier partner. Please ensure the product is securely packed before the scheduled pickup time.`
  },
  {
    title: '4. Refund Processing Timeline',
    content: `Once we receive and inspect the returned product (typically within 2-3 business days of pickup), we will notify you by email of the approval or rejection of your refund. If approved, refunds are processed within 2-3 business days. The amount will reflect in your original payment method within 5-7 business days depending on your bank or payment provider. UPI and Net Banking refunds may be faster.`
  },
  {
    title: '5. Exchange Policy',
    content: `We offer exchanges for defective or damaged products received. To request an exchange, contact our support team within 48 hours of delivery with clear photos of the damage and your order number. Exchanges are subject to product availability. If the exact same product is unavailable, we will offer an alternative or issue a full refund instead.`
  },
  {
    title: '6. Damaged or Incorrect Products',
    content: `If you receive a damaged, defective, or incorrect product, please contact us at support@mernshop.com within 48 hours of delivery. Include your order number and clear photographs showing the issue. We will arrange a free pickup and send a replacement or issue a full refund at absolutely no additional cost to you. We take quality seriously and will resolve such issues as a top priority.`
  },
  {
    title: '7. Refunds for Cancelled Orders',
    content: `Orders cancelled before shipment will receive a full refund within 2-3 business days. Orders cancelled after shipment must go through the standard return process once delivered. For Cash on Delivery orders, refunds will be issued via bank transfer — please provide your bank account details to our support team when requesting the refund.`
  },
];

const eligible = [
  'Unused product in original packaging',
  'All accessories and manuals included',
  'Return initiated within 7 days of delivery',
  'Original invoice or order ID available',
  'Product not marked as non-returnable',
];

const notEligible = [
  'Product used, worn, or damaged by customer',
  'Missing original packaging or accessories',
  'Digital products or software',
  'Return requested after 7 days of delivery',
  'Personal care or hygiene items',
];

const RefundPage = () => (
  <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '5rem' }}>

    {/* Hero Banner */}
    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #1a0a0a 100%)', borderBottom: '1px solid #333', padding: '3rem 0' }}>
      <Container>
        <div className="d-flex align-items-center gap-3">
          <FaUndoAlt style={{ fontSize: '2.5rem', color: '#f5a623' }} />
          <div>
            <h2 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Return & Refund Policy</h2>
            <p style={{ color: '#888', margin: 0, marginTop: 4 }}>Last updated: March 2026 · Rehan Pvt Ltd.</p>
          </div>
        </div>
      </Container>
    </div>

    <Container className="py-5">

      {/* Quick Stats */}
      <Row className="mb-5 g-3">
        <Col md={4}>
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', padding: '1.5rem', textAlign: 'center' }}>
            <FaBoxOpen style={{ fontSize: '2rem', color: '#f5a623', marginBottom: '0.8rem' }} />
            <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>7 Days</div>
            <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: 4 }}>Easy Return Window</div>
          </div>
        </Col>
        <Col md={4}>
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', padding: '1.5rem', textAlign: 'center' }}>
            <FaClock style={{ fontSize: '2rem', color: '#f5a623', marginBottom: '0.8rem' }} />
            <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>2-3 Days</div>
            <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: 4 }}>Refund Processing Time</div>
          </div>
        </Col>
        <Col md={4}>
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', padding: '1.5rem', textAlign: 'center' }}>
            <FaTruck style={{ fontSize: '2rem', color: '#f5a623', marginBottom: '0.8rem' }} />
            <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>Free</div>
            <div style={{ color: '#aaa', fontSize: '0.85rem', marginTop: 4 }}>Return Pickup</div>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Sidebar */}
        <Col lg={3} className="d-none d-lg-block">
          <div style={{ position: 'sticky', top: 80, background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', padding: '1.5rem' }}>
            <h6 style={{ color: '#f5a623', marginBottom: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Contents
            </h6>
            {sections.map((s, i) => (
              <a key={i} href={`#section-${i}`}
                style={{ display: 'block', color: '#888', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.6rem', lineHeight: 1.4 }}
                onMouseOver={e => e.target.style.color = '#f5a623'}
                onMouseOut={e => e.target.style.color = '#888'}>
                {s.title}
              </a>
            ))}

            {/* Eligible quick ref */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #2a2a2a' }}>
              <h6 style={{ color: '#ff6b6b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, margin: '1rem 0 0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaTimesCircle /> Not Eligible
                </h6>
                {eligible.map((item, i) => (
                <div key={i} className="d-flex gap-2 mb-2" style={{ color: '#888', fontSize: '0.78rem' }}>
                  <FaCheckCircle style={{ color: '#90ee90', flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </div>
              ))}
              <h6 style={{ color: '#ff6b6b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, margin: '1rem 0 0.8rem',  display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaTimesCircle /> Not Eligible
              </h6>

              {notEligible.map((item, i) => (
                <div key={i} className="d-flex gap-2 mb-2" style={{ color: '#888', fontSize: '0.78rem' }}>
                  <FaTimesCircle style={{ color: '#ff6b6b', flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', borderLeft: '4px solid #f5a623', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <p style={{ color: '#aaa', margin: 0, lineHeight: 1.9, fontSize: '0.95rem' }}>
              At Rehan Pvt Ltd., customer satisfaction is our top priority. We offer a hassle-free 7-day return policy
              on most products. Please read this policy carefully to understand the process and conditions for returns and refunds.
              For help, contact{' '}
              <a href="mailto:support@mernshop.com" style={{ color: '#f5a623' }}>support@mernshop.com</a>.
            </p>
          </div>

          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`} style={{ marginBottom: '2.5rem', scrollMarginTop: 90 }}>
              <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid #2a2a2a' }}>
                {s.title}
              </h5>
              <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '0.95rem', margin: 0 }}>
                {s.content}
              </p>
            </div>
          ))}

          {/* Mobile eligible/not eligible */}
          <Row className="d-lg-none mb-4 g-3">
            <Col sm={6}>
              <div style={{ background: '#1e1e1e', borderRadius: 10, border: '1px solid #2a2a2a', padding: '1rem' }}>
                <h6 style={{ color: '#90ee90', marginBottom: '0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaCheckCircle /> Eligible for Return
                    </h6>
                {eligible.map((item, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <FaCheckCircle style={{ color: '#90ee90', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: '#aaa', fontSize: '0.82rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col sm={6}>
              <div style={{ background: '#1e1e1e', borderRadius: 10, border: '1px solid #2a2a2a', padding: '1rem' }}>
                <h6 style={{ color: '#ff6b6b', marginBottom: '0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaTimesCircle /> Not Eligible
                    </h6>
                {notEligible.map((item, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <FaTimesCircle style={{ color: '#ff6b6b', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: '#aaa', fontSize: '0.82rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginTop: '1rem' }}>
            <h6 style={{ color: '#fff', marginBottom: '0.5rem' }}>Need help with a return?</h6>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
              Contact our support team at{' '}
              <a href="mailto:support@mernshop.com" style={{ color: '#f5a623' }}>support@mernshop.com</a>
              {' '}— available Monday to Saturday, 9AM to 6PM IST.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default RefundPage;