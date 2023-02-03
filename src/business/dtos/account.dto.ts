import { IsNumber, IsUUID } from 'class-validator';

export class AccountDTO {
  @IsUUID()
  CustomerEntity: string;
  @IsUUID()
  accountType: string;
  @IsNumber()
  balance: number;
}
