import React from "react";
import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const Product = ({
  id,
  name,
  price,
  image,
  products,
  setProducts,
  getProducts,
}) => {
  const taxRate = 0.18;
  const shipping = 25;
  const dampingRate = 0.8;
  const dampPrice = price * dampingRate;

  const [amount, setAmount] = useState(1);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}${id}`);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const handleIncrease = async (id) => {
    try {
      const newAmount = amount + 1;
      await axios.put(`${process.env.REACT_APP_URL}${id}`, {
        amount: newAmount,
      });
      setAmount(newAmount);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const handleDecrease = async (id) => {
    try {
      const newAmount = amount - 1;
      await axios.put(`${process.env.REACT_APP_URL}${id}`, {
        amount: newAmount,
      });
      setAmount(amount > 1 ? newAmount : amount);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  return (
    <div>
      <div key={id} className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt={name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <div className="card-text">
                <p>
                  <span className="fs-4 text-warning">
                    Price : ${dampPrice.toFixed(2)}
                  </span>
                  <span className="ms-3 text-decoration-line-through">
                    ${price}
                  </span>
                </p>
                <div className="buttons fs-4 m-2 border border-2 text-center rounded-2">
                  <span
                    className="me-2 text-danger"
                    onClick={() => handleDecrease(id)}
                  >
                    <FaMinusCircle />
                  </span>
                  {amount}
                  <span
                    className="ms-2 text-danger"
                    onClick={() => handleIncrease(id)}
                  >
                    <FaPlusCircle />
                  </span>
                </div>
                <div
                  className="border border-2 text-center bg-danger text-white rounded-2 m-2"
                  onClick={() => handleRemove(id)}
                >
                  <span className="me-2 fs-4">
                    <RiDeleteBin6Line />
                  </span>
                  Remove
                </div>
              </div>
              <p className="card-text">
                <small className="text-body-secondary">
                  Product Total: ${(dampPrice * amount).toFixed(2)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Subtotal: ${(dampPrice * amount).toFixed(2)}</p>
        <p>Tax(%18): ${(dampPrice * amount * taxRate).toFixed(2)}</p>
        <p>Shipping: ${shipping} </p>
        <p>
          Total: $
          {(dampPrice * amount + dampPrice * amount * taxRate + shipping).toFixed(2)}{" "}
        </p>
      </div>
    </div>
  );
};

export default Product;
