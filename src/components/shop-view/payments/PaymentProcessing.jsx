import { useEffect } from "react";

const PaymentProcessing = () => {
  useEffect(() => {
    document.title = "Processing Payment...";
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #f3e5f5)",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <style>
        {`
          @keyframes spinPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animated-spinner {
            animation: spinPulse 1s infinite ease-in-out;
          }
        `}
      </style>

      <div
        className="spinner-border text-primary mb-4 animated-spinner"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <h3 className="text-dark mb-3" style={{ fontWeight: 600 }}>
        💳 Processing Your Payment...
      </h3>

      <p className="text-secondary" style={{ fontSize: "1.1rem", maxWidth: "420px" }}>
        Please don’t refresh or close this window. We're confirming your order and preparing your confirmation page.
      </p>
    </div>
  );
};

export default PaymentProcessing;
