import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Userr } from '../shared/user';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule]
})
export class RegisterComponent {
  readonly model = {
    firstname: this.data.firstname,
    lastname: this.data.lastname,
    username: this.data.username,
    password: this.data.password
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: Userr,
    public dialogRef: MatDialogRef<RegisterComponent, boolean>,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  registrieren(form: NgForm): void {
    this.loginService
      .register(this.model.firstname, this.model.lastname, this.model.username, this.model.password)
      .subscribe(() => {
        this.snackBar.open('Sie haben sich erfolgreich registriert. Nun können Sie sich einloggen');
        this.dialogRef.close(true);
      });
  }
}
