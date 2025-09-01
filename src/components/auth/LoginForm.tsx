import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";
import { UserRole } from "../../types";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      try {
        dispatch(login({ email, password }));
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setIsLoading(false);
      switch (currentUser.role) {
        case UserRole.Graduate:
          navigate("/graduate-dashboard");
          break;
        case UserRole.Employer:
          navigate("/employer-dashboard");
          break;
        case UserRole.Institution:
          navigate("/institution-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center h3 mb-4">Welcome Back</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
