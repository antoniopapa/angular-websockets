import {User} from "./user";

export class Room {
  id!: number;
  title!: string;
  members!: User[];
}
