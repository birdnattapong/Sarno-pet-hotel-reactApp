import React, { useState } from "react";
import "./productTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { EditOutlined, DeleteOutlineOutlined } from "@material-ui/icons";
import "simplebar/dist/simplebar.css";
import SimpleBar from "simplebar-react";
import { useMediaQuery } from "@material-ui/core";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

export default function ProductTable(props) {
  const bigScreen = useMediaQuery("(min-width: 1536px)");
  const mediumScreen = useMediaQuery("(max-width: 1535px)");
  const { products, searchTerm, handleOnUpdateProduct, handleOnDeleteProduct } =
    props;

  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const handleOpenEdit = (idEdit) => {
    setOpenEdit(true);
    setIdEdit(idEdit);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const handleOpenDelete = (idDelete) => {
    setOpenDelete(true);
    setIdDelete(idDelete);
  };

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table className="tableHeader">
        <TableHead>
          <TableRow>
            <TableCell className="center-row header img-cell">
              รูปสินค้า
            </TableCell>
            <TableCell className="center-row header name-cell">
              ชื่อสินค้า ({products.length})
            </TableCell>
            <TableCell className="center-row header volumn-cell">
              ปริมาณ
            </TableCell>
            <TableCell className="center-row header size-cell">ขนาด</TableCell>
            <TableCell className="center-row header basePrice-cell">
              ราคาต้นทุน
            </TableCell>
            <TableCell className="center-row header sellPrice-cell">
              ราคาขาย
            </TableCell>
            <TableCell className="center-row header stock-cell">
              สต็อค
            </TableCell>
            <TableCell className="center-row header remain-cell">
              เหลือ
            </TableCell>
            <TableCell className="center-row header action-cell">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      {bigScreen && (
        <SimpleBar
          className="simplebar"
          style={{ height: `calc(100% - 8%)` }}
          autoHide={true}
        >
          <Table>
            <TableBody className="tableBody">
              {products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="img-cell">
                        <img
                          className="product-image"
                          src={product.imgUrl}
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="name-cell inherit-font">
                        {product.productName}
                      </TableCell>
                      <TableCell className="volumn-cell center-row">
                        {product.volumn}
                      </TableCell>
                      <TableCell className="size-cell center-row">
                        {product.size}
                      </TableCell>
                      <TableCell className="basePrice-cell center-row">
                        {product.basePrice}
                      </TableCell>
                      <TableCell className="sellPrice-cell center-row">
                        {product.sellPrice}
                      </TableCell>
                      <TableCell className="stock-cell center-row">
                        {product.stock}
                      </TableCell>
                      <TableCell className="remain-cell center-row">
                        {product.remain}
                      </TableCell>
                      <TableCell className="action-cell center-row">
                        <EditOutlined
                          className="edit-button"
                          onClick={() => handleOpenEdit(product.id)}
                        />
                        <DeleteOutlineOutlined
                          className="delete-button"
                          onClick={() => handleOpenDelete(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </SimpleBar>
      )}

      {mediumScreen && (
        <SimpleBar
          className="simplebar"
          style={{ height: `calc(100% - 10%)` }}
          autoHide={true}
        >
          <Table>
            <TableBody className="tableBody">
              {products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="img-cell">
                        <img
                          className="product-image"
                          src={product.imgUrl}
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="name-cell inherit-font">
                        {product.productName}
                      </TableCell>
                      <TableCell className="volumn-cell center-row">
                        {product.volumn}
                      </TableCell>
                      <TableCell className="size-cell center-row">
                        {product.size}
                      </TableCell>
                      <TableCell className="basePrice-cell center-row">
                        {product.basePrice}
                      </TableCell>
                      <TableCell className="sellPrice-cell center-row">
                        {product.sellPrice}
                      </TableCell>
                      <TableCell className="stock-cell center-row">
                        {product.stock}
                      </TableCell>
                      <TableCell className="remain-cell center-row">
                        {product.remain}
                      </TableCell>
                      <TableCell className="action-cell center-row">
                        <EditOutlined
                          className="edit-button"
                          onClick={() => handleOpenEdit(product.id)}
                        />
                        <DeleteOutlineOutlined
                          className="delete-button"
                          onClick={() => handleOpenDelete(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </SimpleBar>
      )}

      <EditDialog
        open={openEdit}
        setOpen={setOpenEdit}
        id={idEdit}
        handleOnUpdateProduct={handleOnUpdateProduct}
      />
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        id={idDelete}
        handleOnDeleteProduct={handleOnDeleteProduct}
      />
    </TableContainer>
  );
}
