import React, { useState } from "react";
import { Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { signUp } from "../../features/auth/authSlice";
import { User, UserRole } from "../../types";
import toast from "react-hot-toast";

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.Graduate);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      try {
        const newUser: Omit<User, "id"> = { email, password, name, role };
        dispatch(signUp(newUser));
        toast.success("Account created successfully!");
        navigate("/login");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center h3 mb-4">
          Create Your Account
        </Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="signupName">
            <Form.Label>Full Name / Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupRole">
            <Form.Label>I am a...</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value={UserRole.Graduate}>Graduate</option>
              <option value={UserRole.Employer}>Employer</option>
              <option value={UserRole.Institution}>Institution</option>
            </Form.Select>
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
                "Sign Up"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
