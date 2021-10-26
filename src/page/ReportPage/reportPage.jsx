import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./reportPage.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import "simplebar/dist/simplebar.css";
import SimpleBar from "simplebar-react";
import axios from "axios";
import BillDesc from "./BillDesc";
import AddProductQty from "./AddProductQty";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default function ReportPage() {
  const bigScreen = useMediaQuery("(min-width: 1536px)");
  const mediumScreen = useMediaQuery("(max-width: 1535px)");

  const [order_details, setOrder_details] = useState([]);
  const [almostEmptyProducts, setAlmostEmptyProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Order_details/getOrder_details")
      .then((res) => setOrder_details(res.data))
      .catch((err) => console.log(err));

    axios
      .get("https://sarno-pet-hotel-springboot.herokuapp.com/Product/getAlmostEmptyProducts")
      .then((res) => setAlmostEmptyProducts(res.data))
      .catch((err) => console.log(err));
  }, [almostEmptyProducts]);

  const [openDesc, setOpenDesc] = useState(false);
  const [order_detail, setOrder_detail] = useState([]);
  const [bill, setBill] = useState([]);

  async function getBill(order_detail) {
    try {
      let res = await axios.get(
        "https://sarno-pet-hotel-springboot.herokuapp.com/Order_items/getBill/" + order_detail.id
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleOpenDesc = (order_detail) => {
    setOrder_detail(order_detail);

    getBill(order_detail).then((res) => {
      setBill(res);
    });

    setOpenDesc(true);
  };

  const [openAddProductQty, setOpenAddProductQty] = useState(false);
  const [productToAdd, setProductToAdd] = useState([]);

  const handleOpenAddProductQty = (product) => {
    setOpenAddProductQty(true);
    setProductToAdd(product);
  };

  const handleOnAddProductQty = () => {
    store.addNotification({
      title: "Warning",
      message: "สินค้าได้ถูกเติมเรียบร้อยแล้ว",
      type: "success",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 3000,
      },
    });
  };

  return (
    <div className="reportPage">
      <Sidebar />
      <div className="reportPage-main-content">
        <div className="reportPage-title-wrapper">
          <span className="reportPage-title">รายงาน</span>
        </div>
        <div className="reportPage-content">
          <div className="ReportWrapper">
            <div className="report-Title">รายการขาย</div>
            <TableContainer component={Paper} className="tableContainer">
              <Table className="tableHeader">
                <TableHead>
                  <TableRow>
                    <TableCell className="header center-row id-cell">
                      รหัสบิล
                    </TableCell>
                    <TableCell className="header center-row date-cell">
                      วันที่ ({order_details.length})
                    </TableCell>
                    <TableCell className="header center-row total-cell">
                      จำนวนเงิน
                    </TableCell>
                    <TableCell className="header center-row payment-cell">
                      จ่ายผ่าน
                    </TableCell>
                    <TableCell className="header center-row action-cell">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>

              {mediumScreen && (
                <SimpleBar
                  className="simplebar"
                  style={{ height: `calc(100vh - 26vh)` }}
                  autoHide={true}
                >
                  <Table>
                    <TableBody className="tableBody">
                      {order_details.map((order_detail) => {
                        return (
                          <TableRow key={order_detail.id}>
                            <TableCell className="id-cell center-row">
                              {order_detail.id}
                            </TableCell>
                            <TableCell className="date-cell center-row">
                              {order_detail.created_at.substring(0, 10)}
                            </TableCell>
                            <TableCell className="total-cell center-row">
                              {order_detail.total}
                            </TableCell>
                            <TableCell className="payment-cell center-row">
                              {order_detail.payment}
                            </TableCell>
                            <TableCell className="action-cell center-row">
                              <button
                                type="button"
                                className="show-desc"
                                onClick={() => handleOpenDesc(order_detail)}
                              >
                                รายละเอียด
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </SimpleBar>
              )}

              {bigScreen && (
                <SimpleBar
                  className="simplebar"
                  style={{ height: `calc(100vh - 21vh)` }}
                  autoHide={true}
                >
                  <Table>
                    <TableBody className="tableBody">
                      {order_details.map((order_detail) => {
                        return (
                          <TableRow key={order_detail.id}>
                            <TableCell className="id-cell center-row">
                              {order_detail.id}
                            </TableCell>
                            <TableCell className="date-cell center-row">
                              {order_detail.created_at.substring(0, 10)}
                            </TableCell>
                            <TableCell className="total-cell center-row">
                              {order_detail.total}
                            </TableCell>
                            <TableCell className="payment-cell center-row">
                              {order_detail.payment}
                            </TableCell>
                            <TableCell className="action-cell center-row">
                              <button
                                type="button"
                                className="show-desc"
                                onClick={() => handleOpenDesc(order_detail)}
                              >
                                รายละเอียด
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </SimpleBar>
              )}
            </TableContainer>
          </div>
          <div className="ReportWrapper">
            <div className="report-Title">รายการสินค้าใกล้หมด</div>
            <TableContainer component={Paper} className="tableContainer">
              <Table className="tableHeader">
                <TableHead>
                  <TableRow>
                    <TableCell className="header center-row report-productName-cell">
                      สินค้า
                    </TableCell>
                    <TableCell className="header center-row report-stock-cell">
                      สต็อค
                    </TableCell>
                    <TableCell className="header center-row report-remain-cell">
                      เหลือ
                    </TableCell>
                    <TableCell className="header center-row report-action-cell">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>

              {mediumScreen && (
                <SimpleBar
                  className="simplebar"
                  style={{ height: `calc(100vh - 26vh)` }}
                  autoHide={true}
                >
                  <Table>
                    <TableBody className="tableBody">
                      {almostEmptyProducts.map((product) => {
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="center-row report-productName-cell">
                              {product.productName} ปริมาณ : {product.volumn} /
                              ขนาด : {product.size}
                            </TableCell>
                            <TableCell className="center-row report-stock-cell">
                              {product.stock}
                            </TableCell>
                            <TableCell className="center-row report-remain-cell">
                              {product.remain}
                            </TableCell>
                            <TableCell className="center-row report-action-cell">
                              <button
                                type="button"
                                className="show-desc"
                                onClick={() => handleOpenAddProductQty(product)}
                              >
                                เติมสินค้า
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </SimpleBar>
              )}

              {bigScreen && (
                <SimpleBar
                  className="simplebar"
                  style={{ height: `calc(100vh - 21vh)` }}
                  autoHide={true}
                >
                  <Table>
                    <TableBody className="tableBody">
                      {almostEmptyProducts.map((product) => {
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="center-row report-productName-cell">
                              {product.productName} ปริมาณ : {product.volumn} /
                              ขนาด : {product.size}
                            </TableCell>
                            <TableCell className="center-row report-stock-cell">
                              {product.stock}
                            </TableCell>
                            <TableCell className="center-row report-remain-cell">
                              {product.remain}
                            </TableCell>
                            <TableCell className="center-row report-action-cell">
                              <button
                                type="button"
                                className="show-desc"
                                onClick={() => handleOpenAddProductQty(product)}
                              >
                                เติมสินค้า
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </SimpleBar>
              )}
            </TableContainer>
          </div>
        </div>
      </div>

      <BillDesc
        openDesc={openDesc}
        setOpenDesc={setOpenDesc}
        order_detail={order_detail}
        bill={bill}
      />

      <AddProductQty
        openAddProductQty={openAddProductQty}
        setOpenAddProductQty={setOpenAddProductQty}
        productToAdd={productToAdd}
        handleOnAddProductQty={handleOnAddProductQty}
      />

      <ReactNotification />
    </div>
  );
}
