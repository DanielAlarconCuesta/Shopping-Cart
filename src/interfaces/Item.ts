import ItemType from "../enums/ItemType";

interface Item {
    tags?: string[],
    itemType: ItemType,

    price?: number,
    added: number,

    name?: string,
    description: string,
    slug: string,
    manufacturer: string,
}

export default Item;
