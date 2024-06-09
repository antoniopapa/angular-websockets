import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent implements OnInit {
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: () => {
        this.router.navigate(["/login"]);
      }
    })
  }
}
