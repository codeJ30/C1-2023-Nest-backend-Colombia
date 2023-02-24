import { Body, Controller, Post, Param, Delete, Get, ParseUUIDPipe } from '@nestjs/common';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { DepositDTO } from '../../../business/dtos/deposit.dto';
import { DepositEntity } from '../../../data/persistence/entities/deposit.entity';
import { PaginationEntity } from '../../../data/persistence/entities/pagination.entity';
import { DataRangeDTO } from '../../../business/dtos/data-range.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}
  //crear un deposito

  @Post('newDeposit')
  createNewDeposit(@Body() deposit: DepositDTO): DepositEntity {
    return this.depositService.createNewDeposit(deposit);
  }

  // Borrar un deposito
  @Delete('delete/:id')
  deleteDeposit(@Param('id') id: string): void {
    this.depositService.deleteDeposit(id);
  }

  @Get()
  getAllDeposits(): DepositEntity[] {
    return this.depositService.findAll();
  }

  @Post('getHistory/:id')
  getHistory(
    @Param('id' , new ParseUUIDPipe) id: string,
    @Body() data: { dimension: number; range: number },
  ): DepositEntity[] {
    const pagination = new PaginationEntity();
    pagination.actualPage = data.dimension;
    pagination.numberPages = data.range;
    return this.depositService.getHistory(id, pagination)
 }
} 