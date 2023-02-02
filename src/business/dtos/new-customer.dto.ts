import {
    IsEmail,
    IsNumberString,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class NewCustomerDTO {
    @IsUUID()
    documentTypeId: string;
  
    @IsNumberString()
    document: string;
  
    @IsString()
    @MaxLength(500)
    fullName: string;
  
    @IsEmail()
    email: string;
  
    @IsNumberString()
    @MaxLength(30)
    phone: string;
  
    @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    @MinLength(8)
    password: string;
  }