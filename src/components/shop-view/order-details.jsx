import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="modal-body">
      <div className="mb-4">
        <h5 className="border-bottom pb-2">Order Summary</h5>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Order ID</span>
          <strong>{orderDetails?._id}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Order Date</span>
          <strong>{orderDetails?.orderDate?.split("T")[0]}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Payment Method</span>
          <strong>{orderDetails?.paymentMethod}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Payment Status</span>
          <strong>{orderDetails?.paymentStatus}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Order Price</span>
          <strong>${orderDetails?.totalAmount}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span className="text-muted">Order Status</span>
          <span>
            <span
              className={`badge ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-success"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
            >
              {orderDetails?.orderStatus}
            </span>
          </span>
        </div>
      </div>

      <hr />

      <div className="mb-4">
        <h5>Order Details</h5>
        <ul className="list-group list-group-flush">
          {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
            orderDetails.cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>{item.title}</div>
                <div className="d-flex gap-3">
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No items in the cart</li>
          )}
        </ul>
      </div>

      <div>
        <h5>Shipping Info</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name: {user?.userName}</li>
          <li className="list-group-item">Address: {orderDetails?.addressInfo?.address}</li>
          <li className="list-group-item">City: {orderDetails?.addressInfo?.city}</li>
          <li className="list-group-item">Pincode: {orderDetails?.addressInfo?.pincode}</li>
          <li className="list-group-item">Phone: {orderDetails?.addressInfo?.phone}</li>
          <li className="list-group-item">Notes: {orderDetails?.addressInfo?.notes}</li>
        </ul>
      </div>
    </div>
  );
}

export default ShoppingOrderDetailsView;
