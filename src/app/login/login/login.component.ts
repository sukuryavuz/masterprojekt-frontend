import { Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/register/register.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, RegisterComponent, ReactiveFormsModule]
})
export class LoginComponent {
  public form:FormGroup;

  firstname: string;
  lastname: string;
  username: string;
  password: string;

  constructor(
    fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.form = fb.group({
      username:[null, Validators.required],
      password: [null, Validators.required]
    })
    this.loginService.logout();
  }

  login(username:string, password:string): boolean {
    if(this.form.controls['username'].invalid || this.form.controls['password'].invalid) {
      this.snackBar.open('Sie müssen einen Usernamen und ein Passwort eingeben, um sich anzumelden.', 'X');
      return false;
    }
    this.loginService
      .login(username, password)
      .subscribe(data => {
        this.snackBar.open(`Sie sind nun eingelogged`, 'X');
        const user = new User(data.username, data.id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
        this.loginService.setUser(user);
        this.loginService.setIsLoggedIn(true);
        this.router.navigate(['/available-products']);
      })
      return true;
  }

  register(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        password: this.password
      },
    });
  }
}
