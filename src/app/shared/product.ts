import { FileHandle } from "./file-handle.model";

export class Product {
    id?: any;
    price: any;
    productDescription: string;
    productName: string;
    productImages: FileHandle[]

    constructor(price: any, productDescription: string, productName: string, productImages: FileHandle[], id?: any) {
        this.id = id;
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
        this.productImages = productImages;
    }
}
