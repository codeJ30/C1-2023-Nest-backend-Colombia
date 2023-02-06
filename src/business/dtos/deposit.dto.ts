import { IsUUID, IsPositive, IsNumber } from 'class-validator';

export class DepositDTO {
  @IsUUID()
  account: string;
  @IsNumber()
  @IsPositive()
  amount: number;
}
