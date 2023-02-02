import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { DepositDto } from '../../../business/dtos/deposit.dto';
import { DepositEntity } from '../../../data/persistence/entities/deposit.entity';

@Controller('deposit')
export class DepositController {
    
constructor(private readonly depositService: DepositService){}
    //crear un deposito

    @Post('newDeposit')
    createNewDeposit(@Body() deposit: DepositDto): DepositEntity{
        return this.depositService.createNewDeposit(deposit);
    }

    // Borrar un deposito
    @Put('delete/:depositId')
    deleteDeposit(@Param('depositId') depositId: string): void{
        this.depositService.deleteDeposit(depositId);
    }



}
