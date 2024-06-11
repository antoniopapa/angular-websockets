import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../classes/user";
import {RoomService} from "../../../services/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      title: '',
      members: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.userService.all().subscribe({
      next: (response: any) => {
        this.users = response;
        this.users.forEach(user => {
          (this.form.get('members') as FormArray).push(
            this.formBuilder.group({
              value: false,
              id: user.id
            })
          )
        })
      }
    })
  }

  submit() {
    const data = this.form.getRawValue()
    this.roomService.create({
      title: data.title,
      members: data.members.filter((m: any) => m.value === true).map((m: any) => m.id)
    }).subscribe({
      next: () => this.router.navigate(['/'])
    })
  }
}
