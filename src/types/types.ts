import { Document } from "mongoose";

// export interface UserPayload {
//     _id: {}
//     id?: string;
//     email: string;
//     role: string;
//     password: string,
//     createdAt: NativeDate,
//     refreshToken: string
// }


export interface IProfile{
  
        phoneNumber: string, 
        lastName: string, 
        firstName: string, 
        address?: string,
        designation?: string,
        specialization?: string, 
        experience?: number


}
export interface IUserPayload  {
    profile: IProfile,      
    email: string, 
    userName?: string, 
    password: string, 
    role: string
    availability?:{
        status: boolean
    } 
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
  