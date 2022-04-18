import TagServiceResult from "../../interfaces/TagServiceResult";

const TAG_SERVICE_HOST: (string | undefined) = process.env.REACT_APP_TAG_SERVICE_HOST;

async function _doRequest(endpoint: string): Promise<TagServiceResult> {

    let tagServiceResult: TagServiceResult;

    tagServiceResult = {
        tags: []
    }

    const handleOk = async (response: Response) => {

        let data = await response.json().catch(error => handleError(error));

        if (data && Array.isArray(data)) {
            tagServiceResult.tags = data;
        
        } else {
            tagServiceResult.tags = [];
        }
    }

    const handleError = (error?: Error | null) => {

        if (error && typeof(error) == "string") {
            tagServiceResult.error = new Error(error);

        } else if (error && error instanceof Error) {
            tagServiceResult.error = error;

        } else {
            tagServiceResult.error = new Error("Unknown error");
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
        return tagServiceResult;
    }
}

function _prepareEndpoint(host: string): string | null {

    // No Params so far
    if (host) {
        return host
    }

    return null
}

export async function getTags(): Promise<TagServiceResult> {

    let tagServiceResult: TagServiceResult,
        endpoint: (string  | null);

    tagServiceResult = {
        tags: []
    };

    if (!TAG_SERVICE_HOST) {
        tagServiceResult.error = new Error("Tag Service host is missing");
        return tagServiceResult;
    }

    endpoint = _prepareEndpoint(TAG_SERVICE_HOST);
    
    if (!endpoint) {
        tagServiceResult.error = new Error("Tag Service host is not valid");
        return tagServiceResult;
    }

    tagServiceResult = await _doRequest(endpoint);

    return tagServiceResult;
}

const TagService = {
    getTags
}

export default TagService;
