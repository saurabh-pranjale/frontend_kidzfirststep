import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ShoppingProductTile({ product, handleAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="card mx-auto mb-3" style={{ maxWidth: "16rem", fontSize: "0.875rem", cursor: "pointer" }}>
      <div>
        <div className="position-relative">
          <img
            src={product?.image}
            alt={product?.title || "Product Image"}
            className="card-img-top"
            style={{ height: "220px", objectFit: "cover" }}
          />
          {product.totalStock === 0 ? (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2">Out Of Stock</span>
          ) : product.totalStock < 10 ? (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              Only {product.totalStock} left
            </span>
          ) : product?.salePrice > 0 ? (
            <span className="badge bg-success position-absolute top-0 start-0 m-2">Sale</span>
          ) : null}
        </div>

        <div className="card-body p-2">
          <h6 className="card-title fw-semibold mb-1">{product?.title}</h6>

          <div className="d-flex justify-content-between text-muted small mb-1">
            <span>{product?.category}</span>
            <span>{product?.brand}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span
              className={`fw-semibold text-primary ${
                product?.salePrice > 0 ? "text-decoration-line-through" : ""
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="fw-semibold text-success">${product?.salePrice}</span>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-top-0 p-2">
        {product?.totalStock === 0 ? (
          <button className="btn btn-warning w-100 btn-sm opacity-50" disabled>
            Out Of Stock
          </button>
        ) : (
          <>
            <button
              className="btn btn-warning w-100 btn-sm"
              onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-info w-100 btn-sm mt-2"
              onClick={() => navigate(`/shop/product/${product?._id}`)}
            >
              View Product
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingProductTile;
