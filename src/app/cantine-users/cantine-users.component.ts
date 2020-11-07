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
  totalAmount: number = 0;
  messageAfter: any = {userId: null, content: '', color: 'black'};

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
        this.loadUsers();
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

  closeEditMode(userId: number) {
    this.displayMessage(userId);
    this.totalAmount = 0;
    this.editMode = null;
    setTimeout(
      () => this.messageAfter = {userId: null, content: '', color: 'black'}, 3000
    );
  }

  updateUserWallet(userId: number, operation: string) {

    let options = {
      headers: { 'Authorization': this.token }
    };

    let amount: number = 10;
    this.cantineService
      .updateUserWallet(operation, userId, amount, options)
      .subscribe(res => {
        if (operation === 'credit') {
          this.totalAmount += 10;
        } else {
          this.totalAmount -= 10;
        }
        this.loadUsers();
      });

  }

  displayMessage(userId: number) {
    let message: string  = 'Le comte n\'a pas été crédité.';
    let color: string = 'blue';
    if (this.totalAmount > 0) {
      message = 'Le comte a été crédité de ' + this.totalAmount + ' €.';
      color = 'green';
    } else if (this.totalAmount < 0) {
      message = 'Le comte a été débité de ' + Math.abs(this.totalAmount) + ' €.';
      color = 'red';
    }
    this.messageAfter = {
      userId: userId,
      content: message,
      color: color
    }
  }



}
