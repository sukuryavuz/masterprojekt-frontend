export class Product {
    id?: any;
    price: any;
    productDescription: string;
    productName: string;

    constructor(price: any, productDescription: string, productName: string, id?: any) {
        this.id = id;
        this.price = price;
        this.productDescription = productDescription;
        this.productName = productName;
    }
}
