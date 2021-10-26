import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./productPage.css";
import { Search, AddCircleOutline } from "@material-ui/icons";
import ProductTable from "../../components/productTable/productTable";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Product/getProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [products]);

  const [productName, setProductName] = useState("");
  const [volumn, setVolumn] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [remain, setRemain] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreateProductSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://sarno-pet-hotel-springboot.herokuapp.com/Product/addProduct", {
        productName: productName,
        volumn: volumn,
        size: size,
        stock: stock,
        basePrice: basePrice,
        sellPrice: sellPrice,
        remain: remain,
        imgUrl: imgUrl,
      })
      .then((res) => {
        console.log(res);
        handleClose();
        handleOnAddProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnAddProduct = () => {
    store.addNotification({
      title: "Success",
      message: "สินค้าได้ถูกเพิ่มเรียบร้อยแล้ว",
      type: "success",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 3000,
      },
    });
  };

  const handleOnUpdateProduct = () => {
    store.addNotification({
      title: "Success",
      message: "สินค้าได้ถูกแก้ไขเรียบร้อยแล้ว",
      type: "warning",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 3000,
      },
    });
  };

  const handleOnDeleteProduct = () => {
    store.addNotification({
      title: "Success",
      message: "สินค้าได้ถูกลบเรียบร้อยแล้ว",
      type: "danger",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 3000,
      },
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="productPage">
      <Sidebar />
      <div className="productPage-main-content">
        <div className="productPage-top-section">
          <div className="top-search">
            <div className="iconWrapper">
              <Search />
            </div>
            <input
              className="searchTxt"
              type="text"
              placeholder="ค้นหาด้วยชื่อสินค้า..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="top-addProduct" onClick={handleOpen}>
            <div className="addIcon">
              <AddCircleOutline />
            </div>
            <div className="addText">เพิ่มสินค้าใหม่</div>
          </div>
        </div>
        <ProductTable
          searchTerm={searchTerm}
          products={products}
          handleOnUpdateProduct={handleOnUpdateProduct}
          handleOnDeleteProduct={handleOnDeleteProduct}
        />
      </div>

      <Dialog open={open} maxWidth="false">
        <form onSubmit={onCreateProductSubmit}>
          <DialogContent>
            <div className="dialog">
              <div className="dialog-title">
                <span>เพิ่มสินค้าใหม่</span>
              </div>
              <div className="dialog-content">
                <div className="leftside">
                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Product name (ชื่อสินค้า)</div>
                    <textarea
                      type="text"
                      className="productInput nameTextarea"
                      placeholder="Ex. Purina One สำหรับลูกแมว"
                      autoFocus
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Volumn (ปริมาณ)</div>
                    <input
                      type="text"
                      className="productInput"
                      placeholder="Ex. 400g."
                      onChange={(e) => {
                        setVolumn(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Size (ขนาด)</div>
                    <input
                      type="text"
                      className="productInput"
                      placeholder="Ex. ถุง"
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Stock (สต็อค)</div>
                    <input
                      type="number"
                      className="productInput"
                      placeholder="Ex. 8"
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="rightside">
                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Base price (ราคาต้นทุน)</div>
                    <input
                      type="number"
                      className="productInput"
                      placeholder="Ex. 95"
                      onChange={(e) => {
                        setBasePrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Sell price (ราคาขายจริง)</div>
                    <input
                      type="number"
                      className="productInput"
                      placeholder="Ex. 115"
                      onChange={(e) => {
                        setSellPrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Remain (เหลือ)</div>
                    <input
                      type="number"
                      className="productInput"
                      placeholder="Ex. 5"
                      onChange={(e) => {
                        setRemain(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="TagTitleWrapper">
                    <div className="TagTitle">Url รูปภาพ (รูปสินค้า)</div>
                    <input
                      type="text"
                      className="productInput"
                      placeholder="Ex. https://file.com/pic1.png"
                      onChange={(e) => {
                        setImgUrl(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button type="submit" className="closeDialogBtn">
              เพิ่มสินค้า
            </button>
            <button
              type="button"
              className="cancleDialogBtn"
              onClick={handleClose}
            >
              ยกเลิก
            </button>
          </DialogActions>
        </form>
      </Dialog>

      <ReactNotification />
    </div>
  );
}
