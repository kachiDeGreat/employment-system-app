import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">Page Not Found</p>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
