import { ItemAction, ItemActionType } from "../actions/ItemActions";
import Item from "../interfaces/Item";

interface State {
    items: Item[];
    loading: boolean;
    error?: (Error | null);
}

const initialState = {
    items: [],
    loading: false, 
    error: null 
}

export const itemReducer = (state: State = initialState, action: ItemAction):State => {
    
    switch(action.type) {
        case ItemActionType.GET_ITEMS_PENDING:
            return {
                ...state,
                loading: true 
            } 

        case ItemActionType.GET_ITEMS_SUCCESS:
            return {
                loading: false,
                items: action.payload
            }

        case ItemActionType.GET_ITEMS_FAIL:
            return {
                items: [],
                loading: false,
                error: action.payload 
            }

        default: 
            return state;
    }
}
