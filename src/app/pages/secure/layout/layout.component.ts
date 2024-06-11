import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {Room} from "../../../classes/room";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  rooms: Room[] = [];
  s = '';

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.load();
  }

  search(event: any) {
    this.s = event.target.value;
    this.load();
  }

  load() {
    this.roomService.all(this.s).subscribe({
      next: (response: any) => {
        this.rooms = response;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
