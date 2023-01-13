export class Product {
    price: any;
    productDescription: string;
    productName: string;

    constructor(price: any, productDescription: string, productName: string) {
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
    }
}
