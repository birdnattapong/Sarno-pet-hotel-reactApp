import React, { useState } from "react";
import "./AddProductQty.css";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import axios from "axios";

export default function AddProductQty(props) {
  const { openAddProductQty, setOpenAddProductQty, productToAdd, handleOnAddProductQty } = props;

  const handleClose = () => {
    setOpenAddProductQty(false);
  };

  const [qtyToAdd, setQtyToAdd] = useState(0);

  const onAddProductQty = (e) => {
    e.preventDefault();

    axios
      .put(
        "https://sarno-pet-hotel-springboot.herokuapp.com/Product/addProductQty/" +
          productToAdd.id +
          "/" +
          qtyToAdd
      )
      .then((res) => {
        console.log(res);
        handleClose();
        handleOnAddProductQty();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={openAddProductQty} maxWidth="false">
      <form onSubmit={onAddProductQty}>
        <DialogContent>
          <div className="dialog-desc-title">
            <span>เติมสินค้า</span>
          </div>
          <div className="dialog-addproduct-content">
            <div>สินค้า : {productToAdd.productName}</div>
            <div>สต็อค : {productToAdd.stock}</div>
            <div>จำนวนที่เหลือ : {productToAdd.remain}</div>
            <div className="addProduct-input-wrapper">
              <label>จำนวนที่ต้องการเติมสินค้า</label>
              <input
                type="number"
                className="addProduct-input"
                autoFocus
                required
                onChange={(e) => setQtyToAdd(e.target.value)}
              ></input>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button type="submit" className="closeDialogBtn">
            ตกลง
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
  );
}
