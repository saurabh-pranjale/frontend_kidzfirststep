import React, { useEffect, useState } from 'react';
import './DetailProduct.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems } from '../../store/cart';
import { addReview, getReviews } from '../../store/shop/review-slice';
import StarRating from '../../components/common/start-rating';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);
  const { reviews, error } = useSelector(state => state.shopReview);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/${id}`);
      setData(res.data);
      setLocalError(null);
      dispatch(getReviews(id));
    } catch (err) {
      console.error(err);
      setLocalError('Failed to fetch product details.');
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      userId: user?.id,
      productId: id,
      quantity,
    })).then(res => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("✅ Added to Cart");
      }
    });
  };

  const handleSubmitReview = () => {
    dispatch(addReview({
      productId: id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    }))
      .then((res) => {
        if (res?.payload?.success) {
          setReviewMsg('');
          setRating(0);
          setShowReviewModal(false);
          dispatch(getReviews(id));
          toast.success("✅ Review submitted!");
        } else {
          toast.error(error);
          setShowReviewModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('❌ Something went wrong while submitting the review');
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const averageReview =
    reviews?.length > 0
      ? (reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length).toFixed(2)
      : '0.00';

  if (localError) {
    return (
      <div className="container my-4">
        <p className="text-danger text-center">{localError}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container my-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-4 align-items-start">
        <div className="col-md-5 text-center">
          <img
            src={data.image?.[0] || '/placeholder.png'}
            alt={data.title || 'Product Image'}
            className="img-fluid border"
          />
        </div>

        <div className="col-md-7">
          <h4 className="fw-bold">{data.title}</h4>
          <p className="mb-1"><strong>Vendor:</strong> {data.brand}</p>
          <p className="mb-1"><strong>SKU:</strong> MTL-1806-11</p>
          <p><strong>Country of Origin:</strong> Indonesia</p>

          <h5 className="text-danger fw-bold">MRP ₹{data.price}</h5>
          <p><strong>Condition:</strong> <span className="badge bg-light text-dark">New</span></p>

          <div className="mt-2">
            <p><strong>Average Rating:</strong> {averageReview} ⭐</p>
          </div>

          <div className="mt-3">
            <p className="mb-1 fw-semibold text-success">Available Offers</p>
            <ul className="mb-2">
              <li>
                Get upto ₹250 cashback on payment via <strong>MobiKwik</strong> wallet.
                Code: <strong>MBK250</strong>. <a href="#">*T&C Apply</a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center mb-3">
            <span className="me-3">Quantity:</span>
            <div className="input-group" style={{ width: '120px' }}>
              <button className="btn btn-outline-secondary" onClick={decreaseQty}>-</button>
              <input type="text" className="form-control text-center" value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={increaseQty}>+</button>
            </div>
          </div>

          <button className="btn btn-success w-100 mb-3" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          <button className="btn btn-outline-primary w-100 mb-3" onClick={() => setShowReviewModal(true)}>
            Write a Review
          </button>

          <p className="small text-muted mb-1">
            🚚 Free shipping on most prepaid orders over ₹699. This product is not eligible for free shipping.
          </p>
          <p className="small text-muted">Delivery Time – 3 to 8 days</p>

          <hr />
          <h5>Customer Reviews</h5>
          {error && <p className="text-danger">Error: {error}</p>}
          {reviews?.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="mb-3 border-bottom pb-2">
                <strong>{review.userName}</strong> <br />
                <StarRating rating={review.reviewValue} />
                <p>{review.reviewMessage}</p>
              </div>
            ))
          ) : (
            <p className="text-muted">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Bootstrap Modal for Review */}
      {showReviewModal && (
        <div className="modal fade show d-block" tabIndex="-1" onClick={() => setShowReviewModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Write a Review</h5>
                <button type="button" className="btn-close" onClick={() => setShowReviewModal(false)}></button>
              </div>
              <div className="modal-body">
                <StarRating rating={rating} handleRatingChange={setRating} />
                <textarea
                  className="form-control mt-3"
                  rows="4"
                  placeholder="Your review..."
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowReviewModal(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitReview}
                  disabled={!reviewMsg.trim()}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default DetailProduct;
