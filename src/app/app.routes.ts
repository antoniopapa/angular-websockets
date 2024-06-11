import {Routes} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {ChatComponent} from "./pages/secure/layout/chat/chat.component";
import {LoginComponent} from "./pages/login/login.component";
import {SecureComponent} from "./pages/secure/secure.component";
import {AccountComponent} from "./pages/secure/account/account.component";
import {LayoutComponent} from "./pages/secure/layout/layout.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: 'account', component: AccountComponent},
      {
        path: '',
        component: LayoutComponent,
        children: [
          {path: 'users/:id', component: ChatComponent},
        ]
      }
    ]
  }
];
