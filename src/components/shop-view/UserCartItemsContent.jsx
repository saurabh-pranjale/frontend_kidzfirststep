import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../store/cart/index";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    );
  }

  return (
    <div className="d-flex align-items-center mb-3 border-bottom pb-3">
      <div className="me-3">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="img-fluid rounded"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      </div>

      <div className="flex-grow-1">
        <h6 className="fw-bold mb-2">{cartItem?.title}</h6>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-secondary btn-sm rounded-circle"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus size={16} />
          </button>

          <span className="fw-bold">{cartItem?.quantity}</span>

          <button
            className="btn btn-outline-secondary btn-sm rounded-circle"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="text-end ms-3">
        <p className="fw-semibold mb-1">
          $
          {(
            (cartItem?.salePrice > 0
              ? cartItem?.salePrice
              : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <button
          className="btn btn-sm text-danger"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
