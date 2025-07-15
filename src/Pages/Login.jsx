// Login.js
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      navigate("/storeForm");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <Container className="login-container">
        <Card className="login-card">
          <h3 className="login-title">🔐 Login to Your Account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            {error && <p className="error-text">{error}</p>}

            <Button type="submit" className="login-button">
              Login
            </Button>
          </Form>

          <p className="login-footer">
            Don’t have an account?{' '}
            <Link to="/register" className="register-link">
              Create one
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Login;