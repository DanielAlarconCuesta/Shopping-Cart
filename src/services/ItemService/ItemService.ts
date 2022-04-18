import ItemServiceResult from "../../interfaces/ItemServiceResult";
import ItemServiceQuery from "../../interfaces/ItemServiceQuery";

const ITEM_SERVICE_HOST: (string | undefined) = process.env.REACT_APP_ITEM_SERVICE_HOST;

export async function getItems(itemServiceQuery: ItemServiceQuery): Promise<ItemServiceResult> {

    let itemServiceResult: ItemServiceResult,
        endpoint: (string  | null);

    itemServiceResult = {
        items: []
    };

    if (!ITEM_SERVICE_HOST) {
        itemServiceResult.error = new Error("Item Service host is missing");
        return itemServiceResult;
    }

    endpoint = _prepareEndpoint(ITEM_SERVICE_HOST, itemServiceQuery);
    
    if (!endpoint) {
        itemServiceResult.error = new Error("Item Service host is not valid");
        return itemServiceResult;
    }

    itemServiceResult = await _doRequest(endpoint);

    return itemServiceResult;
}


function _prepareEndpoint(host: string, itemServiceQuery?: ItemServiceQuery): string | null {

    if (!host) {
        return null;
    }

    let url = new URL(host),
        endpoint = url.toString(),
        params = new URLSearchParams(url.search);
    

    if (itemServiceQuery) {

        /********** FILTERS **********/

        if (itemServiceQuery.itemFilter && itemServiceQuery.itemFilter.manufacturers) {

            itemServiceQuery.itemFilter.manufacturers.forEach(manufacturer => {
                if (manufacturer) {
                    params.append("manufacturer_like", manufacturer);
                }
            })
        }
    
        if (itemServiceQuery.itemFilter && itemServiceQuery.itemFilter.tags) {
            
            itemServiceQuery.itemFilter.tags.forEach(tag => {
                if (tag) {
                    params.append("tags_like", tag);
                }
            })
        }


        /********** SORTERS **********/
    
        if (itemServiceQuery.itemSorter && itemServiceQuery.itemSorter.order) {
            params.append("_order", itemServiceQuery.itemSorter.order);
        }

        if (itemServiceQuery.itemSorter && itemServiceQuery.itemSorter.sort) {
            params.append("_sort", itemServiceQuery.itemSorter.sort);
        }


        /********** PAGINATION **********/

        if (itemServiceQuery.pagination && itemServiceQuery.pagination.page) {
            params.append("_page", itemServiceQuery.pagination.page.toString());

            if (itemServiceQuery.pagination.limit) {
                params.append("_limit", itemServiceQuery.pagination.limit.toString());
            }
        }

    }

    if (params.toString()) {
        endpoint += `?${params.toString()}`;
    }

    return endpoint;
}

async function _doRequest(endpoint: string): Promise<ItemServiceResult> {

    let itemServiceResult: ItemServiceResult;

    itemServiceResult = {
        items: []
    }

    const handleOk = async (response: Response) => {

        let data = await response.json().catch(error => handleError(error));

        if (data && Array.isArray(data)) {
            itemServiceResult.items = data;
        
        } else {
            itemServiceResult.items = [];
        }
    }

    const handleError = (error?: Error | null) => {

        if (error && typeof(error) == "string") {
            itemServiceResult.error = new Error(error);

        } else if (error && error instanceof Error) {
            itemServiceResult.error = error;

        } else {
            itemServiceResult.error = new Error("Unknown error");
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
        return itemServiceResult;
    }
}

const ItemService = {
    getItems
}

export default ItemService;
