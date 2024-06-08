import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io("ws://localhost:8080/", {})

  constructor() {
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on("message", (message) => {
        observer.next(message);
      })

      return () => {
        this.socket.disconnect();
      }
    });
  }
}
