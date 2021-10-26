import React from "react";
import "./CardItem.css";

export default function CardItem(props) {
  const { product, onAdd } = props;

  return (
    <div className="product-item" onClick={() => onAdd(product)}>
      <div className="wrapper">
        <img className="product-img" src={product.imgUrl} alt="" />
        <div>
          <div className="product-name">{product.productName}</div>
          <div className="product-info">
            ปริมาณ : {product.volumn} / ขนาด : {product.size}
          </div>
          <div className="product-price">฿ {product.sellPrice}</div>
        </div>
      </div>
    </div>
  );
}
