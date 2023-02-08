import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { DepositDTO } from '../../../business/dtos/deposit.dto';
import { DepositEntity } from '../../../data/persistence/entities/deposit.entity';
import { PaginationEntity } from '../../../data/persistence/entities/pagination.entity';

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

  @Get('history/:id')
  getHistory(
    @Param('id') id: string,
    @Body() data: { dimension: number; page: number },
  ): DepositEntity[] {
    const pagination = new PaginationEntity();
    pagination.dimension = data.dimension;
    pagination.page = data.page;
    return this.depositService.getHistory(id, pagination);
  }
}
