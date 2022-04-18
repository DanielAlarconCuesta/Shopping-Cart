import ItemFilter from "./ItemFilter";
import ItemSorter from "./ItemSorter";
import Pagination from "./Pagination";

interface ItemServiceQuery {
    itemFilter?: ItemFilter,
    itemSorter?: ItemSorter,
    pagination?: Pagination
}

export default ItemServiceQuery;
