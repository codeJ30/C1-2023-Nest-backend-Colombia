import { IsNumberString, IsUUID } from 'class-validator';

export class AccountDTO {
  @IsUUID()
  customerId: string;
  @IsUUID()
  accountType: string;
  @IsNumberString()
  balance: number;
  
}
