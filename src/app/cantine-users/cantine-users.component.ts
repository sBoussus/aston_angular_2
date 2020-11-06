import { CantineService } from './../services/cantine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cantine-users',
  templateUrl: './cantine-users.component.html',
  styleUrls: ['./cantine-users.component.css']
})
export class CantineUsersComponent implements OnInit {

  token: string | null = null;
  users: any[] = [];
  editMode: number | null = null;
  // private _player: any;
  // player: any;

  constructor(private cantineService: CantineService) { }

  ngOnInit(): void {
  }

  startLogin() {
    let credentials = {
      email: 'toto@gmail.com',
      password: 'bonjour'
    };
    this.cantineService
      .login(credentials)
      .subscribe((res: any) => {
        this.token = res.headers.get('Authorization');
        console.log(this.token);
      });
  }

  getUsers() {
    let options = {
      headers: { 'Authorization': this.token }
    };
    this.cantineService
      .getUsers(options)
      .subscribe((res: any) => {
        this.users = res;
      });

  }

  launchEditMode(userId: number) {
    this.editMode = userId;
  }

  closeEditMode() {
    this.editMode = null;
  }

  updateUserWallet(userId: number) {

    let options = {
      headers: { 'Authorization': this.token }
    };

    this.cantineService
      .getUserById(userId, options)
      .subscribe((user: any) => {
        user.wallet = user.wallet + 10;
        console.log(user.wallet);
        let options2 = {
          headers: { 'Authorization': this.token, 'amount': 100 }
        };
        let credentials = {
          'amount': 100,
        };
        this.cantineService
          .creditUser(user, credentials, options2)
          .subscribe(res => {
            console.log(res);
            // this.getUsers();
          });
      });

    // this.cantineService
    //   .updateUser(userId, editedUser, options)
    //   .subscribe(res => {
    //     this.getUsers();
    //   });

  }



}
