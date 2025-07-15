// Register.jsx
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/login");
  };

  return (
    <div className="register-wrapper">
      <Container className="register-container">
        <Card className="register-card shadow-lg">
          <h3 className="register-title">📝 Create Your Account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>👤 Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>📧 Email</Form.Label>
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
              <Form.Label>🔒 Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </Form.Group>

            <Button type="submit" className="register-button">
              Register
            </Button>
          </Form>

          <p className="register-footer">
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
