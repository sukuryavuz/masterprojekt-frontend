import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { Product } from 'src/app/shared/product';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:8080/user/'
  headers: any;

  private user: BehaviorSubject<User>;
  private isLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    if(localStorage.getItem('user')) {
      this.isLoggedIn = new BehaviorSubject<boolean>(true);
    } else {
      this.isLoggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(this.url + userId, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getMyBoughtProducts(userId: string): Observable<any> {
    return this.http.get<any>(this.url + userId + "/products", this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  createUserBody(firstname: string, lastname: string, username: string, password: string) {
    return {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password
    }
  }
  updateUser(userId: string, firstname:string, lastname: string, username: string, password: string): Observable<any> {
    return this.http.put<any>(
      this.url + userId,
      JSON.stringify(this.createUserBody(firstname, lastname, username, password)),
      this.getHeaders()
    ).pipe(retry(1), catchError(this.handleError))
  }

  addProduct(
    userId: any,
    productName: any,
    productDescription: any,
    price: any
  ): Observable<any> {
    const product = {
      productName: productName,
      productDescription: productDescription,
      price: price
    };
    console.log(product);
    return this.http.post<any>(
      this.url + userId + "/product",
      JSON.stringify(product),
      this.getHeaders()
    )
    .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return { headers: this.headers };
  }
}
