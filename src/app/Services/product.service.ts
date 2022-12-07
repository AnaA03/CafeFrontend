import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.url;

  constructor(private _httpClient:HttpClient) { }

  //Add Product
  add(data:any){
    return this._httpClient.post(this.url + '/product/add/',data);
  }

  update(data:any) {
    return this._httpClient.patch(this.url+'/product/update/',data);
  }

  getProducts() {
    return this._httpClient.get(this.url+'/product/get/');
  }

  updateStatus(data:any){
    return this._httpClient.patch(this.url+'/product/updateStatus/',data);
  }
  delete(id:any){
    return this._httpClient.delete(this.url+'/product/delete/'+id);

  }

  getProductsByCategory(id:any) {
    return this._httpClient.get(this.url + '/product/getByCategory/'+ id);
  }

  getById(id:any){
    return this._httpClient.get(this.url +'/product/getById/'+ id);
  }
}
