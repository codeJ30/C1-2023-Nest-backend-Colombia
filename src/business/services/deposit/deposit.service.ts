import { Injectable } from '@nestjs/common';
import { DepositDto } from 'src/business/dtos';
import { DepositEntity, DepositRepository } from 'src/data';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';


@Injectable()
export class DepositService {

constructor (private readonly depositRepository: DepositRepository,
             private readonly accountRepository: AccountRepository){}

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createNewDeposit(deposit: DepositDto): DepositEntity {
   const newDeposit = new DepositEntity();
   newDeposit.amount = deposit.amount;
   newDeposit.account = this.accountRepository.findOneById(deposit.account);
   newDeposit.dateTime = Date.now();
  
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
    if(eliminatedDeposit.deleteAt === undefined){
     this.depositRepository.delete(depositId , true); 
    }else {
      this.depositRepository.delete(depositId , false); 
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
    //pagination: PaginationModel,
    //dataRange?: DataRangeModel,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
