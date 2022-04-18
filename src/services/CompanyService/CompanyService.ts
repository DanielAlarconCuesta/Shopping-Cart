import CompanyServiceResult from "../../interfaces/CompanyServiceResult";

const COMPANY_SERVICE_HOST: (string | undefined) = process.env.REACT_APP_COMPANY_SERVICE_HOST;

export async function getCompanies(): Promise<CompanyServiceResult> {

    let companyServiceResult: CompanyServiceResult,
        endpoint: (string  | null);

    companyServiceResult = {
        companies: []
    };

    if (!COMPANY_SERVICE_HOST) {
        companyServiceResult.error = new Error("Company Service host is missing");
        return companyServiceResult;
    }

    endpoint = _prepareEndpoint(COMPANY_SERVICE_HOST);
    
    if (!endpoint) {
        companyServiceResult.error = new Error("Company Service host is not valid");
        return companyServiceResult;
    }

    companyServiceResult = await _doRequest(endpoint);

    return companyServiceResult;
}

function _prepareEndpoint(host: string): string | null {

    // No Params so far
    if (host) {
        return host
    }

    return null
}

async function _doRequest(endpoint: string): Promise<CompanyServiceResult> {

    let companyServiceResult: CompanyServiceResult;

    companyServiceResult = {
        companies: []
    }

    const handleOk = async (response: Response) => {

        let data = await response.json().catch(error => handleError(error));

        if (data && Array.isArray(data)) {
            companyServiceResult.companies = data;
        
        } else {
            companyServiceResult.companies = [];
        }
    }

    const handleError = (error?: Error | null) => {

        if (error && typeof(error) == "string") {
            companyServiceResult.error = new Error(error);

        } else if (error && error instanceof Error) {
            companyServiceResult.error = error;

        } else {
            companyServiceResult.error = new Error("Unknown error");
        }
    }
    
    try {

        let response = await fetch(endpoint).catch(error => handleError(error));

        if (response && response.ok) {
            await handleOk(response);

        } else {
            handleError(new Error(response?.statusText || "Unknown error"));
        }
    
    } catch(error: any) {
        handleError(error);
    
    } finally {
        return companyServiceResult;
    }
}

const CompanyService = {
    getCompanies
}

export default CompanyService;
