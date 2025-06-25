import Address from "../../components/shop-view/Address";
import kids from '../../assets/kids.jpg'
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "../../components/shop-view/UserCartItemsContent";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { createNewOrder } from "../../store/order/index";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
 
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price;
          const quantity = currentItem?.quantity || 0;
          return sum + price * quantity;
        }, 0)
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast.error("Your Cart Is Empty. Add Items");
      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please Select one Address");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log(orderData,"!@!");

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="d-flex flex-column">
      <div className="position-relative overflow-hidden" style={{ height: "400px", width: "100%" }}>
        <img src={kids} alt="A cute dog" className="w-100 h-100 object-fit-cover" />
      </div>
      <div className="row mt-4 p-3 g-4">
        <div className="col-12 col-sm-6">
          <Address currentSelectedAddress={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        </div>
        <div className="col-12 col-sm-6 d-flex flex-column gap-3">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item?.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-3">
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              className="w-100 btn btn-warning" 
              onClick={handleInitiatePaypalPayment}
            >
              CheckOut With Paypal
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShoppingCheckout;
