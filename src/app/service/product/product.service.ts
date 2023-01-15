import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'http://localhost:8080/products/'
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

    getAvailableProducts(): Observable<any> {
      return this.http.get<any>(this.url + "available-products", this.getHeaders())
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
