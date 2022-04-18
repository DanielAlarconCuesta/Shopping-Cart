import Company from "./Company";

interface CompanyServiceResult {
    companies?: Company[],
    error?: Error
}

export default CompanyServiceResult;
