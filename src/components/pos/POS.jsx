import React, { useState } from "react";
import "./POS.css";
import { Search } from "@material-ui/icons";
import CardList from "../ProductList/CardList";

export default function POS(props) {
  const { products, onAdd } = props;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="POS">
      <div className="top">
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
      <div className="content">
        <CardList searchTerm={searchTerm} onAdd={onAdd} products={products} />
      </div>
    </div>
  );
}
