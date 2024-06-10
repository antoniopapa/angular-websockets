import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../classes/user";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  users: User[] = [];
  s = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.load();
  }

  search(event: any) {
    this.s = event.target.value;
    this.load();
  }

  load() {
    this.userService.all(this.s).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
