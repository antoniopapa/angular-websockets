import {Routes} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {ChatComponent} from "./pages/secure/layout/chat/chat.component";
import {LoginComponent} from "./pages/login/login.component";
import {SecureComponent} from "./pages/secure/secure.component";
import {AccountComponent} from "./pages/secure/account/account.component";
import {LayoutComponent} from "./pages/secure/layout/layout.component";
import {RoomCreateComponent} from "./pages/secure/room-create/room-create.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: SecureComponent,
    children: [
      {path: 'account', component: AccountComponent},
      {path: 'rooms/create', component: RoomCreateComponent},
      {
        path: '',
        component: LayoutComponent,
        children: [
          {path: 'rooms/:id', component: ChatComponent},
        ]
      }
    ]
  }
];
