import React, { useEffect, useState } from 'react';
import './DetailProduct.css'; // Custom styles if any
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/${id}`);
            setData(res.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch product details.');
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    if (error) {
        return (
            <div className="container my-4">
                <p className="text-danger text-center">{error}</p>
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
                {/* Left: Product Image */}
                <div className="col-md-5 text-center">
                    <img
                        src={data.image?.[0] || '/placeholder.png'}
                        alt={data.title || 'Product Image'}
                        className="img-fluid border"
                    />
                </div>

                {/* Right: Product Details */}
                <div className="col-md-7">
                    <h4 className="fw-bold">
                        Hot Wheels 5 Car Gift Pack - {data.title}
                    </h4>
                    <p className="mb-1"><strong>Vendor:</strong> {data.brand}</p>
                    <p className="mb-1"><strong>SKU:</strong> MTL-1806-11</p>
                    <p><strong>Country of Origin:</strong> Indonesia</p>

                    <h5 className="text-danger fw-bold">MRP ₹{data.price}</h5>
                    <p><strong>Condition:</strong> <span className="badge bg-light text-dark">New</span></p>

                    <div className="mt-3">
                        <p className="mb-1 fw-semibold text-success">Available Offers</p>
                        <ul className="mb-2">
                            <li>
                                Get upto ₹250 cashback on payment via <strong>MobiKwik</strong> wallet.
                                Code: <strong>MBK250</strong>. <a href="#">*T&C Apply</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-3">Quantity:</span>
                        <div className="input-group" style={{ width: '120px' }}>
                            <button className="btn btn-outline-secondary" onClick={decreaseQty}>-</button>
                            <input
                                type="text"
                                className="form-control text-center"
                                value={quantity}
                                readOnly
                            />
                            <button className="btn btn-outline-secondary" onClick={increaseQty}>+</button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button className="btn btn-success w-100 mb-3">ADD TO CART</button>

                    {/* Shipping Info */}
                    <p className="small text-muted mb-1">
                        🚚 Free shipping on most prepaid orders over ₹699. This product is not eligible for free shipping.
                    </p>
                    <p className="small text-muted">Delivery Time – 3 to 8 days</p>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
