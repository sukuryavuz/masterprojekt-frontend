export class Product {
    id: any;
    price: any;
    productDescription: string;
    productName: string;

    constructor(id: any, price: any, productDescription: string, productName: string) {
        this.id = id;
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
    }
}
