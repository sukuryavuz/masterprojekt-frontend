import { Component } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { User } from '../shared/user';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@Component({
  standalone: true,
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css'],
  imports: [MatInputModule, MatFormFieldModule, MatCardModule]
})
export class ProfileOverviewComponent {
  user: User;

  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.user.username)
    .subscribe((response) => {
      this.getUser = response;
      console.log(response);
    })
  }

  save(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ): void {
    console.log(firstname);

  }

}
