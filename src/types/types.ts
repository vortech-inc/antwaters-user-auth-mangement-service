import { Document } from "mongoose";

export interface UserPayload {
    _id: {}
    id?: string;
    email: string;
    role: string;
    password: string,
    createdAt: NativeDate,
    refreshToken: string
}

export interface UserIdProps {
    id: string,
    email?: string
}

export interface IUserAuth {
    id: string;
    email: string;
    role: string[];
    password: string
}


interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    role: string
    
  }
  