import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API: string = 'http://localhost:8080/lunchtime';

@Injectable({
  providedIn: 'root'
})
export class CantineService {

  constructor(private http: HttpClient) { }

  login(credentials: any): any {
    return this.http.post(API + '/login', credentials, {observe: 'response'});
  }

  getUsers(options: any): any {
    return this.http.get(API + '/user/findall', options);
  }

  getUserById(userId: number, options: any): any {
    return this.http.get(API + '/user/find' + '/' + userId, options);
  }

  updateUserWallet(operation: string, userId: number, amount: number, options: any): any {
    return this.http.post(API + '/user/' + operation + '/' + userId + '/?amount=' + amount, options, { headers: options.headers });
  }

}
