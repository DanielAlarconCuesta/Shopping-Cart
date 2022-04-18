import Pagination from "../../interfaces/Pagination";

export enum FilterPaginationActionType {
    GET_FILTER_PAGINATION_SUCCESS = "GET_FILTER_PAGINATION_SUCCESS",
}

interface FilterPaginationActionSuccess {
    type: FilterPaginationActionType.GET_FILTER_PAGINATION_SUCCESS;
    payload: Pagination;
}

export type FilterPaginationAction = FilterPaginationActionSuccess;
