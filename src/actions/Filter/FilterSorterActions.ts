import ItemSorter from "../../interfaces/ItemSorter";

export enum FilterSorterActionType {
    GET_FILTER_SORTER_SUCCESS = "GET_FILTER_SORTER_SUCCESS",
}

interface FilterSorterActionSuccess {
    type: FilterSorterActionType.GET_FILTER_SORTER_SUCCESS
    payload: ItemSorter;
}

export type FilterSorterAction = FilterSorterActionSuccess;
