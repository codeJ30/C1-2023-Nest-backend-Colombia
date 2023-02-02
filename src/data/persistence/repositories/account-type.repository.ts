import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { AccountTypeEntity } from '../entities';
import { AccountTypeRepositoryInterface } from './interfaces/account-type-respository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  
  index: number;
  data: AccountTypeEntity;
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    this.index = this.database.findIndex((item) => item.id === id);
    this.data = this.database[this.index];
    this.database[this.index] = {
      ...this.data,
      ...entity,
      id: id,
    };
    return this.database[this.index];
  }

  delete(id: string, soft?: boolean): void {
    this.index = this.database.findIndex((item) => item.id === id);
    if (soft === true) {
      const data = this.database[this.index];
      data.state = false;
      this.database[this.index] = {
        ...data,
      };
    } else {
      delete this.database[this.index];
    }
  }
  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const bankAccount = this.database.find((item) => item.id === id);
    if (bankAccount) return bankAccount;
    else throw new NotFoundException(`El usuario con el Id ${id}, no existe`);
  }

  findByState(state: boolean): AccountTypeEntity[] {
    const contidion = this.database.filter((item) => item.state == state);
    return contidion;
  }
  findByName(name: string): AccountTypeEntity[] {
    const customerName = this.database.filter((item) => item.name == name);
    return customerName;
  }
}
