import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  all(id: number) {
    return this.http.get(`${environment.api}/users/${id}/messages`);
  }

  create(data: any) {
    return this.http.post(`${environment.api}/messages`, data);
  }

  sendImage(data: any) {
    return this.http.post(`${environment.api}/images`, data);
  }
}
