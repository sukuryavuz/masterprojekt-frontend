export class User {
    id?: any;
    firstname: string;
    lastname: string;
    password: string;
    username: string;

    constructor(firstname: string, lastname: string, password: string, username: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.username = username;
    }
}
