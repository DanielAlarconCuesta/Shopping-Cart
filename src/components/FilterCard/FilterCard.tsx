import React, { useState, useEffect, useRef } from "react";

import FilterCardProps from "../../interfaces/props/FilterCardProps";
import FilterItem from "../../interfaces/FilterItem";

import "./FilterCard.css";

function FilterCard(props: FilterCardProps) {

    const [filterItems, setFilterItems] = useState<FilterItem[]>(props?.filterItems || []);
    const [handleOnSearchTimeout, setHandleOnSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [handleOnClickTimeout, setHandleOnClickTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [handleOnClickAllTimeout, setHandleOnClickAllTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [elementsChecked, setElementsChecked] = useState<number>(0);

    const checkAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        if (filterItems && elementsChecked != 0 && filterItems.length <= elementsChecked) {
            setAllChecked(true);

        } else {
            setAllChecked(false);
        }

    }, [elementsChecked, filterItems]);

    const handleCheckboxClick = (filterItem: FilterItem): void => {

        let items: FilterItem[] = filterItems.map((item) => {

            if (item.id === filterItem.id) {
                item.checked = !item.checked;
                setElementsChecked(item.checked ? (elementsChecked + 1) : (elementsChecked - 1));
            }

            return item;
        })

        setFilterItems(items);

        if (props.onClickHandler && typeof(props.onClickHandler) == "function") {

            if (handleOnClickTimeout != null) {
                clearTimeout(handleOnClickTimeout);
                setHandleOnClickTimeout(null);
            }
    
            setHandleOnClickTimeout(setTimeout(() => {

                let checkedItems: FilterItem[] = getCheckedItems();

                if (checkedItems.length != 0 && checkedItems.length != filterItems.length) {
                    props.onClickHandler!(checkedItems);

                } else {
                    props.onClickHandler!([]);
                }

            }, 1000));
        }
    }

    const getCheckedItems = (): FilterItem[] => {
        return filterItems.filter((item: FilterItem) => item.checked);
    }

    const handleClickAll = () => {

        let items: FilterItem[] = filterItems.map((item) => {
        
            item.checked = !allChecked;
            return item;
        })

        setFilterItems(items);

        if (!allChecked) {
            setAllChecked(true);
            setElementsChecked(filterItems.length);
        
        } else {
            setAllChecked(false);
            setElementsChecked(0);
        }

        if (props.onClickHandler && typeof(props.onClickHandler) == "function") {

            if (handleOnClickAllTimeout != null) {
                clearTimeout(handleOnClickAllTimeout);
                setHandleOnClickAllTimeout(null);
            }

            setHandleOnClickAllTimeout(setTimeout(() => {
                props.onClickHandler!([]);
            }, 1000))
        }
    }

    useEffect(() => {
        setFilterItems(props.filterItems || [])
    }, [props.filterItems])

    const handleOnSearch = ((event: React.ChangeEvent<HTMLInputElement>) => {

        if (handleOnSearchTimeout != null) {
            clearTimeout(handleOnSearchTimeout);
            setHandleOnSearchTimeout(null);
        }

        setHandleOnSearchTimeout(setTimeout(() => {
            
            let searchText = event?.target?.value,
                afterQueryItems: FilterItem[] = [];

            if (props?.filterItems && searchText) {

                searchText = searchText.toLowerCase();
                afterQueryItems = props.filterItems.filter((item: FilterItem) => {

                    if (item.name.toLowerCase().includes(searchText)) {
                        return true
                    }

                    return false;
                })
                
            } else {
                afterQueryItems = props?.filterItems || [];
            }

            setFilterItems(afterQueryItems);

        }, 500));
    });

    const handleAllLabelClick = () => {

        if (checkAllRef?.current) {
            checkAllRef.current.select();
            checkAllRef.current.blur();
        }
    }

    return (
        <div className="filterCardContainer">
            
            <div className="filterCardTitle">
                <span>{props.title}</span>
            </div>
            
            <div className="filterCard">

                <div className="filterCardSearcher">
                    <input 
                        type="string" 
                        placeholder={props.searchPlaceholder} 
                        onChange={event => handleOnSearch(event)}
                    />
                </div>

                <div className="filterCardItems">

                    <div className="listElement">

                        <input 
                            className="checkbox" 
                            type="checkbox" 
                            id="all" 
                            name="all" 
                            onChange={(event) => handleClickAll()}
                            checked={allChecked}
                            ref={checkAllRef}
                        />

                        <label 
                            htmlFor="all"
                            className="label"
                            onClick={(event) => handleAllLabelClick()}
                        >
                            All
                        </label>

                    </div>

                    {
                        filterItems.map((filterItem: FilterItem) => (
                            <div 
                                className="listElement" 
                                key={filterItem.id}
                            >
                                
                                <input 
                                    className="checkbox" 
                                    type="checkbox" 
                                    name={filterItem.id}
                                    checked={filterItem?.checked}
                                    onChange={() => handleCheckboxClick(filterItem)}
                                />

                                <label 
                                    htmlFor={filterItem.id}
                                    className="label"
                                    onClick={() => handleCheckboxClick(filterItem)}
                                >
                                    {filterItem.name}
                                </label>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default FilterCard;
