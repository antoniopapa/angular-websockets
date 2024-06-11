import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../../../../services/message.service";
import {SocketService} from "../../../../services/socket.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../../../classes/message";
import {currentUser} from "../../../../signals/user";
import {UploadComponent} from "../../../../components/upload/upload.component";
import {Room} from "../../../../classes/room";
import {User} from "../../../../classes/user";

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
  page = 1;
  last_page = false;
  room!: Room;
  id!: number;

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
    this.route.params.subscribe((value: any) => {
      this.id = value.id;

      this.socketService.getMessages().subscribe((message: any) => {
        this.messages.push(message);
      });

      this.load()
    })
  }

  loadMore() {
    this.page++;
    this.load()
  }

  load() {
    this.messageService.all(this.id, this.page).subscribe({
      next: (response: any) => {
        this.room = response.room;
        this.messages = this.page === 1 ? response.messages : [...response.messages, ...this.messages]
        this.last_page = response.messages.length === 0;
      }
    })
  }

  members() {
    return this.room?.members.map((m: User) => m.first_name + ' ' + m.last_name).join(', ');
  }

  submit() {
    const formData = this.form.getRawValue();
    this.messageService.create(this.id, formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
