import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import ItemCardProps from "../../interfaces/props/ItemCardProps";

function ItemCard(props: ItemCardProps) {
    
    const [itemImage, setItemImage] = useState<string>("/ImageNotFound.png");

    useEffect(() => {
        
        setItemImage(props?.img 
            ? props.img 
            : "/ImageNotFound.png"
        );
    }, [props.img])

    return(
        <div className="itemCard">

            <div className="itemImage">
                <img src={itemImage} alt={`${props.name} image`} />
            </div>

            <div className="itemPrice">
                <span>$ {props.price}</span>
            </div>

            <div className="itemName">
                <span>{props.name}</span>
            </div>

            <div className="itemButton">
                <button>Add</button>
            </div>

        </div>
    )
}

export default ItemCard;
