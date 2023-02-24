/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity, TransferModel, TransferRepository } from 'src/data';
import { TransferDTO } from '../../dtos/transfer.dto';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class TransferService {
 
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountRepository: AccountRepository,
    private readonly customerService: CustomerService,
  ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: TransferDTO): TransferModel {
    const newMovement = new TransferEntity();
    const newIncome = this.accountRepository.findOneById(transfer.income);
    const newOutcome = this.accountRepository.findOneById(transfer.outcome);
    if (newOutcome.balance >= Number(transfer.amount)) {
      newMovement.income = newIncome;
      newMovement.outcome = newOutcome;
      newMovement.amount = Number(transfer.amount);
      newMovement.reason = transfer.reason;
      newOutcome.balance -= Number(transfer.amount);
      this.accountRepository.update(newOutcome.id, newOutcome);
      newIncome.balance += Number(transfer.amount);
      this.accountRepository.update(newIncome.id, newIncome);
      newMovement.date_time = Date.now();
      return this.transferRepository.register(newMovement);
    } else {
      throw new NotFoundException(
        'Transaccion Rechazada, por fondos insufientes',
      );
    }
  }
  findOneById(id: string) {
    const transfer = this.transferRepository.findOneById(id);
    if(transfer){
      return transfer;
    }else {
      throw new NotFoundException('El id de la transferencia no existe')
    }
  }
  
  findAll() {
    return this.transferRepository.findAll();
   } 

   getTransferByIdUser(id: string) {
    this.customerService.getCustomerData(id);
    this.transferRepository.findAll();
  }
  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const transferArray = this.transferRepository.findOutcomeById(accountId);
    const getArrayTransfer: TransferEntity[] = [];
    let range = 0;
    pagination.size = transferArray.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let num = 1 + range * (pagination.actualPage! - 1);
      num < 1 + range + range * (pagination.actualPage! - 1);
      num++
    ) {
      if (num === pagination.size + 1) break;
      getArrayTransfer.push(transferArray[num - 1]);
    }
    return getArrayTransfer;
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findIncomeById(accountId);
    const getArrayTransfer: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let num = 1 + range * (pagination.actualPage! - 1);
      num < 1 + range + range * (pagination.actualPage! - 1);
      num++
    ) {
      if (num === pagination.size + 1) break;
      getArrayTransfer.push(arrayTransfer[num - 1]);
    }
    return getArrayTransfer;
  }
  
  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */

  getHistory(
    accountId:string,
    pagination:PaginationModel,
    dataRange?: DataRangeModel,
  ):TransferEntity[] {
    const transferArray = this.transferRepository.findByDataRange(
      accountId,
      0,
      Date.now(),
      );
      const getTransferArray : TransferEntity[] = [];
      let range = 0 ;
      pagination.size = transferArray.length;
      if(dataRange?.range === undefined){
        range = 10;
      } else{
        range= dataRange.range;
      }
      pagination.numberPages = Math.round(pagination.size / range);
      for(
        let num = 1 + range * (pagination.actualPage - 1);
        num > 1 + range + range *(pagination.actualPage - 1);
        num++)
        {         
          getTransferArray.push(transferArray[num - 1]);
        }
        return getTransferArray;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */

  deleteTransfer(transferId: string): void {
    const transfer = this.transferRepository.findOneById(transferId);
    this.transferRepository.delete(transferId);
    if (transfer.deleteAt === undefined) {
      this.transferRepository.delete(transferId, true);
    } else {
      this.transferRepository.delete(transferId, false);
    }
  }
}
