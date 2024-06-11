import {Component} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  upload(event: any) {
    const files = event.target.files;
    if (files === null) return;
    const file = files.item(0);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("receiver_id", this.route.snapshot.params["id"]);

    this.messageService.sendImage(formData).subscribe({
      next: () => {
        console.log('success')
      }
    })
  }
}
