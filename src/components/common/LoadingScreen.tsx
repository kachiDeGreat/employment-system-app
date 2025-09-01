import React from "react";

export const LoadingScreen: React.FC = () => {
  const loaderStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--background-primary)",
    zIndex: 9999,
  };

  const svgStyle: React.CSSProperties = {
    width: "100px",
    height: "100px",
    margin: "20px",
  };

  return (
    <div style={loaderStyle}>
      <svg
        style={svgStyle}
        version="1.1"
        id="L5"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <circle fill="var(--accent-primary)" stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle
          fill="var(--accent-primary)"
          stroke="none"
          cx="30"
          cy="50"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle
          fill="var(--accent-primary)"
          stroke="none"
          cx="54"
          cy="50"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
      <p style={{ color: "var(--text-secondary)" }}>
        Initializing Job Portal...
      </p>
    </div>
  );
};
