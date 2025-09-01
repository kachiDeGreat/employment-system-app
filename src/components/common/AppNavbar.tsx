import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { UserRole } from "../../types";
import { Briefcase, LogIn, User, UserPlus } from "lucide-react";

export const AppNavbar: React.FC = () => {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getDashboardLink = () => {
    switch (currentUser?.role) {
      case UserRole.Graduate:
        return "/graduate-dashboard";
      case UserRole.Employer:
        return "/employer-dashboard";
      case UserRole.Institution:
        return "/institution-dashboard";
      default:
        return "/";
    }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="light"
      variant="light"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold icon-text">
          <Briefcase size={22} className="text-primary" />{" "}
          <span className="ms-1">JobPortal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated && currentUser ? (
              <>
                <Nav.Link
                  as={Link}
                  to={getDashboardLink()}
                  className="fw-medium"
                >
                  Dashboard
                </Nav.Link>
                <NavDropdown
                  title={
                    <span className="icon-text">
                      <User size={18} /> {currentUser.name}
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="icon-text">
                  <LogIn size={16} /> Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                  size="sm"
                  className="ms-2 icon-text"
                >
                  <UserPlus size={16} /> Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
