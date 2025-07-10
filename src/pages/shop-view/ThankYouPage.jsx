import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react"; // ✅ Lucide icon

const ThankYouPage = () => {
  useEffect(() => {
    document.title = "Payment Successful";
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("currentOrderId");
  }, []);

  const orderId = sessionStorage.getItem("currentOrderId");

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
 

      {/* ✅ Lucide Icon */}
      <div className="success-icon mb-3">
        <CheckCircle2 size={72} color="#0984e3" strokeWidth={2.5} />
      </div>

    <h3
  className="mb-2 py-2"
  style={{
    fontWeight: 600,
    color: "#0d47a1" // Material Dark Blue
  }}
>
  Your Order Has Been Confirmed!
</h3>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "30px",
          textAlign: "left",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h4 style={{ marginBottom: "10px", color: "#37474f" }}>🧾 Order Summary</h4>
        <p className="fw-bold">
          <strong>Order ID:</strong> {orderId || "N/A"}
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span style={{ color: "green", fontWeight: "bolder" }}>Paid</span>
        </p>
        <p>
          <strong>Date:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>

      <h2
        style={{
          fontSize: "1.6rem",
          color: "#1976d2",
          marginBottom: "20px",
          fontWeight: "500",
          letterSpacing: "0.5px",
        }}
      >
        🛍️ Thank you for shopping with us!
      </h2>

      <a
        href="/shop"
        className="btn btn-outline-success mt-4 px-4"
        style={{ fontWeight: 500 }}
      >
        Continue Shopping
      </a>
    </div>
  );
};

export default ThankYouPage;
