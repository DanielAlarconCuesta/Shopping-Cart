import React from "react";

interface ItemCardProps {
    className?: string,
    style?: React.CSSProperties,
    img?: string | null,
    price: number,
    name: string
}

export default ItemCardProps;
