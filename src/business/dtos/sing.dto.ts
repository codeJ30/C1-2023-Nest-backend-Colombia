import { IsEmail, MinLength } from 'class-validator';

export class SignDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
