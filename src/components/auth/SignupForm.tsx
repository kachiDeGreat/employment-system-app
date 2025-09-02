import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { signUp } from "../../features/auth/authSlice";
import { User, UserRole } from "../../types";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  Building,
  School,
} from "lucide-react";
import styles from "../../styles/SignupPage.module.css";

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.Graduate);
  const [showPassword, setShowPassword] = useState(false);
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

  const getRoleIcon = () => {
    switch (role) {
      case UserRole.Graduate:
        return <UserIcon size={18} />;
      case UserRole.Employer:
        return <Building size={18} />;
      case UserRole.Institution:
        return <School size={18} />;
      default:
        return <UserIcon size={18} />;
    }
  };

  return (
    <div className={styles.signupForm}>
      {error && (
        <Alert variant="danger" className={styles.alert}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.inputLabel}>
            Full Name / Company Name
          </Form.Label>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <UserIcon size={18} />
            </div>
            <Form.Control
              type="text"
              placeholder="Enter your name or company name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.inputLabel}>Email Address</Form.Label>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <Mail size={18} />
            </div>
            <Form.Control
              type="email"
              placeholder="name@university.edu or company@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.inputLabel}>Password</Form.Label>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <Lock size={18} />
            </div>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password (min. 6 characters)"
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
          <div className={styles.passwordHint}>
            Use at least 6 characters with a mix of letters and numbers
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.inputLabel}>I am a...</Form.Label>
          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>{getRoleIcon()}</div>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className={styles.formInput}
              style={{ paddingLeft: "45px", height: "50px" }}
            >
              <option value={UserRole.Graduate}>Graduate</option>
              <option value={UserRole.Employer}>Employer</option>
              <option value={UserRole.Institution}>Institution</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Button
          type="submit"
          className={styles.signupButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={styles.spinner}
              />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </Form>
    </div>
  );
};
