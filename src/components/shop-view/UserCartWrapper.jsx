import { useNavigate } from "react-router-dom";
import UserCartItemsContent from "./UserCartItemsContent";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price;
          const quantity = currentItem?.quantity || 0;
          return sum + price * quantity;
        }, 0)
      : 0;

  return (
    <div className="offcanvas offcanvas-end show" tabIndex="-1" style={{ visibility: "visible", backgroundColor: "white", width: "400px" }}>
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Your Cart</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setOpenCartSheet(false)}
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        <div className="mb-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <UserCartItemsContent key={index} cartItem={item} />
            ))
          ) : (
            <p className="text-muted">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between fw-bold border-top pt-3">
            <span>Total</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-warning w-100 mt-3 fw-bold"
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCartWrapper;
