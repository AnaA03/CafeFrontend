import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  constructor(private _httpClient: HttpClient) { }

  signup(data : any) {
    return this._httpClient.post("http://localhost:4050/user/signup",data);
  }

  forgetPassword(data : any) {
    return this._httpClient.post(this.url + "/user/forgetPassword",data);
  }

  login(data : any) {
    return this._httpClient.post(this.url + "/user/login",data);
  }

  checkToken(){
    return this._httpClient.get(this.url + "/user/checkToken");
  }

  changePassword(data : any) {
    return this._httpClient.post(this.url + '/user/changePassword',data)
  }

  getUser(){
    return this._httpClient.get(this.url+ '/user/get/');
  }

  updateUser(data:any){
    return this._httpClient.patch(this.url + '/user/update',data)
  }

  hello(){
    return this._httpClient.get("http://localhost:4050/");
  }
}
