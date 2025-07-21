import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get store name from state or localStorage
  const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

  // Save to localStorage if received from router
  useEffect(() => {
    if (location.state?.storeName && location.state.storeName !== 'Your Store') {
      localStorage.setItem("storeName", location.state.storeName);
    }
  }, [location.state]);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    discountedPrice: '',
    description: '',
    media: null,
    quantity: '',
    sku: ''
  });

  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState('');
  const [variantValues, setVariantValues] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: files ? files : value
    }));
  };

  const addVariant = () => {
    if (!variantName || !variantValues) return;
    setVariants([...variants, {
      name: variantName,
      values: variantValues.split(',').map(v => v.trim())
    }]);
    setVariantName('');
    setVariantValues('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert media files to just file names (you could convert to base64 if needed)
    const mediaFiles = product.media ? Array.from(product.media).map(file => file.name) : [];

    const newProduct = {
      ...product,
      media: mediaFiles,
      variants,
      storeName // ✅ include storeName for filtering in catalog
    };

    // Get existing products or empty array
    const existingProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Push and save
    existingProducts.push(newProduct);
    localStorage.setItem("allProducts", JSON.stringify(existingProducts));
    localStorage.setItem("productsStep", "completed");

    console.log("✅ Product Added:", newProduct);
    console.log("🗂️ All Products in localStorage:", existingProducts);

    // Redirect to payments page with storeName
    navigate('/payments', { state: { storeName } });

    // Reset form
    setProduct({
      name: '',
      category: '',
      price: '',
      discountedPrice: '',
      description: '',
      media: null,
      quantity: '',
      sku: ''
    });
    setVariants([]);
    setVariantName('');
    setVariantValues('');
  };

  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h3 className="mb-4 text-center fw-bold text-primary">Add New Product</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="e.g., Oreo Biscuit"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Product Category *</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="e.g., Snacks, Dairy, Beverages"
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="₹ Enter price"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type="number"
                name="discountedPrice"
                value={product.discountedPrice}
                onChange={handleChange}
                placeholder="₹ Enter discounted price"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Write something appealing..."
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Product Media (images/videos)</Form.Label>
          <Form.Control
            type="file"
            name="media"
            onChange={handleChange}
            multiple
          />
          <Form.Text className="text-muted">Recommended size: 1000×1248px.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Inventory</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
              />
            </Col>
            <Col>
              <Form.Control
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder="SKU ID (e.g., 1000000001)"
              />
            </Col>
          </Row>
        </Form.Group>

        <hr className="my-4" />
        <h5 className="mb-3">Variants</h5>

        {variants.map((v, i) => (
          <div key={i} className="alert alert-secondary p-2">
            <strong>{v.name}:</strong> {v.values.join(', ')}
          </div>
        ))}

        <Row className="align-items-end mb-3">
          <Col md={4}>
            <Form.Control
              value={variantName}
              onChange={e => setVariantName(e.target.value)}
              placeholder="e.g., Size or Color"
            />
          </Col>
          <Col md={6}>
            <Form.Control
              value={variantValues}
              onChange={e => setVariantValues(e.target.value)}
              placeholder="e.g., Red, Blue, Green"
            />
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={addVariant}>Add</Button>
          </Col>
        </Row>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-3 px-5 rounded-pill"
          >
            ➕ Add Product
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ProductForm;
