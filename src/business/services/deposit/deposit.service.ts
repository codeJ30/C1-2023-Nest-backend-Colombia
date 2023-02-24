import { Injectable } from '@nestjs/common';
import { DepositDTO } from 'src/business/dtos';
import { AccountEntity, DepositEntity, DepositRepository } from 'src/data';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';

@Injectable()
export class DepositService {
  newDeposit: AccountEntity;
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  depositMapping(deposit: DepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();
    const account = this.accountRepository.findOneById(deposit.account);
    newDeposit.account = account;
    newDeposit.amount = deposit.amount;
    return newDeposit;
  }

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createNewDeposit(deposit: DepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountRepository.findOneById(deposit.account);
    newDeposit.amount = Number(deposit.amount);
    newDeposit.dateTime =  Date.now();
    let newAccount = new AccountEntity();
    newAccount = this.accountRepository.findOneById(deposit.account);
    newAccount.balance += Number(deposit.amount);
    this.accountRepository.update(deposit.account, newAccount);
    return this.depositRepository.register(newDeposit);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const eliminatedDeposit = this.depositRepository.findOneById(depositId);
    if (eliminatedDeposit.deleteAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {

    const transferArray = this.depositRepository.findByDataRange(
      accountId,
      0,
      Date.now());
      return transferArray.slice(
        pagination.actualPage * pagination.numberPages,
        pagination.actualPage * pagination.numberPages + pagination.numberPages!,
      )
      
      }

  findAll(): DepositEntity[] {
    return this.depositRepository.findAll();
  }
}

/*const arrayTransfer = this.depositRepository.findByDateRange(accountId, 0, Date.now())
const arrayTransferReturn: DepositEntity[] = []
let range = 0
pagination.size = arrayTransfer.length;
if (dataRange?.range === undefined) {
    range = 10
}
else {
    range = dataRange.range
}
pagination.numberPages = Math.round(pagination.size / range)
for (let x = 1 + range * (pagination.actualPage - 1); x < 1 + range +
*/
