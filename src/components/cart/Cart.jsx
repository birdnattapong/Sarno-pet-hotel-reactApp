import React, { useState } from "react";
import "./Cart.css";
import { ShoppingCartOutlined, DeleteOutlined } from "@material-ui/icons";
import CartItemList from "../CartList/CartItemList";
import axios from "axios";

export default function Cart(props) {
  const moment = require('moment');
  const { cartItems, onAdd, onRemove, onClearCart, handleOnSubmitOrder } = props;
  const totalPrice = cartItems.reduce(
    (prev, cur) => prev + cur.sellPrice * cur.qty,
    0
  );

  const [receive, setReceive] = useState(0);
  const change = receive - totalPrice;

  const [isCashActive, setCashActive] = useState(true);
  const [isBankActive, setBankActive] = useState(false);

  const toggleCashActive = () => {
    if (isCashActive) {
    } else {
      setCashActive(true);
      setBankActive(false);
    }
  };

  const toggleBankActive = () => {
    if (isBankActive) {
    } else {
      setCashActive(false);
      setBankActive(true);
    }
  };

  const onClearReceive = () => {
    setReceive(0);
  };

  const handleSubmit = () => {
    if (cartItems.length === 0) {
    } else {
      axios
      .post("http://localhost:3001/Order_details/addOrder_details", {
        total: totalPrice,
        payment: isBankActive ? "โอน" : "เงินสด",
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      })
      .then((res) => {
        var formData = [];

        cartItems.map((product) => {
          formData.push({order_id: res.data.id, product_id: product.id, qty: product.qty})
        })

        axios.post("http://localhost:3001/Order_items/addOrder_items", formData)
        .then((res) => {
          console.log(res);
          onClearCart();
          onClearReceive();
        })
        .catch((err) => {
          console.log(err);
        });

        handleOnSubmitOrder();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="cart">
      <div className="cart-wrapper">
        <div className="topContent">
          <div className="cart-cartIcon">
            <ShoppingCartOutlined className="cart-cartIcon" />
            <span className="cartBadge">{cartItems.length}</span>
          </div>
          <DeleteOutlined
            className="cart-binIcon"
            onClick={() => {
              onClearCart();
              onClearReceive();
            }}
          />
        </div>
        <div className="mainContent">
          <div className="cartItemList">
            <CartItemList
              onAdd={onAdd}
              onRemove={onRemove}
              cartItems={cartItems}
            />
          </div>

          <div className="total">
            <div className="totalTag">ราคาทั้งหมด</div>
            <div className="totalPrice">฿ {totalPrice}</div>
          </div>

          <div className="calculate">
            <div className="option">
              <button
                className={isCashActive ? "cash active" : "cash"}
                onClick={toggleCashActive}
              >
                เงินสด
              </button>
              <button
                className={isBankActive ? "bank active" : "bank"}
                onClick={toggleBankActive}
              >
                โอน
              </button>
            </div>

            <div className="inputNumber">
              <div className="receive-tag">฿</div>
              <input
                className="receive-total"
                type="text"
                onChange={(e) => setReceive(e.target.value)}
                value={receive === 0 ? "" : receive}
              />
            </div>
          </div>

          <div className="change">
            <div className="change-wrapper">
              <div className="changeTitle">เงินทอน</div>
              <div className="changePrice-wrapper">
                <div className="changeTag">฿</div>
                <div className="changePrice">{change}</div>
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button className="submit" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
