import { Body, Controller, Post, Param, Delete } from '@nestjs/common';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { DepositDTO } from '../../../business/dtos/deposit.dto';
import { DepositEntity } from '../../../data/persistence/entities/deposit.entity';

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
}
