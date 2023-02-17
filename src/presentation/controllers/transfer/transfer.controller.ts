import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TransferService } from 'src/business/services';
import { TransferDTO } from '../../../business/dtos/transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  //Crear una transferencia entre cuentas del banco
  @Post('createTransfer')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTransfer(@Body() transfer: TransferDTO) {
    return this.transferService.createTransfer(transfer);
  }

  @Get('getTransfer/:id')
   getTransfer(@Param('id') id: string){
    return this.transferService.getTransferByIdUser(id);
   }
}
