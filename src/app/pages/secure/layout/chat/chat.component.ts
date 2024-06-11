import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../../../../services/message.service";
import {SocketService} from "../../../../services/socket.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../../../classes/message";
import {currentUser} from "../../../../signals/user";
import {UploadComponent} from "../../../../components/upload/upload.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UploadComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  messages: Message[] = [];
  protected readonly currentUser = currentUser;
  page = 0;
  last_page = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      content: ''
    })
  }

  ngOnInit() {
    this.socketService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.loadMore()
  }

  loadMore() {
    this.page++;
    this.messageService.all(this.route.snapshot.params["id"], this.page).subscribe({
      next: (response: any) => {
        this.messages = this.page === 1 ? response.messages : [...response.messages, ...this.messages]
        this.last_page = response.messages.length === 0;
      }
    })
  }

  submit() {
    const formData = this.form.getRawValue();
    formData["receiver_id"] = this.route.snapshot.params["id"];
    this.messageService.create(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
