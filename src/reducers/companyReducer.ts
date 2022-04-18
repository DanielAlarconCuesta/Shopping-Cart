import { CompanyAction, CompanyActionType } from "../actions/CompanyActions";
import Company from "../interfaces/Company";

interface State {
    companies: Company[];
    loading: boolean;
    error?: (Error | null);
}

const initialState = {
    companies: [],
    loading: false, 
    error: null 
}

export const companyReducer = (state: State = initialState, action: CompanyAction):State => {
    
    switch(action.type) {
        case CompanyActionType.GET_COMPANIES_PENDING:
            return {
                ...state,
                loading: true 
            } 

        case CompanyActionType.GET_COMPANIES_SUCCESS:
            return {
                loading: false,
                companies: action.payload
            }

        case CompanyActionType.GET_COMPANIES_FAIL:
            return {
                companies: [],
                loading: false,
                error: action.payload 
            }

        default: 
            return state;
    }
}
