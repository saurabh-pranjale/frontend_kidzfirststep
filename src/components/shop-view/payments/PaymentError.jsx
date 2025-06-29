// src/components/payments/PaymentError.jsx

const PaymentError = ({ errorMessage = "Something went wrong during the payment process." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="text-danger mb-3" style={{ fontSize: '3rem' }}>
        <i className="bi bi-x-circle-fill"></i>
      </div>
      <h4 className="text-danger mb-2">Payment Failed</h4>
      <p className="text-muted">{errorMessage}</p>
    </div>
  );
};

export default PaymentError;
