import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.url;

  constructor(private _httpClient:HttpClient) { }

  //Add Category
  add(data:any){
    return this._httpClient.post(this.url + '/category/add/',data);
  }

  update(data:any) {
    return this._httpClient.patch(this.url+'/category/update/',data);
  }

  getCategories() {
    return this._httpClient.get(this.url+'/category/get/');
  }
}
