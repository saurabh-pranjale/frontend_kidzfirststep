import { Card } from "react-bootstrap";
import SimpleSlider from "../../components/SimpleSlider";
import './HomePage.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/index";
import ShoppingProductTile from "../../components/shop-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/cart/index";
import { categoriesWithIcon, brandsWithIcon } from "../../config/index";

const HomePage = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem(
      "filters",
      JSON.stringify({ [section]: [item.id] })
    );
    navigate("/home/products");
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  };

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: [],
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="min-vh-100">
      <SimpleSlider />

      {/* Categories */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-warning fw-bolder text-center">SHOP BY CATEGORY</h2>
          <div className="row g-4 justify-content-center">
            {categoriesWithIcon.map(({ id, label, icon: Icon }) => (
              <div key={id} className="col-6 col-md-4 col-lg-2">
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "category")}
                  className="p-4 d-flex flex-column align-items-center cursor-pointer border-0 shadow-sm h-100"
                  style={{ minHeight: "180px" }}
                >
                  <Icon size={48} className="mb-3 text-primary" />
                  <strong className="fs-5 text-center">{label}</strong>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-warning fw-bolder text-center">SHOP BY BRAND</h2>
          <div className="row g-4 justify-content-center">
            {brandsWithIcon.map(({ id, label, icon: Icon }) => (
              <div key={id} className="col-6 col-md-4 col-lg-2">
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "brand")}
                  className="p-4 d-flex flex-column align-items-center cursor-pointer border-0 shadow-sm h-100"
                  style={{ minHeight: "180px" }}
                >
                  <Icon size={48} className="mb-3 text-warning" />
                  <strong className="fs-5 text-center">{label}</strong>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-warning text-center fw-bolder">FEATURED PRODUCTS</h2>
          <div className="row g-4">
            {productList &&
              productList.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <ShoppingProductTile
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
