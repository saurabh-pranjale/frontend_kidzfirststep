import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally clear session or cart
    sessionStorage.removeItem("currentOrderId");
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🎉 Thank You for Your Purchase!</h1>
      <p>Your order has been successfully placed and is being processed.</p>

      {/* Optional Info */}
      <div style={{ margin: "30px auto", maxWidth: "400px", textAlign: "left" }}>
        <h3>🧾 Order Summary</h3>
        <p><strong>Order ID:</strong> {sessionStorage.getItem("currentOrderId")}</p>
        <p><strong>Payment Status:</strong> Paid</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <button onClick={() => navigate("/shop")} style={{ padding: "10px 20px" }}>
          🛍 Continue Shopping
        </button>
      </div>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "gray" }}>
        Need help? <a href="/contact">Contact support</a>
      </p>
    </div>
  );
}

export default ThankYouPage;
