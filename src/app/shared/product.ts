import { FileHandle } from "./file-handle.model";

export class Product {
    productId?: any;
    price: any;
    productDescription: string;
    productName: string;
    productImages?: FileHandle[]

    constructor(price: any, productDescription: string, productName: string, productImages?: FileHandle[], productId?: any) {
        this.productId = productId;
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
        this.productImages = productImages;
    }
}
