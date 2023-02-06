import { IsDateString, IsNumber } from 'class-validator';

export class DataRangeDTO {
  @IsDateString()
  dateInit?: number | Date;
  @IsDateString()
  dateEnd?: number | Date;
  @IsNumber()
  amountInit: number;
  @IsNumber()
  amountEnd: number;
}
