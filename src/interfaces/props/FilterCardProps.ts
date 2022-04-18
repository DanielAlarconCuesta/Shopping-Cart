import FilterItem from "../FilterItem";

interface FilterCardProps {
    title: string,
    filterItems: FilterItem[],
    searchPlaceholder: string,
    onClickHandler?: (filterItem: FilterItem[]) => void
}

export default FilterCardProps;
