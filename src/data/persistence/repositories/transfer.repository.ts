import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base/base.repository';
import { Transferinterface } from './interfaces/transfer-repository.interface';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements Transferinterface
{
  findByDataRange(
    AccountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const arrayTransfer = this.findAll();
    return arrayTransfer.filter(
      (item) =>
        item.id === AccountId &&
        item.date_time >= dateInit &&
        item.date_time <= dateEnd,
    );
  }

  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deleteAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as TransferEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    if (soft || soft === undefined) {
      const i = this.database.findIndex((item) => item.id === id);
      this.softDelete(i);
    } else {
      const i = this.database.findIndex((item) => item.id === id);
      this.hardDelete(i);
      this.database.splice(i, 1);
    }
  }
  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deleteAt = Date.now();
  }

  findAll(): TransferEntity[] {
    return this.database.filter((item) => item.deleteAt === undefined);
  }

  findOneById(id: string): TransferEntity {
    const trfData = this.database.find(
      (item) => item.id === id && (item.deleteAt ?? true) === true,
    );
    if (trfData) return trfData;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findOutcomeById(accountId: string): TransferEntity[] {
    const transferArray = this.database.filter(
      (item) => item.outcome.id === accountId,
    );
    if (transferArray.length > 0) {
      return transferArray;
    } else {
      throw new NotFoundException('Transferencia inexistente');
    }
  }

  findIncomeById(accountId: string): TransferEntity[] {
    const arrayTransfer = this.database.filter(
      (item) => item.income.id === accountId,
    );
    if (arrayTransfer.length > 0) {
      return arrayTransfer;
    } else {
      throw new NotFoundException('Transferencia inexistente');
    }
  }
}
