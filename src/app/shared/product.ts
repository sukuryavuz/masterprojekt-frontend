import { FileHandle } from "./file-handle.model";

export class Product {
    productId?: any;
    price: any;
    productDescription: string;
    productName: string;
    file?: FileHandle[]

    constructor(price: any, productDescription: string, productName: string, file?: FileHandle[], productId?: any) {
        this.productId = productId;
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
        this.file = file;
    }
}
