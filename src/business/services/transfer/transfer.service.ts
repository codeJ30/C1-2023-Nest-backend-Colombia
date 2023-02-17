/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity, TransferModel, TransferRepository } from 'src/data';
//import { DataRangeModel } from 'src/data/models/data-range.model';
//import { PaginationModel } from 'src/data/models/pagination.model';
import { TransferDTO } from '../../dtos/transfer.dto';
import { AccountService } from '../account/account.service';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DataRangeModel } from 'src/data/models/data-range.model';
//import { TransferModel } from '../../../../dist/src/data/models/transfer.model';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class TransferService {
  getTransferByIdUser(id: string){
    this.customerService.getCustomerData(id);
    this.transferRepository.findAll()
  }

  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
   if(dataRange) {
    const history= this.transferRepository.findOutcomeByDataRange(
      accountId,
      dataRange.dateInit ?? 0,
      dataRange.dateEnd ?? Date.now(),
    ).filter (
      (item) => item.outcome.id === accountId &&
      item.amount > (dataRange.amountInit ?? 0) && 
      item.amount < (dataRange.amountEnd ?? Number.MAX_SAFE_INTEGER),
     );
     return history.slice(
      pagination.size * pagination.page,
      pagination.size * pagination.page+ pagination.size,
     )
   }
   return[];
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
    if (dataRange) {
      const history = this.transferRepository.findIncomeByDataRange(
       accountId,
       dataRange.amountInit ?? 0,
       dataRange.amountEnd ?? Date.now(), 
      ).filter (
        (item) => item.income.id === accountId && 
        item.amount > (dataRange.amountInit ?? 0) &&
        item.amount < (dataRange.amountEnd ?? Number.MAX_SAFE_INTEGER)
      );
      return history.slice(
        pagination.size * pagination.page,
        pagination.size * pagination.page + pagination.size
      )
    }
    return[]
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
    actualPage: number,
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByDataRange(
      accountId,
      0,
      Date.now(),
    );
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (actualPage - 1);
      x < 1 + range + range * (actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */

  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}
