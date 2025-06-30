import { useState } from "react";
// import play from "../../assets/pay.jpg";
import Orders from "../../components/shop-view/orders";
import Address from "../../components/shop-view/Address";

function ShoppingAccount() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="d-flex flex-column">
      <div className="position-relative overflow-hidden" style={{ height: "300px", width: "100%" }}>
        <img src={"https://img.freepik.com/free-photo/close-up-child-enjoying-didactic-game_23-2149316923.jpg?semt=ais_items_boosted&w=740"} alt="Cat" className="w-100 h-100 object-fit-cover" />
      </div>

      <div className="container py-5">
        <div className="card p-4">
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
                type="button"
              >
                Orders
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "address" ? "active" : ""}`}
                onClick={() => setActiveTab("address")}
                type="button"
              >
                Address
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === "orders" ? "show active" : ""}`}>
              <Orders />
            </div>
            <div className={`tab-pane fade ${activeTab === "address" ? "show active" : ""}`}>
              <Address />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
