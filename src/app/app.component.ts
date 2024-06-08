import 'bootstrap/dist/css/bootstrap.min.css';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "./services/message.service";
import {SocketService} from "./services/socket.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService
  ) {
    this.form = this.formBuilder.group({
      message: ''
    })
  }

  ngOnInit() {
    this.socketService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  submit() {
    this.messageService.create(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
