import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from 'src/data';
import { BaseRepository } from './base/base.repository';
import { AccountRepositoryinterface } from './interfaces/account-repository.interface';

@Injectable()
export class AccountRepository 
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryinterface
{
  
  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deleteAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    if (soft || soft === undefined) {
      const index = this.database.findIndex((item) => item.id === id);
      this.softDelete(index);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.hardDelete(index);
      this.database.splice(index, 1);
    }

  
  }
  private hardDelete(index: number): void {
  this.database.splice(index , 1);

  }

  private softDelete(index: number): void {
    this.database[index].deleteAt = Date.now();
  }

  findAll(): AccountEntity[] {
   return this.database.filter((item) => item.deleteAt === undefined);
  }
  
  findOneById(id: string): AccountEntity {
     const accountData  = this.database.find(
      (item) => item.id === id  && (item.deleteAt ?? true) === true,);
       if (accountData) return accountData;
       else throw new NotFoundException(`El usuario con el id ${id} no se encuentra`);
  }


  findByState(state: boolean): AccountEntity[] {
    const dataState: AccountEntity[] = [];
    this.database.map((account) => {
      if (account.state === state) {
        dataState.push(account);
      }
    });
    return dataState;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const user = this.database.filter(
      (item) =>
        item.customer.id == customerId && typeof item.deleteAt === 'undefined',
    );
    return user;
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    const accType = this.database.filter(
      (item) =>
        item.accountType.id == accountTypeId &&
        typeof item.deleteAt === 'undefined',
    );
    return accType;
  };

}