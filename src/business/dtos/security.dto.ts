import { IsEmail } from "class-validator";

export class SecurityDto{
    @IsEmail()
    email: string;

}