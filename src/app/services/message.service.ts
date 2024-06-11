import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  all(id: number, page = 1) {
    return this.http.get(`${environment.api}/rooms/${id}/messages?page=${page}`);
  }

  create(id: number, data: any) {
    return this.http.post(`${environment.api}/rooms/${id}/messages`, data);
  }

  sendImage(id: number, data: any) {
    return this.http.post(`${environment.api}/rooms/${id}/images`, data);
  }
}
