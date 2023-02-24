import { Controller, Post, Body, Param, Get, ParseUUIDPipe } from '@nestjs/common';
import { TransferService } from 'src/business/services';
import { TransferDTO } from '../../../business/dtos/transfer.dto';
import { TransferEntity } from '../../../data/persistence/entities/transfer.entity';
import { PaginationEntity } from '../../../data/persistence/entities/pagination.entity';
import { DataRangeEntity } from 'src/data/persistence/entities/dataRange.entity';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  //Crear una transferencia entre cuentas del banco
  @Post('createTransfer')
  createTransfer(@Body() transfer: TransferDTO): TransferEntity{
    return this.transferService.createTransfer(transfer);
  }
  @Post('outHistory/:id')
  getOutHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()data:{actualPage: number; range: number}){
        const newPagination = new PaginationEntity();
        const newRange = new DataRangeEntity();
        newPagination.actualPage = data.actualPage;
        newRange.range = data.range;
        return this.transferService.getHistoryOut(id, newPagination , newRange)
      }
  
  @Post('outHistory/:id')
    getIncomeHistory(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body()data:{actualPage: number; range: number}){
        const newPagination = new PaginationEntity();
        const newRange = new DataRangeEntity();
        newPagination.actualPage = data.actualPage;
        newRange.range = data.range;
        return this.transferService.getHistoryIn(id, newPagination , newRange)
    }
  
  @Post('getAllHistory/:id')
  getAllHistory(
    @Param('id' , new ParseUUIDPipe()) id: string,
    @Body() data: {actualPage: number ; range: number},
  ){
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newRange = new DataRangeEntity();
    newRange.range = data.range;
    let historyOut: TransferEntity[];
    try {
      historyOut = this.transferService.getHistoryOut(
        id, newPagination, newRange,
      );
    } catch (error) {
      historyOut = [];
    }
    let historyIn: TransferEntity[];
    try {
      historyIn=this.transferService.getHistoryIn(
        id, newPagination, newRange,
      )
    } catch (error) {
      historyIn = []
    }

    return [
      ...historyOut,
      ...historyIn
    ];
  } 
      

  @Get()
   getTransfer(){
    return this.transferService.findAll();
   }

   @Get(':id')
   findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
     return this.transferService.findOneById(id);
   }
}
