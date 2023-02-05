import { IsNumberString, IsUUID } from 'class-validator';

export class AccountDTO {
  @IsUUID()
  CustomerEntity: string;
  @IsUUID()
  accountType: string;
  @IsNumberString()
  balance: number;
}
