import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { AccountTypeEntity } from '../entities';
import { AccountTypeRepositoryInterface } from './interfaces/account-type-respository.interface';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  static findOneById: any;
  constructor() {
    super();
    this.database.push(
      {
        id: '18a639a4-38fd-4feb-b5f4-cb000a158d77',
        name: 'Ahorros',
        state: true,
      },
      {
        id: 'c389bb0d-4e79-4e87-849f-3c3662cc59cf',
        name: 'Corriente',
        state: true,
      },
    );
  }

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

    const bankAccount = [
      {
        id: '18a639a4-38fd-4feb-b5f4-cb000a158d77',
        name: 'Ahorros',
        state: true,
      },
      {
        id: 'c389bb0d-4e79-4e87-849f-3c3662cc59cf',
        name: 'Corriente',
        state: true,
      },
    ];
    const account = bankAccount.find((item) => item.id === id);
    if (account) return account;
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
