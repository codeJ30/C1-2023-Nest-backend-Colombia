import { Injectable } from '@nestjs/common';
import { AccountDTO } from 'src/business/dtos/account.dto';
import {
  AccountEntity,
  AccountRepository,
  AccountTypeEntity,
  AccountTypeRepository,
  CustomerRepository,
} from 'src/data';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  accountMapping(account: AccountDTO): AccountEntity {
    const newUserAccount = new AccountEntity();
    newUserAccount.customer = this.customerRepository.findOneById(
      account.customerId,
    );
    newUserAccount.accountType = this.accountTypeRepository.findOneById(
      account.accountType,
    );
    return newUserAccount;
  }

  findOneById(id: string): AccountEntity {
    return this.accountRepository.findOneById(id);
  }

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */

  createAccount(account: AccountDTO): AccountEntity {
    const newAccount = this.accountMapping(account);
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */

  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  
  findAll(): AccountEntity[] {
    return this.accountRepository.findAll();
  }

  // Obtener cuenta por id
  getAccountId(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }
  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addAccountBalance(accountId: string, amount: number) {
    let account = new AccountEntity();
    account = this.accountRepository.findOneById(accountId);
    account.balance = Number(account.balance) + Number(amount);
    this.accountRepository.update(accountId, account);
    return account.balance;
  }

  
  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */

  removeAccountBalance(accountId: string, amount: number): void {
    if (this.verifyAccountBalance(accountId, amount)) {
      this.accountRepository.findOneById(accountId).balance -= amount;
    } else {
      throw new Error('Transsacción interrumpida por saldo insuficiente');
    }
  }
  /**
   * Verificar la disponibilidad de un monto a retirar de una cuenta
   *
   * @param {string} accountId
   * @param {string} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */

  verifyAccountBalance(accountId: string, amount: number): boolean {
    if (this.accountRepository.findOneById(accountId).balance >= amount) {
      return true;
    }
    return false;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getAccountStatus(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */

  changeAccountState(accountId: string, state: boolean) {
    this.accountRepository.findOneById(accountId).state = state;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */

  getTypeAccount(accountId: string): AccountTypeEntity {
    let newAccount = new AccountTypeEntity();
    newAccount = this.accountRepository.findOneById(accountId).accountType;
    return newAccount;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeTypeAccount(
    accountId: string,
    accountTypeId: string,
  ): AccountTypeEntity {
    const newChangeAccount = this.accountRepository.findOneById(accountId);
    newChangeAccount.accountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    return this.accountRepository.update(accountId, newChangeAccount)
      .accountType;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string) {
    this.accountRepository.delete(accountId);
  }
}
