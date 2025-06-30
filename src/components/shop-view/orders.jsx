import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUserId, getOrderDetails } from "../../store/order/index";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails, resetOrderDetails } = useSelector(
    (state) => state.shopOrder
  );

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetails(orderId));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrderByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails) {
      setShowModal(true);
    }
  }, [orderDetails]);

  function handleCloseModal() {
    setShowModal(false);
    dispatch(resetOrderDetails());
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Order History</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Order Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <tr key={orderItem._id}>
                    <td>{orderItem._id}</td>
                    <td>{orderItem.orderDate?.split("T")[0]}</td>
                    <td>
                      <span
                        className={`badge ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-success"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </span>
                    </td>
                    <td>${orderItem.totalAmount}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          if (orderDetails?._id !== orderItem._id) {
                            handleFetchOrderDetails(orderItem._id);
                          }
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Order Details */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <ShoppingOrderDetailsView orderDetails={orderDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingOrders;
