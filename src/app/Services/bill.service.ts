import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.url;

  constructor(private _httpClient:HttpClient) { }

  generateReport(data:any){
    return this._httpClient.post(this.url + '/bill/generateReport/',data);
  }

  getPdf(data:any):Observable<Blob>{
    return this._httpClient.post(this.url + '/bill/getPdf',data,{responseType:'blob'});  
  }

  getBills(){
    return this._httpClient.get(this.url + '/bill/getBill/');
  }

  delete(id:any){
    return this._httpClient.delete(this.url + '/bill/delete/' + id);
  }


}
