import {Routes} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {ChatComponent} from "./pages/chat/chat.component";

export const routes: Routes = [
  {path: '', component: ChatComponent},
  {path: 'register', component: RegisterComponent}
];
