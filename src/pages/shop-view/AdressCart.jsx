import './address-cart.css'
function AddressCart({
  currentSelectedAddress,
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  const isSelected = currentSelectedAddress?._id === addressInfo._id;

  return (
    <div
      className="card mb-3 address-cart"
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      style={{
        cursor: setCurrentSelectedAddress ? "pointer" : "default",
        boxShadow: isSelected
          ? "0 0 15px rgba(0, 123, 255, 0.6)"
          : "0 2px 10px rgba(0, 0, 0, 0.05)",
        border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
        height: "320px",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="card-body scrollable-body"
        style={{
          overflowY: "auto",
          flex: 1,
          paddingRight: "10px",
        }}
      >
        <p><strong>Address:</strong> {addressInfo?.address}</p>
        <p><strong>Name:</strong> {addressInfo?.name}</p>
        <p><strong>City:</strong> {addressInfo?.city}</p>
        <p><strong>Pincode:</strong> {addressInfo?.pincode}</p>
        <p><strong>Phone:</strong> {addressInfo?.phone}</p>
        <p><strong>Notes:</strong> {addressInfo?.notes}</p>
      </div>
      <div className="card-footer d-flex justify-content-around py-2">
        <button
          className="btn btn-warning btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AddressCart;
