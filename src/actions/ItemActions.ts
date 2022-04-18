import Item from "../interfaces/Item";

export enum ItemActionType {
    GET_ITEMS_PENDING = "GET_ITEMS_PENDING",
    GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
    GET_ITEMS_FAIL = "GET_ITEMS_FAIL"
}

interface ItemActionPending {
    type: ItemActionType.GET_ITEMS_PENDING
}

interface ItemActionSuccess {
    type: ItemActionType.GET_ITEMS_SUCCESS
    payload: Item[];
}

interface ItemActionFail {
    type: ItemActionType.GET_ITEMS_FAIL
    payload?: (Error | null);
}

export type ItemAction = (ItemActionPending | ItemActionSuccess | ItemActionFail)
