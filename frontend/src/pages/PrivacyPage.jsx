import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, place an order, or contact support. This includes your name, email address, phone number, shipping address, and payment information (processed securely via Stripe — we never store card details). We also collect usage data such as pages visited, products viewed, search queries, and device information through cookies and analytics tools.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to process and fulfill your orders, send order confirmations and shipping updates, provide customer support, improve our platform and personalize your experience, send promotional emails (only with your consent), detect and prevent fraudulent transactions, and comply with legal obligations. We do not sell your personal information to any third party under any circumstances.`
  },
  {
    title: '3. Cookies and Tracking',
    content: `We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, keep you logged in, and analyze platform traffic. You can control cookie settings through your browser settings. Disabling cookies may affect some functionality of the platform such as staying logged in or cart persistence between sessions.`
  },
  {
    title: '4. Data Sharing',
    content: `We share your data only with trusted third parties necessary to operate our service: shipping partners to deliver your orders, payment processors including Stripe and UPI providers, and analytics tools to improve our platform. All third parties are bound by confidentiality agreements. We may also disclose information when required by law or to protect the rights and safety of our users and the public.`
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information. All passwords are hashed and never stored in plain text. However, no method of transmission over the internet is 100% secure. We encourage you to use strong, unique passwords and never share your account credentials with anyone.`
  },
  {
    title: '6. Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@mernshop.com. Note that some data may be retained for legal and regulatory compliance purposes even after account deletion, as required by applicable Indian laws.`
  },
  {
    title: '7. Your Rights',
    content: `You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, opt out of marketing communications at any time, and lodge a complaint with a supervisory authority. To exercise any of these rights, contact us at privacy@mernshop.com and we will respond within 7 business days.`
  },
  {
    title: '8. Children\'s Privacy',
    content: `MERN Shop is not intended for children under 18 years of age. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information without parental consent, please contact us immediately at support@mernshop.com and we will take steps to delete such information promptly.`
  },
  {
    title: '9. Third-Party Links',
    content: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies solely to information collected by MERN Shop.`
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make significant changes, we will notify you via email or a prominent notice on our platform. Your continued use of the platform after changes are posted constitutes your acceptance of the updated policy.`
  },
];

const PrivacyPage = () => (
  <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '5rem' }}>

    {/* Hero Banner */}
    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a1a2a 100%)', borderBottom: '1px solid #333', padding: '3rem 0' }}>
      <Container>
        <div className="d-flex align-items-center gap-3">
          <FaShieldAlt style={{ fontSize: '2.5rem', color: '#f5a623' }} />
          <div>
            <h2 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Privacy Policy</h2>
            <p style={{ color: '#888', margin: 0, marginTop: 4 }}>Last updated: March 2026 · Rehan Pvt Ltd.</p>
          </div>
        </div>
      </Container>
    </div>

    <Container className="py-5">
      <Row>
        {/* Sticky sidebar TOC */}
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
          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #2a2a2a', borderLeft: '4px solid #f5a623', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <p style={{ color: '#aaa', margin: 0, lineHeight: 1.9, fontSize: '0.95rem' }}>
              At Rehan Pvt Ltd., we are committed to protecting your privacy and ensuring transparency about how
              we handle your personal data. This policy explains what we collect, why we collect it, and how we
              keep it safe. For questions, contact{' '}
              <a href="mailto:privacy@mernshop.com" style={{ color: '#f5a623' }}>privacy@mernshop.com</a>.
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

          <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '1.5rem', marginTop: '1rem' }}>
            <h6 style={{ color: '#fff', marginBottom: '0.5rem' }}>Privacy concerns?</h6>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
              Email us at{' '}
              <a href="mailto:privacy@mernshop.com" style={{ color: '#f5a623' }}>privacy@mernshop.com</a>
              {' '}and we'll respond within 7 business days.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default PrivacyPage;