import {Component, effect} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {currentUser} from "../../../signals/user";

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

    effect(() => {
      this.form.patchValue({
        first_name: currentUser()?.first_name,
        last_name: currentUser()?.last_name,
        email: currentUser()?.email,
      })
    });
  }

  submit() {
    this.authService.update(this.form.getRawValue()).subscribe((response: any) => {
      currentUser.set(response);
      this.router.navigate(['/']);
    })
  }
}
