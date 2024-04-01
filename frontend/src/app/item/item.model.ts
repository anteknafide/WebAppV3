export interface Item {
    _id?        : string,
    _rev?       : string,
    name        : string,
    description : string,
    price       : number | string,
    category    : "Hat" | "Pants" | "T-shirt"
}