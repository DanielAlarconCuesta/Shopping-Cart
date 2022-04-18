export enum TagActionType {
    GET_TAGS_PENDING = "GET_TAGS_PENDING",
    GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS",
    GET_TAGS_FAIL = "GET_TAGS_FAIL"
}

interface TagActionPending {
    type: TagActionType.GET_TAGS_PENDING
}

interface TagActionSuccess {
    type: TagActionType.GET_TAGS_SUCCESS
    payload: string[];
}

interface TagActionFail {
    type: TagActionType.GET_TAGS_FAIL
    payload?: (Error | null);
}

export type TagAction = (TagActionPending | TagActionSuccess | TagActionFail)
