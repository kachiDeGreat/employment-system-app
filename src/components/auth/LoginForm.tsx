import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";
import { UserRole } from "../../types";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import styles from "../../styles/LoginPage.module.css";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className={styles.loginForm}>
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-4">
          <Form.Label className={styles.inputLabel}>Email Address</Form.Label>
          <div className={styles.inputGroup}>
            {/* <div className={styles.inputIcon}>
              <Mail size={18} />
            </div> */}
            <Form.Control
              type="email"
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className={styles.inputLabel}>Password</Form.Label>
          <div className={styles.inputGroup}>
            {/* <div className={styles.inputIcon}>
              <Lock size={18} />
            </div> */}
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
            />
            <Button
              variant="link"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          <div className={styles.passwordOptions}>
            <Form.Check
              type="checkbox"
              id="remember-me"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className={styles.rememberMe}
            />
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>
        </Form.Group>

        <Button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </Form>
    </div>
  );
};
