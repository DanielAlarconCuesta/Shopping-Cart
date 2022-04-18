import Company from "../interfaces/Company";

export enum CompanyActionType {
    GET_COMPANIES_PENDING = "GET_COMPANIES_PENDING",
    GET_COMPANIES_SUCCESS = "GET_COMPANIES_SUCCESS",
    GET_COMPANIES_FAIL = "GET_COMPANIES_FAIL"
}

interface CompanyActionPending {
    type: CompanyActionType.GET_COMPANIES_PENDING
}

interface CompanyActionSuccess {
    type: CompanyActionType.GET_COMPANIES_SUCCESS
    payload: Company[];
}

interface CompanyActionFail {
    type: CompanyActionType.GET_COMPANIES_FAIL
    payload?: (Error | null);
}

export type CompanyAction = (CompanyActionPending | CompanyActionSuccess | CompanyActionFail)
