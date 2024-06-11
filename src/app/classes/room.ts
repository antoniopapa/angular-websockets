import {User} from "./user";
import {Message} from "./message";

export class Room {
  id!: number;
  title!: string;
  members!: User[];
  last_message!: Message | null;
}
