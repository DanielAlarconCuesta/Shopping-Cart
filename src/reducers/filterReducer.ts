import { FilterCompanyAction, FilterCompanyActionType } from "../actions/Filter/FilterCompanyActions";
import { FilterTagAction, FilterTagActionType } from "../actions/Filter/FilterTagActions";
import { FilterSorterAction, FilterSorterActionType } from "../actions/Filter/FilterSorterActions";
import { FilterPaginationAction, FilterPaginationActionType } from "../actions/Filter/FilterPaginationActions";

import ItemFilter from "../interfaces/ItemFilter";
import ItemSorter from "../interfaces/ItemSorter";
import Pagination from "../interfaces/Pagination";

import Sort from "../enums/Sort";
import Order from "../enums/Order";

interface State {
    filter: ItemFilter;
    sorter: ItemSorter;
    pagination: Pagination;
}

const initialState = {

    filter: {
        manufacturer: [],
        tags: []
    },

    sorter: {
        sort: Sort.price,
        order: Order.asc
    },

    pagination: {
        page: 1,
        limit: 16
    }
}

export const filterCompanyReducer = (state: State = initialState, action: FilterCompanyAction):State => {
    
    switch(action.type) {

        case FilterCompanyActionType.GET_FILTER_COMPANIES_SUCCESS:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    manufacturers: action.payload
                }
            }

        default: 
            return state;
    }
}

export const filterTagReducer = (state: State = initialState, action: FilterTagAction):State => {
    
    switch(action.type) {

        case FilterTagActionType.GET_FILTER_TAGS_SUCCESS:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    tags: action.payload
                }
            }

        default: 
            return state;
    }
}

export const filterSorterReducer = (state: State = initialState, action: FilterSorterAction):State => {
    
    switch(action.type) {

        case FilterSorterActionType.GET_FILTER_SORTER_SUCCESS:
            return {
                ...state,
                sorter: action.payload
            }

        default: 
            return state;
    }
}

export const filterPaginationReducer = (state: State = initialState, action: FilterPaginationAction):State => {
    
    switch(action.type) {

        case FilterPaginationActionType.GET_FILTER_PAGINATION_SUCCESS:
            return {
                ...state,
                pagination: action.payload
            }

        default: 
            return state;
    }
}
