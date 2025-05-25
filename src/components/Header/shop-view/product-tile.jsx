import { Heart } from "lucide-react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  return (
    <div className="card mx-auto mb-4" style={{ maxWidth: "20rem", cursor: "pointer" }}>
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="position-relative">
          <img
            src={product?.image}
            alt={product?.title || "Product Image"}
            className="card-img-top"
            style={{ height: "300px", objectFit: "cover" }}
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

        <div className="card-body">
          <h5 className="card-title fw-bold">{product?.title}</h5>

          <div className="d-flex justify-content-between text-muted small mb-2">
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
              <span className="fw-semibold text-primary">${product?.salePrice}</span>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-top-0">
        {product?.totalStock === 0 ? (
          <button className="btn btn-warning w-100 opacity-50" disabled>
            Out Of Stock
          </button>
        ) : (
          <button
            className="btn btn-warning w-100"
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ShoppingProductTile;
