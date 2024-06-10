import {signal} from "@angular/core";
import {User} from "../classes/user";

export const currentUser = signal<User | null>(null);
