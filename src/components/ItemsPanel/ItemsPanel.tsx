import React from "react";

import ItemsList from "../ItemsList/ItemsList";
import ProductTypeFilter from "../ProductTypeFilter/ProductTypeFilter";
import Pagination from "../Pagination/Pagination";

import ItemsPanelProps from "../../interfaces/props/ItemsPanelProps";
import "./ItemsPanel.css"

function ItemsPanel(props: ItemsPanelProps) {

    return (
        <div className="itemsPanel">
            <ProductTypeFilter />
            <ItemsList items={props.items} />
            <Pagination />
        </div> 
    )
}

export default ItemsPanel;
