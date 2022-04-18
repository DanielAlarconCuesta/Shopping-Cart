import Item from "./Item";

interface ItemServiceResult {
    items?: Item[],
    error?: Error
}

export default ItemServiceResult;
