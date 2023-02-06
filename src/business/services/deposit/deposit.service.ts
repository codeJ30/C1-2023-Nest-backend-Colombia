import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositDTO } from 'src/business/dtos';
import { AccountEntity, DepositEntity, DepositRepository } from 'src/data';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { AccountService } from '../account/account.service';

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
    newDeposit.dateTime = new Date();
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
    if (dataRange) {
      const newList = this.depositRepository.findByDataRange(
        dataRange.dateInit ?? 0,
        dataRange.dateEnd ?? Date.now(),
      );
      const array = newList.filter(
        (item: { account: { id: string }; amount: number }) =>
          item.account.id === accountId &&
          (item.amount >= Number(dataRange.amountInit) ?? 0) &&
          (item.amount <= Number(dataRange.amountEnd) ?? Number.MAX_VALUE),
      );

      return array.slice(
        pagination.dimension * pagination.page,
        pagination.dimension * pagination.page + pagination.dimension,
      );
    }
    const start = pagination.dimension * pagination.page;
    const end = start + Number(pagination.dimension);
    const array = this.depositRepository
      .findAll()
      .filter((item) => item.account.id === accountId)
      .slice(start, end);
    return array;
  }
}
