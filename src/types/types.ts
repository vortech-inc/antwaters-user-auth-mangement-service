import { Document } from "mongoose";

export interface UserPayload {
    id: string;
    email: string;
    roles: string[];
    password: string
}


interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
  }
  