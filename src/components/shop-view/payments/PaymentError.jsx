// src/components/payments/PaymentError.jsx

const PaymentError = ({
  errorMessage = "Something went wrong during the payment process.",
}) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffebee, #fce4ec)",
        animation: "fadeIn 0.8s ease-in-out",
      }}
    >
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .error-icon {
            animation: shake 0.6s ease-in-out;
          }
        `}
      </style>

      <div className="text-danger mb-3 error-icon" style={{ fontSize: "4rem" }}>
        ❌
      </div>

      <h3 className="text-danger mb-2" style={{ fontWeight: 600 }}>
        Payment Failed
      </h3>

      <p className="text-muted" style={{ fontSize: "1.1rem", maxWidth: "420px" }}>
        {errorMessage}
      </p>

      <a
        href="/shop/checkout"
        className="btn btn-outline-danger mt-4 px-4"
        style={{ fontWeight: 500 }}
      >
        Try Again
      </a>
    </div>
  );
};

export default PaymentError;
