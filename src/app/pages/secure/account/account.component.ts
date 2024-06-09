import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    })
  }

  submit() {
    this.authService.update(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
