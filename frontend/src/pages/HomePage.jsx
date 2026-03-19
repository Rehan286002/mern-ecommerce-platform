import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Button, Form, Spinner, Alert,
  Pagination, Badge, Offcanvas
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFilter, FaStar, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const CATEGORIES = ['Laptops', 'Computers', 'Smartphones', 'Audio', 'TVs', 'Cameras', 'Gaming', 'Accessories'];
const BRANDS = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus', 'Sony', 'LG', 'Microsoft', 'Razer',
  'OnePlus', 'Google', 'Xiaomi', 'Canon', 'Nikon', 'DJI', 'GoPro', 'Logitech', 'Keychron', 'Bose',
  'Sennheiser', 'JBL', 'Nintendo', 'Custom', 'Acer', 'Anker'];
const SELLERS = ['Rehan Pvt Ltd.', 'Amazon'];
const RATINGS = [4, 3, 2, 1];

const defaultFilters = {
  keyword: '', category: '', brand: '', seller: '',
  minPrice: '', maxPrice: '', rating: '', inStock: false,
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, page, pages } = useSelector((s) => s.products);
  const [filters, setFilters] = useState(defaultFilters);
  const [applied, setApplied] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDrawer, setShowDrawer] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
  if (categoryName) {
    setFilters((f) => ({ ...f, category: categoryName }));
    setApplied((f) => ({ ...f, category: categoryName }));
  }
}, [categoryName]);


  useEffect(() => {
    dispatch(fetchProducts({ ...applied, page: currentPage }));
  }, [dispatch, applied, currentPage]);

  const handleApply = () => {
    setCurrentPage(1);
    setApplied({ ...filters });
    setShowDrawer(false);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setApplied(defaultFilters);
    setCurrentPage(1);
    setShowDrawer(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const activeFilterCount = Object.entries(applied).filter(([k, v]) =>
    k !== 'keyword' && v !== '' && v !== false).length;

  const FilterPanel = () => (
    <div style={{ color: '#e0e0e0' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-bold" style={{ color: '#fff' }}>Filters</h6>
        <Button variant="link" size="sm" onClick={handleReset} style={{ color: '#aaa', textDecoration: 'none' }}>
          Clear All
        </Button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold" style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Category</p>
        {CATEGORIES.map((cat) => (
          <Form.Check key={cat} type="radio" id={`cat-${cat}`} label={cat} name="category"
            checked={filters.category === cat}
            onChange={() => setFilters((f) => ({ ...f, category: f.category === cat ? '' : cat }))}
            className="mb-1" style={{ fontSize: '0.9rem' }}
          />
        ))}
      </div>

      {/* Brand */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold" style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Brand</p>
        <Form.Select size="sm" value={filters.brand}
          onChange={(e) => setFilters((f) => ({ ...f, brand: e.target.value }))}
          style={{ background: '#2a2a2a', color: '#e0e0e0', border: '1px solid #444' }}>
          <option value="">All Brands</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </Form.Select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold" style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Price Range (₹)</p>
        <Row className="g-2">
          <Col>
            <Form.Control size="sm" type="number" placeholder="Min"
              value={filters.minPrice} onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
              style={{ background: '#2a2a2a', color: '#e0e0e0', border: '1px solid #444' }} />
          </Col>
          <Col>
            <Form.Control size="sm" type="number" placeholder="Max"
              value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
              style={{ background: '#2a2a2a', color: '#e0e0e0', border: '1px solid #444' }} />
          </Col>
        </Row>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold" style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Min Rating</p>
        {RATINGS.map((r) => (
          <Form.Check key={r} type="radio" id={`rating-${r}`} name="rating"
            checked={filters.rating === String(r)}
            onChange={() => setFilters((f) => ({ ...f, rating: f.rating === String(r) ? '' : String(r) }))}
            label={<span>{Array(r).fill(null).map((_, i) => <FaStar key={i} color="#f5a623" size={12} />)} & up</span>}
            className="mb-1"
          />
        ))}
      </div>

      {/* Seller */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold" style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Seller</p>
        {SELLERS.map((s) => (
          <Form.Check key={s} type="radio" id={`seller-${s}`} name="seller" label={s}
            checked={filters.seller === s}
            onChange={() => setFilters((f) => ({ ...f, seller: f.seller === s ? '' : s }))}
            className="mb-1" style={{ fontSize: '0.9rem' }}
          />
        ))}
      </div>

      {/* In Stock */}
      <div className="mb-4">
        <Form.Check type="switch" id="inStock" label="In Stock Only"
          checked={filters.inStock}
          onChange={(e) => setFilters((f) => ({ ...f, inStock: e.target.checked }))}
        />
      </div>

      <Button variant="warning" className="w-100 fw-bold" onClick={handleApply}>
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Container fluid className="py-4 px-3 px-md-4">

        {/* Search + Mobile Filter Button */}
        <Row className="mb-3 align-items-center">
          <Col xs={9} md={10}>
            <Form onSubmit={(e) => { e.preventDefault(); handleApply(); }}>
              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Search products..."
                  value={filters.keyword}
                  onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
                  style={{ background: '#1e1e1e', color: '#fff', border: '1px solid #333' }}
                />
                <Button type="submit" variant="warning" className="fw-bold px-3">Search</Button>
              </div>
            </Form>
          </Col>
          <Col xs={3} md={2} className="d-md-none text-end">
            <Button variant="outline-warning" size="sm" onClick={() => setShowDrawer(true)}>
              <FaFilter /> {activeFilterCount > 0 && <Badge bg="warning" text="dark">{activeFilterCount}</Badge>}
            </Button>
          </Col>
        </Row>

        <Row>
          {/* Desktop Sidebar */}
          <Col md={3} lg={2} className="d-none d-md-block">
            <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1.2rem', position: 'sticky', top: 70 }}>
              <FilterPanel />
            </div>
          </Col>

          {/* Products Grid */}
          <Col md={9} lg={10}>
            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-3">
                {applied.category && <Badge bg="secondary" className="d-flex align-items-center gap-1 p-2">{applied.category} <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, category: '' })); setFilters((f) => ({ ...f, category: '' })); }} /></Badge>}
                {applied.brand && <Badge bg="secondary" className="d-flex align-items-center gap-1 p-2">{applied.brand} <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, brand: '' })); setFilters((f) => ({ ...f, brand: '' })); }} /></Badge>}
                {applied.seller && <Badge bg="secondary" className="d-flex align-items-center gap-1 p-2">{applied.seller} <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, seller: '' })); setFilters((f) => ({ ...f, seller: '' })); }} /></Badge>}
                {applied.rating && <Badge bg="secondary" className="d-flex align-items-center gap-1 p-2">⭐ {applied.rating}+ <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, rating: '' })); setFilters((f) => ({ ...f, rating: '' })); }} /></Badge>}
                {(applied.minPrice || applied.maxPrice) && <Badge bg="secondary" className="d-flex align-items-center gap-1 p-2">₹{applied.minPrice || 0} - ₹{applied.maxPrice || '∞'} <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, minPrice: '', maxPrice: '' })); setFilters((f) => ({ ...f, minPrice: '', maxPrice: '' })); }} /></Badge>}
                {applied.inStock && <Badge bg="success" className="d-flex align-items-center gap-1 p-2">In Stock <FaTimes style={{ cursor: 'pointer' }} onClick={() => { setApplied((f) => ({ ...f, inStock: false })); setFilters((f) => ({ ...f, inStock: false })); }} /></Badge>}
              </div>
            )}

            {loading && <div className="text-center mt-5"><Spinner animation="border" variant="warning" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && products.length === 0 && (
              <Alert variant="dark" className="text-center">No products found. Try adjusting your filters.</Alert>
            )}

            <Row>
              {products.map((p) => (
                <Col key={p._id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                  <Card className="h-100 border-0 shadow" style={{ background: '#1e1e1e', color: '#e0e0e0', borderRadius: 12 }}>
                    <div style={{ overflow: 'hidden', borderRadius: '12px 12px 0 0', height: 180 }}>
                      <Card.Img
                        variant="top"
                        src={p.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        style={{ height: 180, objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.3s' }}
                        onClick={() => navigate(`/product/${p._id}`)}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column p-3">
                      <div className="mb-1">
                        <Badge bg="dark" style={{ fontSize: '0.7rem', border: '1px solid #444' }}>{p.category}</Badge>
                      </div>
                      <Card.Title style={{ fontSize: '0.9rem', cursor: 'pointer', color: '#fff' }}
                        onClick={() => navigate(`/product/${p._id}`)}>
                        {p.name}
                      </Card.Title>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ color: '#f5a623', fontWeight: 700, fontSize: '1rem' }}>₹{p.price.toLocaleString()}</span>
                        <small style={{ color: '#aaa' }}>⭐ {p.rating} ({p.numReviews})</small>
                      </div>
                      <small style={{ color: '#888' }} className="mb-3">Sold by {p.seller || 'Rehan Pvt Ltd.'}</small>
                      {p.countInStock === 0 && <Badge bg="danger" className="mb-2" style={{ width: 'fit-content' }}>Out of Stock</Badge>}
                      <div className="mt-auto d-flex gap-2">
                        <Button size="sm" variant="outline-light" onClick={() => navigate(`/product/${p._id}`)} style={{ flex: 1 }}>Details</Button>
                        <Button size="sm" variant="warning" disabled={p.countInStock === 0}
                          onClick={() => handleAddToCart(p)} style={{ flex: 1, fontWeight: 600 }}>
                          {p.countInStock === 0 ? 'Sold Out' : 'Add to Cart'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {pages > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} />
                  {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item key={x + 1} active={x + 1 === page} onClick={() => setCurrentPage(x + 1)}>{x + 1}</Pagination.Item>
                  ))}
                  <Pagination.Next disabled={currentPage === pages} onClick={() => setCurrentPage((p) => p + 1)} />
                </Pagination>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Mobile Filter Drawer */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="start"
        style={{ background: '#1a1a1a', color: '#e0e0e0', width: 280 }}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ color: '#fff' }}>
            <FaFilter className="me-2" /> Filters
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterPanel />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default HomePage;
