import React from "react";
import "./CartItem.css";

export default function CartItem(props) {
  const { product, onAdd, onRemove } = props;

  return (
    <div className="cartItem">
      <div className="cartItem-wrapper">
        <img className="cart-product-img" src={product.imgUrl} alt="" />

        <div className="cart-product-info">
          <span className="cart-product-info-name">{product.productName}</span>
          <span className="cart-product-info-description">
            ปริมาณ {product.volumn} / {product.size}
          </span>
          <div className="cart-product-quantity-info">
            <div className="cart-product-info-price">
              ฿ {product.sellPrice} x
            </div>
            <div className="cart-product-info-price all-button">
              <button className="buttonDecrease" onClick={() => onRemove(product)}>-</button>
              <button className="cart-product-quantity">{product.qty}</button>
              <button className="buttonIncrease" onClick={() => onAdd(product)}>+</button>
            </div>
            <div className="cart-product-info-price">
              = {product.sellPrice * product.qty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
