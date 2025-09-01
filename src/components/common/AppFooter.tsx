import React from "react";
import { Container } from "react-bootstrap";

export const AppFooter: React.FC = () => {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{ backgroundColor: "var(--color-grey-light-2)" }}
    >
      <Container className="text-center">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} JobPortal. All Rights Reserved.
        </span>
      </Container>
    </footer>
  );
};
