import { TagAction, TagActionType } from "../actions/TagActions";

interface State {
    tags: string[];
    loading: boolean;
    error?: (Error | null);
}

const initialState = {
    tags: [],
    loading: false, 
    error: null 
}

export const tagReducer = (state: State = initialState, action: TagAction):State => {
    
    switch(action.type) {
        case TagActionType.GET_TAGS_PENDING:
            return {
                ...state,
                loading: true 
            } 

        case TagActionType.GET_TAGS_SUCCESS:
            return {
                loading: false,
                tags: action.payload
            }

        case TagActionType.GET_TAGS_FAIL:
            return {
                tags: [],
                loading: false,
                error: action.payload 
            }

        default: 
            return state;
    }
}
