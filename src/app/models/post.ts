import { Mood } from "./mood";
import { User } from "./user";

export interface Post {

    id: number;

    note: string;

    createdAt: string;

    mood: Mood;

    userDto: User;

}
