// src/components/payments/PaymentSuccess.jsx

const PaymentSuccess = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="text-success mb-3" style={{ fontSize: '3rem' }}>
        <i className="bi bi-check-circle-fill"></i>
      </div>
      <h4 className="text-success mb-2">Payment Successful!</h4>
      <p className="text-muted">Thank you for your order. We've received your payment.</p>
    </div>
  );
};

export default PaymentSuccess;
