import { IsUUID , IsNumber } from "class-validator";

export class DepositDto {
    @IsUUID()
    account: string;
    @IsNumber()
    amount = 0;
} 