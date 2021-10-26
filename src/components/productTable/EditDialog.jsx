import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import axios from "axios";

export default function EditDialog(props) {
  const { open, setOpen, id, handleOnUpdateProduct} = props;

  const [productName, setProductName] = useState("");
  const [volumn, setVolumn] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [remain, setRemain] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Product/getProducts/" + id)
      .then((res) => {
        setProductName(res.data.productName);
        setVolumn(res.data.volumn);
        setSize(res.data.size);
        setStock(res.data.stock);
        setBasePrice(res.data.basePrice);
        setSellPrice(res.data.sellPrice);
        setRemain(res.data.remain);
        setImgUrl(res.data.imgUrl);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onUpdateProductSubmit = (e) => {
    e.preventDefault()

    axios
      .put("https://sarno-pet-hotel-springboot.herokuapp.com/Product/updateProduct", {
        id: id,
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
        handleOnUpdateProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} maxWidth="false">
      <form onSubmit={onUpdateProductSubmit}>
        <DialogContent>
          <div className="dialog">
            <div className="dialog-title">
              <span>แก้ไขสินค้า</span>
            </div>
            <div className="dialog-content">
              <div className="leftside">
                <div className="TagTitleWrapper">
                  <div className="TagTitle">Product name (ชื่อสินค้า)</div>
                  <textarea
                    type="text"
                    className="productInput nameTextarea"
                    placeholder="Ex. Purina One สำหรับลูกแมว"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                    required
                    value={productName}
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
                    value={volumn}
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
                    value={size}
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
                    value={stock}
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
                    value={basePrice}
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
                    value={sellPrice}
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
                    value={remain}
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
                    value={imgUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button type="submit" className="closeDialogBtn">
            แก้ไขสินค้า
          </button>
          <button type="button" className="cancleDialogBtn" onClick={handleClose}>
            ยกเลิก
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
