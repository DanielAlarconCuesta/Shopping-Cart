export enum FilterTagActionType {
    GET_FILTER_TAGS_SUCCESS = "GET_FILTER_TAGS_SUCCESS",
}

interface FilterTagActionSuccess {
    type: FilterTagActionType.GET_FILTER_TAGS_SUCCESS
    payload: string[];
}

export type FilterTagAction = FilterTagActionSuccess;
