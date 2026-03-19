import { Container, Row, Col } from 'react-bootstrap';
import { FaFileContract } from 'react-icons/fa';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using MERN Shop ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, users, and registered customers of MERN Shop operated by Rehan Pvt Ltd.`
  },
  {
    title: '2. User Accounts',
    content: `You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. Rehan Pvt Ltd. reserves the right to suspend or terminate accounts that violate these terms.`
  },
  {
    title: '3. Products and Pricing',
    content: `All products listed on MERN Shop are subject to availability. Prices are displayed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. Rehan Pvt Ltd. reserves the right to modify prices at any time without prior notice. In the event of a pricing error, we reserve the right to cancel orders placed at incorrect prices and issue full refunds.`
  },
  {
    title: '4. Orders and Payments',
    content: `Placing an order constitutes an offer to purchase. Orders are confirmed only after successful payment processing. We accept Stripe, UPI, Net Banking, and Cash on Delivery. All online transactions are secured using SSL encryption. We reserve the right to refuse or cancel any order for reasons including product unavailability, errors in pricing, or suspected fraudulent activity.`
  },
  {
    title: '5. Shipping and Delivery',
    content: `Delivery timelines are estimates and not guarantees. Rehan Pvt Ltd. is not liable for delays caused by courier partners, natural disasters, government restrictions, or other circumstances beyond our control. Risk of loss and title for products pass to you upon delivery. It is your responsibility to inspect the product upon delivery and report any damage immediately.`
  },
  {
    title: '6. Returns and Refunds',
    content: `Products may be returned within 7 days of delivery subject to our Return Policy. Items must be unused, undamaged, and in original packaging. Refunds are processed within 7-10 business days after we receive and inspect the returned item. Digital products and software are non-refundable. We reserve the right to deny returns that do not meet our policy criteria.`
  },
  {
    title: '7. Intellectual Property',
    content: `All content on MERN Shop including but not limited to logos, text, images, graphics, and software is the property of Rehan Pvt Ltd. and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written permission from Rehan Pvt Ltd.`
  },
  {
    title: '8. Limitation of Liability',
    content: `To the maximum extent permitted by law, Rehan Pvt Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform, products purchased, or any unauthorized access to your account. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.`
  },
  {
    title: '9. Governing Law',
    content: `These Terms and Conditions are governed by the laws of India. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.`
  },
  {
    title: '10. Changes to Terms',
    content: `Rehan Pvt Ltd. reserves the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Your continued use of the platform after changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.`
  },
];

const TermsPage = () => (
  <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '5rem' }}>

    {/* Hero Banner */}
    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 100%)', borderBottom: '1px solid #333', padding: '3rem 0' }}>
      <Container>
        <div className="d-flex align-items-center gap-3">
          <FaFileContract style={{ fontSize: '2.5rem', color: '#f5a623' }} />
          <div>
            <h2 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Terms & Conditions</h2>
            <p style={{ color: '#888', margin: 0, marginTop: 4 }}>Last updated: March 2026 · Rehan Pvt Ltd.</p>
          </div>
        </div>
      </Container>
    </div>

    <Container className="py-5">
      <Row>
        {/* Table of Contents — sticky sidebar */}
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
          </div>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          {/* Intro box */}
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', borderLeft: '4px solid #f5a623', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <p style={{ color: '#aaa', margin: 0, lineHeight: 1.9, fontSize: '0.95rem' }}>
              Please read these Terms and Conditions carefully before using MERN Shop. By accessing or using our platform,
              you acknowledge that you have read, understood, and agree to be bound by these terms.
              If you have any questions, contact us at{' '}
              <a href="mailto:legal@mernshop.com" style={{ color: '#f5a623' }}>legal@mernshop.com</a>.
            </p>
          </div>

          {/* Sections */}
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

          {/* Contact box */}
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginTop: '1rem' }}>
            <h6 style={{ color: '#fff', marginBottom: '0.5rem' }}>Questions about these terms?</h6>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
              Email us at{' '}
              <a href="mailto:legal@mernshop.com" style={{ color: '#f5a623' }}>legal@mernshop.com</a>
              {' '}and we'll respond within 2 business days.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default TermsPage;
