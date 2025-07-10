// src/components/payments/PaymentSuccess.jsx

import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    document.title = "Payment Successful";
  }, []);



  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <style>
        {`
          @keyframes pulseCheck {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.85; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .success-icon {
            animation: pulseCheck 1.5s infinite ease-in-out;
          }
        `}
      </style>

      <div className="text-success mb-3 success-icon" style={{ fontSize: "4rem" }}>
        ✅
      </div>

      <h3 className="text-success mb-2" style={{ fontWeight: 600 }}>
        Payment Successful!
      </h3>

      
 

      <p className="text-muted" style={{ fontSize: "1.1rem", maxWidth: "420px" }}>
        Thank you for your order. We've received your payment and will process it shortly.
      </p>


    </div>
  );
};

export default PaymentSuccess;

