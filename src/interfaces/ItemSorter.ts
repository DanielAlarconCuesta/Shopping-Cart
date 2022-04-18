import Order from "../enums/Order";
import Sort from "../enums/Sort";

interface ItemSorter {
    sort?: Sort,
    order?: Order
}

export default ItemSorter;
