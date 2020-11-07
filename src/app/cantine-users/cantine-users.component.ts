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

  loadUsers() {
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

  updateUserWallet(userId: number, operation: string) {

    let options = {
      headers: { 'Authorization': this.token }
    };

    let amount: number = 10;
    this.cantineService
      .updateUserWallet(operation, userId, amount, options)
      .subscribe(res => {
        this.loadUsers();
      });

  }



}
