import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWishlist,
  removeFromWishlist,
  moveWishlistItemToCart,
  clearWishlistMessages,
} from '../store/shop/wishlist-slice/index';
import { fetchCartItems } from '../store/cart/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Wishlist.css'; // optional custom styles

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector((state) => state.shopWishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (successMessage) toast.success(successMessage);
    if (error) toast.error(error);

    return () => {
      dispatch(clearWishlistMessages());
    };
  }, [successMessage, error, dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist({ userId: user.id, productId }));
  };

  const handleMoveToCart = (productId) => {
    dispatch(moveWishlistItemToCart({ userId: user.id, productId })).then((res) => {
      if (res?.payload?.productId) {
        dispatch(fetchCartItems(user.id));
      }
    });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">🧡 Your Wishlist</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted">No items in your wishlist.</p>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.productId} className="col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.title}
                  className="card-img-top object-fit-contain p-2"
                  style={{ height: '220px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    <span className="text-muted text-decoration-line-through">
                      ₹{item.price}
                    </span>{' '}
                    <span className="text-danger fw-bold">₹{item.salePrice}</span>
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success w-100"
                      onClick={() => handleMoveToCart(item.productId)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Wishlist;
