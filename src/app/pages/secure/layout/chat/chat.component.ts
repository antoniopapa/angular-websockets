import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../../../../services/message.service";
import {SocketService} from "../../../../services/socket.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
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
