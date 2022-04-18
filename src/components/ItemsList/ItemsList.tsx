import React from "react";
import { FiAlertTriangle } from 'react-icons/fi';

import ItemsListProps from "../../interfaces/props/ItemsListProps";
import Item from "../../interfaces/Item";

import ItemCard from "../ItemCard/ItemCard";
import "./ItemsList.css";

function ItemsList(props: ItemsListProps) {

    if (props && props.items && props.items.length) {

        return (
            <div className="itemsList">
                {
                    props.items.map((item: Item) => {
                        if (item.name && item.price) {
                            return (
                                <ItemCard 
                                    key={item.slug} 
                                    className="itemCard" 
                                    name={item.name} 
                                    price={item.price} 
                                />
                            )
                        }
                    })
                
                }
            </div>
        )

    } else {
        return (
            <div className="itemsList">
                <div className="itemsList-noResults-container">
                    <h3><FiAlertTriangle /> There are no results</h3>
                </div>
            </div>
        )
    }
}

export default ItemsList;
