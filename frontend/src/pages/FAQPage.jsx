import { Container, Accordion } from 'react-bootstrap';
import { FaQuestionCircle, FaShoppingCart, FaTruck, FaUndoAlt, FaUser, FaBox } from 'react-icons/fa';

const faqs = [
  {
    category: 'Orders & Purchasing',
    icon: <FaShoppingCart />,
    items: [
      { q: 'How do I place an order?', a: 'Browse our products, add items to your cart, proceed to checkout, fill in your shipping details and choose a payment method. Your order will be confirmed immediately.' },
      { q: 'Can I modify or cancel my order after placing it?', a: 'Orders can be cancelled or modified within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact support immediately if needed.' },
      { q: 'How do I track my order?', a: 'Go to My Orders from the navbar. Click "View" on any order to see the full tracking timeline showing current status from Order Placed to Delivered.' },
      { q: 'What payment methods do you accept?', a: 'We accept Stripe (credit/debit cards), UPI, Net Banking, and Cash on Delivery. All online payments are secured with industry-standard encryption.' },
    ]
  },
  {
    category: 'Shipping & Delivery',
    icon: <FaTruck />,
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5 business days. Express delivery takes 2 business days. Orders above ₹50,000 qualify for free delivery on both options.' },
      { q: 'Do you deliver across India?', a: 'Yes! We deliver to all major cities and towns across India. International shipping is available to select countries including UAE, USA, UK, Singapore, Australia and Canada.' },
      { q: 'What are the delivery charges?', a: 'Standard delivery costs ₹99. Express delivery costs ₹499. Orders above ₹50,000 get free delivery automatically on both standard and express options.' },
      { q: 'What if I miss my delivery?', a: 'Our delivery partner will attempt delivery 3 times. After 3 failed attempts, the order is returned to our warehouse and a refund is initiated within 5-7 business days.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    icon: <FaUndoAlt />,
    items: [
      { q: 'What is your return policy?', a: 'We offer a 7-day return window from the date of delivery. Products must be unused, in original packaging with all accessories and tags intact.' },
      { q: 'How long do refunds take?', a: 'Once we receive and inspect the returned product, refunds are processed within 2-3 business days. The amount reflects in your account within 5-7 business days depending on your bank.' },
      { q: 'Are there any products that cannot be returned?', a: 'Software, digital products, personal care items, and products marked as non-returnable cannot be returned. Damaged or used products will not be accepted for return.' },
    ]
  },
  {
    category: 'Account & Security',
    icon: <FaUser />,
    items: [
      { q: 'How do I create an account?', a: 'Click "Login" in the navbar then click "Register". Fill in your name, email and password. Your account will be created instantly.' },
      { q: 'I forgot my password. What do I do?', a: 'Currently please contact our support at support@mernshop.com with your registered email and we will reset your password manually. A self-service reset feature is coming soon.' },
      { q: 'Is my personal data safe?', a: 'Absolutely. We use industry-standard encryption for all data. We never sell your personal information to third parties. Read our Privacy Policy for full details.' },
    ]
  },
  {
    category: 'Products & Stock',
    icon: <FaBox />,
    items: [
      { q: 'Are all products genuine?', a: 'Yes, all products on MERN Shop are 100% genuine and sourced directly from authorized distributors and brand partners. We do not sell grey market or counterfeit products.' },
      { q: 'What does "Out of Stock" mean?', a: 'Out of Stock means the product is temporarily unavailable. We restock regularly. You can check back later or browse similar products in the same category.' },
      { q: 'Do you offer product warranties?', a: 'All products come with the manufacturer\'s standard warranty. Electronics typically come with 1 year warranty. Warranty claims must be directed to the respective brand service centers.' },
    ]
  },
];

const FAQPage = () => (
  <div style={{ background: '#121212', minHeight: '100vh', paddingBottom: '4rem' }}>

    {/* Hero Banner */}
    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a1a0a 100%)', borderBottom: '1px solid #333', padding: '3rem 0' }}>
      <Container>
        <div className="d-flex align-items-center gap-3">
          <FaQuestionCircle style={{ fontSize: '2.5rem', color: '#f5a623' }} />
          <div>
            <h2 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Frequently Asked Questions</h2>
            <p style={{ color: '#888', margin: 0, marginTop: 4 }}>
              Find answers to the most common questions about shopping on MERN Shop.
            </p>
          </div>
        </div>
      </Container>
    </div>

    <Container className="py-5">
      {faqs.map((section, si) => (
        <div key={si} className="mb-5">
          <h5 style={{
            color: '#f5a623', marginBottom: '1rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            {section.icon} {section.category}
          </h5>
          <Accordion>
            {section.items.map((item, i) => (
              <Accordion.Item key={i} eventKey={`${si}-${i}`}
                style={{ background: '#1e1e1e', border: '1px solid #2a2a2a', marginBottom: '0.5rem' }}>
                <Accordion.Header>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{item.q}</span>
                </Accordion.Header>
                <Accordion.Body style={{ background: '#1a1a1a', color: '#aaa', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {item.a}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}

      {/* Contact box */}
      <div style={{ background: '#1e1e1e', borderRadius: 12, border: '1px solid #333', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <FaQuestionCircle style={{ fontSize: '2rem', color: '#f5a623', marginBottom: '0.8rem' }} />
        <h6 style={{ color: '#fff' }}>Still have questions?</h6>
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          Our support team is available Mon-Sat, 9AM to 6PM IST.
        </p>
        <a href="mailto:support@mernshop.com"
          style={{ background: '#f5a623', color: '#000', padding: '0.6rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          Email Support
        </a>
      </div>
    </Container>
  </div>
);

export default FAQPage;