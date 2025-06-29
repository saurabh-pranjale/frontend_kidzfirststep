const PaymentProcessing = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="text-dark mb-2">Processing your payment...</h4>
      <p className="text-muted">Please wait while we confirm your order.</p>
    </div>
  );
};

export default PaymentProcessing;