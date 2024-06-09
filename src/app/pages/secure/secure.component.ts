import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        console.log(response)
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
