import { IsNumber, IsString, IsUUID } from 'class-validator';

export class TransferDTO {
  @IsUUID()
  outcome: string;
  @IsUUID()
  income: string;
  @IsNumber()
  amount: number;
  @IsString()
  reason: string;
}
