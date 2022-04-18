export enum FilterCompanyActionType {
    GET_FILTER_COMPANIES_SUCCESS = "GET_FILTER_COMPANIES_SUCCESS",
}

interface FilterCompanyActionSuccess {
    type: FilterCompanyActionType.GET_FILTER_COMPANIES_SUCCESS
    payload: string[];
}

export type FilterCompanyAction = FilterCompanyActionSuccess;
