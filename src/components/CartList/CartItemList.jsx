import React from "react";
import CartItem from "./CartItem/CartItem";
import "simplebar/dist/simplebar.css";
import SimpleBar from "simplebar-react";
import { useMediaQuery } from "@material-ui/core";
import "./CartItemList.css";
import { RemoveShoppingCart } from "@material-ui/icons";

export default function CartItemList(props) {
  const bigScreen = useMediaQuery("(min-width: 1536px)");
  const mediumScreen = useMediaQuery("(max-width: 1535px)");

  const { cartItems, onAdd, onRemove } = props;

  const checkItemInCart = (cartItems) => {
    if (cartItems.length > 0) {
      return cartItems.map((product) => {
        return <CartItem key={product.id} onAdd={onAdd} onRemove={onRemove} product={product}/>;
      });
    } else {
      return (
        <div className="emptyCartWrapper">
          <div className="emptyCart">
            <RemoveShoppingCart className="emptyCartIcon" />
            <div className="title">กรุณาเลือกสินค้า</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="Wrapper">
      {bigScreen && (
        <SimpleBar
          className="simplebar"
          style={{ height: "52vh" }}
          autoHide={true}
        >
          {checkItemInCart(cartItems)}
        </SimpleBar>
      )}

      {mediumScreen && (
        <SimpleBar
          className="simplebar"
          style={{ height: "41vh" }}
          autoHide={true}
        >
          {checkItemInCart(cartItems)}
        </SimpleBar>
      )}
    </div>
  );
}
