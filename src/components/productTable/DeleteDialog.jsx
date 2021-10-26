import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import "./DeleteDialog.css";
import axios from "axios";

export default function DeleteDialog(props) {
  const { open, setOpen, id, handleOnDeleteProduct } = props;
  const [product, setProduct] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Product/getProducts/" + id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onDeleteProductSubmit = (e) => {
    e.preventDefault();

    axios
      .delete("https://sarno-pet-hotel-springboot.herokuapp.com/Product/deleteProduct/" + id)
      .then((res) => {
        console.log(res);
        handleClose();
        handleOnDeleteProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={open} maxWidth="false">
      <form onSubmit={onDeleteProductSubmit}>
        <DialogContent>
          <div className="dialog-delete">
            <div className="dialog-title">
              <span>ลบสินค้า</span>
            </div>
            <div className="dialog-content-wrapper">
              <div className="dialog-content">คุณต้องการลบสินค้า</div>
              <b className="dialog-content">{product.productName}</b>
              <div className="dialog-content">หรือไม่ ?</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button type="submit" className="closeDialogBtn">
            ตกลง
          </button>
          <button type="button" className="cancleDialogBtn" onClick={handleClose}>
            ยกเลิก
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
