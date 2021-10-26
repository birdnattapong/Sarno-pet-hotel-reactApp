import React from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import "./BillDesc.css";
import "simplebar/dist/simplebar.css";
import SimpleBar from "simplebar-react";

export default function BillDesc(props) {
  const { openDesc, setOpenDesc, order_detail, bill } = props;

  const handleClose = () => {
    setOpenDesc(false);
  };

  return (
    <Dialog open={openDesc} maxWidth="false">
      <DialogContent>
        <SimpleBar
          className="simplebar"
          style={{ maxHeight: `75vh`, width: `35vw` }}
          autoHide={true}
        >
          <div>
            <div className="dialog-desc-title">
              <span>รายละเอียด</span>
            </div>
            <div className="dialog-report-content">
              <div className="dialog-top-info">
                <span>บิลเลขที่ : {order_detail.id}</span>
                <span>{order_detail.created_at}</span>
              </div>

              <div className="dialog-products">
                <div className="products-top-info">
                  <div className="products-number">#</div>
                  <div className="products-item">สินค้า</div>
                  <div className="products-qty">จำนวน</div>
                  <div className="products-total">ทั้งหมด</div>
                </div>

                {bill.map((bill, index) => {
                  return (
                    <div className="products-top-content">
                      <div className="products-number">{index + 1}</div>
                      <div className="products-item">
                        {bill.productName} - {bill.sellPrice}฿
                      </div>
                      <div className="products-qty">{bill.qty}</div>
                      <div className="products-total">
                        {bill.sellPrice * bill.qty}฿
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="dialog-footer">
                <div>รวมทั้งหมด : {order_detail.total}฿</div>
                <div>จ่ายผ่าน : {order_detail.payment}</div>
              </div>
            </div>
          </div>
        </SimpleBar>
      </DialogContent>
      <DialogActions>
        <button type="button" className="cancleDialogBtn" onClick={handleClose}>
          ตกลง
        </button>
      </DialogActions>
    </Dialog>
  );
}
