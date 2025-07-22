import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Container, Row, Col, Badge, Nav } from 'react-bootstrap';
import Nav2 from './Nav2';

function Catlog() {
  const navigate = useNavigate();
  const location = useLocation();

  const storeName =
    location.state?.storeName ||
    localStorage.getItem('storeName') ||
    'Your Store';

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    setProduct(savedProducts);
  }, []);

  const filteredProducts = product.filter(
    (p) =>
      p.storeName &&
      p.storeName.toLowerCase().trim() === storeName.toLowerCase().trim()
  );

  console.log('Store name received:', storeName);
  console.log('All products:', product);
  console.log('Filtered products:', filteredProducts);

  if (filteredProducts.length === 0) {
    return (
      <div className='a' style={{display:"flex"}}>
       <Nav2/>
      <Container className="py-5 text-center">
        <h4 className="text-danger">
          ❌ No products found for "{storeName}".
        </h4>
      </Container>
      </div>
    );
  }


  return (
    <>
    <div className='a' style={{display:"flex"}}>
    <Nav2/>
    <Container className="catalog-container py-5">
      <h2 className="section-title text-center mb-4">
        🛍️ Products for "{storeName}"
      </h2>
      <Row>
        {filteredProducts.map((product, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="product-card shadow">
              {product.media && (
                <Card.Img
                  variant="top"
                  src={product.media}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.category}
                </Card.Subtitle>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
                <p>
                  <strong>Discounted:</strong>{' '}
                  {product.discountedPrice
                    ? `₹${product.discountedPrice}`
                    : 'N/A'}
                </p>
                <p>
                  <strong>Quantity:</strong>{' '}
                  {product.quantity || 'Not specified'}
                </p>
                <p>
                  <strong>SKU:</strong> {product.sku || 'Not specified'}
                </p>
                <p>{product.description || 'No description provided.'}</p>

                {product.variants?.length > 0 && (
                  <div>
                    <strong>Variants:</strong>
                    {product.variants.map((v, vi) => (
                      <div key={vi}>
                        <em>{v.name}:</em>{' '}
                        {v.values.map((val, i) => (
                          <Badge key={i} bg="info" className="me-2">
                            {val}
                          </Badge>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
</div>
    </>
  );
}

export default Catlog;
