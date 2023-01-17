import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/';

  private user: BehaviorSubject<User>;
  private isLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    if(localStorage.getItem('user')) {
      this.isLoggedIn = new BehaviorSubject<boolean>(true);
    } else {
      this.isLoggedIn = new BehaviorSubject<boolean>(false);
    }
  }

  createLoginBody(username: string, password: string) {
    return {
      username: username,
      password: password
    }
  }

  createRegisterBody(firstname: string, lastname: string, username: string, password: string) {
    return {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + 'login', JSON.stringify(
      this.createLoginBody(username, password)
    )).pipe(retry(1), catchError(this.handleLoginError.bind(this)));
  }

  register(firstname: string, lastname: string, username: string, password: string): Observable<void> {
    return this.http.post<any>(this.url + 'user/register', JSON.stringify(
        this.createRegisterBody(firstname, lastname, username, password),
      ), this.httpOptions
    ).pipe(
        retry(1),
        catchError(this.handleRegisterError.bind(this))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
    this.user.next(null!);
    this.router.navigate(['/']);
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setUser(user: User) {
    this.user.next(user);
  }

  getUser() : Observable<User> {
    return this.user.asObservable();
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

  handleLoginError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.error}`;
      if(errorMessage === 'Unauthorized') {
        errorMessage = 'Bitte überprüfen sie Ihre Zugangsdaten.'
      }
    }
    this.snackBar.open(errorMessage, 'X');
    return throwError(() => {
      return errorMessage;
    });
  }

  handleRegisterError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error}`;
    }
    this.snackBar.open(errorMessage, 'X');
    return throwError(() => {
      return errorMessage;
    });
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
}
