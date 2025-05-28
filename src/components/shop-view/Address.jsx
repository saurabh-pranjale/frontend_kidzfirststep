import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import AddressCart from "../../pages/shop-view/AdressCart";
import { addressFormControls } from "../../config";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../store/shop/address-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialFormData = {
  address: "",
  name: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({currentSelectedAddress, setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress(user.id));
    }
  }, [dispatch, user?.id]);

  const isFormValid = () =>
    
 Object.values(formData).every((field) => typeof field === "string" && field.trim() !== "");

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (!user?.id) return alert("User not authenticated");

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((res) => {
        if (res?.payload?.success) {
          toast.success("Address updated successfully");
          dispatch(fetchAllAddress(user.id));
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewAddress({ ...formData, userId: user.id })).then((res) => {
        if (res?.payload?.success) {
          toast.success("Address added successfully");
          dispatch(fetchAllAddress(user.id));
          setFormData(initialFormData);
        }
      });
    }
  };

  const handleDeleteAddress = (address) => {
    if (!user?.id) return alert("User not authenticated");

    dispatch(
      deleteAddress({ userId: user.id, addressId: address._id })
    ).then((res) => {
      console.log(res)
      if (res?.payload?.message) {
        toast.error("Address deleted");
        dispatch(fetchAllAddress(user.id));
      }
    });
  };

  const handleEditAddress = (address) => {
    setCurrentEditedId(address._id);
    setFormData({
      address: address.address,
      name: address.name,
      city: address.city,
      phone: address.phone,
      pincode: address.pincode,
      notes: address.notes,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-4">
          {addressList?.length > 0 ? (
            addressList.map((item) => (
              <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <AddressCart
                  currentSelectedAddress={currentSelectedAddress}
                  addressInfo={item}
                  handleEditAddress={handleEditAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No addresses found.</p>
            </div>
          )}
        </div>

        <h5 className="card-title">
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </h5>

        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          buttonText={currentEditedId ? "Update" : "Add"}
          isBtnDisabled={!isFormValid()}
        />
      </div>
    </div>
  );
}

export default Address;
