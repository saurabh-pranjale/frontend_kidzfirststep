import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { capturePayment } from "../../store/order/index";
import PaymentProcessing from "../../components/shop-view/payments/PaymentProcessing";
import PaymentError from "../../components/shop-view/payments/PaymentError";
import PaymentSuccess from "../../components/shop-view/payments/PaymentSuccess";

function PaypalReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("processing");
  const [error, setError] = useState(null);

  useEffect(() => {
  const orderId = searchParams.get("token"); // this is orderId from PayPal
  const payerId = searchParams.get("PayerID");

  if (!orderId || !payerId) {
    setStatus("error");
    setError("Missing PayPal payment details.");
    return;
  }

  dispatch(capturePayment({ orderId, payerId }))
    .unwrap()
    .then((data) => {
      if (data.success) {
        setStatus("success");
        setTimeout(() => navigate("/shop/thank-you"), 3000);
      } else {
        setStatus("error");
        setError(data.message || "Payment capture failed.");
      }
    })
    .catch(() => {
      setStatus("error");
      setError("Network error during payment capture.");
    });
}, [searchParams, dispatch, navigate]);


  if (status === "processing") return <PaymentProcessing />;
  if (status === "error") return <PaymentError />;
  if (status === "success") return <PaymentSuccess />;

  return null;
}

export default PaypalReturnPage;
