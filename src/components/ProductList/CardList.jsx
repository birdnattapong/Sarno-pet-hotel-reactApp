import React from "react";
import "./CardList.css";
import CardItem from "./ProductItem/CardItem";
import "simplebar/dist/simplebar.css";
import SimpleBar from "simplebar-react";
import { useMediaQuery } from "@material-ui/core";

export default function CardList(props) {
  const bigScreen = useMediaQuery("(min-width: 1536px)");
  const mediumScreen = useMediaQuery("(max-width: 1535px)");
  const { products, onAdd, searchTerm } = props;

  const displayProductCard = (data) => {
    return data.filter((product) => {
        if (searchTerm === "" && product.remain > 0) {
          return product
        } else if (product.productName.toLowerCase().includes(searchTerm.toLowerCase()) && product.remain > 0) {
          return product
        }
    }).map((product) => {
      return <CardItem key={product._id} product={product} onAdd={onAdd} />;
    });
  };

  return (
    <div>
      {bigScreen && (
        <SimpleBar style={{ height: 670 }} autoHide={true}>
          <div className="cardlist">{displayProductCard(products)}</div>
        </SimpleBar>
      )}

      {mediumScreen && (
        <SimpleBar style={{ height: 530 }} autoHide={true}>
          <div className="cardlist">{displayProductCard(products)}</div>
        </SimpleBar>
      )}
    </div>
  );
}
