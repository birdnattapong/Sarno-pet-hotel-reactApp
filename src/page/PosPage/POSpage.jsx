import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar/Sidebar";
import POS from "../../components/pos/POS";
import Cart from "../../components/cart/Cart";
import "./POSpage.css";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default function POSpage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Product/getProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const onClearCart = () => {
    setCartItems([]);
  };

  const handleOnSubmitOrder = () => {
    store.addNotification({
      title: "Success",
      message: "สร้างรายละเอียดการขายเรียบร้อยแล้ว",
      type: "success",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 3000,
      },
    });
  };

  return (
    <div className="POSpage">
      <Sidebar />
      <POS onAdd={onAdd} products={products} />
      <Cart
        onAdd={onAdd}
        onRemove={onRemove}
        onClearCart={onClearCart}
        cartItems={cartItems}
        handleOnSubmitOrder={handleOnSubmitOrder}
      />
      <ReactNotification />
    </div>
  );
}
