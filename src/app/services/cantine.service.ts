import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API: string = "http://localhost:8080/lunchtime";

@Injectable({
  providedIn: 'root'
})
export class CantineService {

  constructor(private http: HttpClient) { }

  login(credentials: any): any {
    return this.http.post(API + '/login', credentials, {observe: "response"});
  }

  getUsers(options: any): any {
    return this.http.get(API + '/user/findall', options);
  }

}
