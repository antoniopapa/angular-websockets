import {Routes} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {ChatComponent} from "./pages/secure/chat/chat.component";
import {LoginComponent} from "./pages/login/login.component";
import {SecureComponent} from "./pages/secure/secure.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: '', component: ChatComponent},
    ]
  }
];
