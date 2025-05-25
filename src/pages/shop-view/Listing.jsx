import ProductFilter from "../../components/Header/shop-view/filter";
import Dropdown from "react-bootstrap/Dropdown";
import { sortOptions } from "../../config/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/Header/shop-view/product-tile";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../store/shop/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./pagination.css"; // Add your CSS styles here

function createSearchParamsHelper(filterparams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterparams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6; // Customize as needed
  const offset = currentPage * itemsPerPage;

  const navigate = useNavigate();

  function handleSort(value) {
    setSort(value);
    setCurrentPage(0); // Reset to first page
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    Object.keys(cpyFilters).forEach((key) => {
      if (cpyFilters[key].length === 0) delete cpyFilters[key];
    });

    setFilters(cpyFilters);
    setCurrentPage(0); // Reset to first page on filter change
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
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

  function handleClearFilters() {
    setFilters({});
    setSearchParams("");
    setCurrentPage(0);
    sessionStorage.removeItem("filters");
  }

  function handlePageClick({ selected }) {
    setCurrentPage(selected);
  }

  useEffect(() => {
    const urlFilters = {};
    for (const [key, value] of searchParams.entries()) {
      urlFilters[key] = value.split(",");
    }
    setFilters(urlFilters);
  }, []); // Initial mount

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
      sessionStorage.setItem("filters", JSON.stringify(filters));
    } else {
      setSearchParams("");
      sessionStorage.removeItem("filters");
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const sortedProductList = [...productList].sort((a, b) => {
    switch (sort) {
      case "price-lowtohigh":
        return a.price - b.price;
      case "price-hightolow":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const currentItems = sortedProductList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedProductList.length / itemsPerPage);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
          <button
            className="btn btn-outline-danger btn-sm mt-3"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>

        <div className="col-md-9">
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Product List</h5>
              <div className="d-flex align-items-center">
                <span className="text-muted me-2">
                  {sortedProductList?.length} Products
                </span>

                <Dropdown onSelect={handleSort}>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    Sort by
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {sortOptions.map((sortItem) => (
                      <Dropdown.Item
                        key={sortItem.id}
                        eventKey={sortItem.id}
                        active={sort === sortItem.id}
                      >
                        {sortItem.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="card-body">
              <div className="row g-3">
                {currentItems.length > 0 ? (
                  currentItems.map((productItem) => (
                    <div
                      className="col-12 col-sm-6 col-md-4"
                      onClick={() => {
                        navigate(`/home/product/${productItem._id}`);
                      }}
                      key={productItem._id}
                    >
                      <ShoppingProductTile
                        handleGetProductDetails={handleGetProductDetails}
                        product={productItem}
                        handleAddToCart={handleAddToCart}
                        isOutOfStock={productItem.stock <= 0}
                      />
                    </div>
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>

              {pageCount > 1 && (
                <div className="mt-4 d-flex justify-content-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="→"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="←"
                    containerClassName="pagination"
                    activeClassName="active"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    forcePage={currentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
