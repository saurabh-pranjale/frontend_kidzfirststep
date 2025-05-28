import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart";
import { setProductDetails } from "@/store/shop/product-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import StarRating from "../common/star-rating";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [rating, setRating] = useState(0);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
      }
    });
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          alert(`Sorry, only ${getTotalStock} units are available.`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <div
      className={`modal fade ${open ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      onClick={handleDialogClose}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content p-4">
          <div className="modal-body row g-4">
            <div className="col-md-6">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{productDetails?.title}</h2>
              <p className="text-muted fs-5">{productDetails?.description}</p>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <p
                  className={`fs-3 fw-bold text-primary ${
                    productDetails?.salePrice > 0 ? "text-decoration-line-through" : ""
                  }`}
                >
                  ${productDetails?.price}
                </p>
                {productDetails?.salePrice > 0 && (
                  <p className="fs-4 fw-bold text-secondary">
                    ${productDetails?.salePrice}
                  </p>
                )}
              </div>

              <div className="d-flex align-items-center gap-2 mb-3">
                <StarRating rating={averageReview} />
                <span className="text-muted">{averageReview.toFixed(2)}</span>
              </div>

              {productDetails?.totalStock === 0 ? (
                <button className="btn btn-warning w-100 disabled opacity-50">
                  Out Of Stock
                </button>
              ) : (
                <button
                  className="btn btn-warning w-100"
                  onClick={() =>
                    handleAddToCart(productDetails?._id, productDetails?.totalStock)
                  }
                >
                  Add to Cart
                </button>
              )}

              <hr className="my-4" />

              <h4 className="mb-3">Reviews</h4>
              <div className="overflow-auto mb-4" style={{ maxHeight: "300px" }}>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="d-flex mb-3 gap-3">
                      <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                        {review?.userName ? review.userName[0].toUpperCase() : ""}
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">{review.userName}</h6>
                        <StarRating rating={review.reviewValue} />
                        <p className="text-muted">{review.reviewMessage}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Reviews</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Write A Review</label>
                <div className="mb-2">
                  <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                </div>
                <input
                  className="form-control mb-2"
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write a review"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleReview}
                  disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={handleDialogClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsDialog;
