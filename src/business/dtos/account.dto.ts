import { IsNumber, IsUUID } from 'class-validator';

export class AccountDTO {
  @IsUUID()
  CustomerEntityId: string;
  @IsUUID()
  accountType: string;
  @IsNumber()
  balance: number;
}
