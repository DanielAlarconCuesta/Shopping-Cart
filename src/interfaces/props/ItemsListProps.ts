import React from "react";
import Item from "../../interfaces/Item";

interface ItemsListProps {
    className?: string,
    style?: React.CSSProperties,
    items: Item[]
}

export default ItemsListProps;
