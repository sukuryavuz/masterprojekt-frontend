export class User {
    id?: any;
    firstname?: string;
    lastname?: string;
    password: string;
    username: string;

    constructor(password: string, username: string, id?: any, firstname?: string, lastname?: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.username = username;
    }
}

// used to register an User
export interface Userr {
  firstname: string;
  lastname: string;
  password: string;
  username: string;
}
