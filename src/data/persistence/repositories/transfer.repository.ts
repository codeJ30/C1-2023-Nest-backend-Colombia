import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities/transfer.entity';
import { BaseRepository } from './base/base.repository';
import { Transferinterface } from './interfaces/transfer-repository.interface';

@Injectable()
export class TransferRepository 
extends BaseRepository<TransferEntity>
implements Transferinterface 
{


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

  delete(id: string , soft?: boolean): void {
    
    if (soft || soft === undefined){
        const i = this.database.findIndex((item) => item.id ===id);
      this.softDelete(i);}
      else {
        const i = this.database.findIndex((item) => item.id ===id);
        this.hardDelete(i);
        this.database.splice(i , 1);
      }

    }
    private hardDelete(index: number): void {
        this.database.splice(index, 1) 
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
  
    findOutcomeByDataRange(
      accountId: string,
      dateInit: Date | number,
      dateEnd: Date | number,
    ): TransferEntity[] {
      const range = this.database.filter(
        (item) =>
          item.outcome.id === accountId &&
          typeof item.deleteAt === 'undefined' &&
          item.date_time >= dateInit &&
          item.date_time <= dateEnd,
      );
      if (range === undefined) throw new NotFoundException();
      return range;
    }
  
    findIncomeByDataRange(
      accountId: string,
      dateInit: Date | number,
      dateEnd: Date | number,
    ): TransferEntity[] {
      const inputR = this.database.filter(
        (item) =>
          item.outcome.id === accountId &&
          typeof item.deleteAt === 'undefined' &&
          item.date_time >= dateInit &&
          item.date_time <= dateEnd,
      );
      if (inputR === undefined) throw new NotFoundException();
      return inputR;
    }
  }



