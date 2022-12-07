import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.url;
  
  constructor(private _httpClient : HttpClient) { }

  getDetails(){
    return this._httpClient.get(this.url + "/dashboard/details");
  }
}
