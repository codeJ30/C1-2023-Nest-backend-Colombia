import { AccountModel, TransferModel } from 'src/data';
import { v4 as uuid } from 'uuid';
export class TransferEntity implements TransferModel {
  id = uuid();
  outcome: AccountModel;
  income: AccountModel;
  amount = 0;
  reason: string;
  date_time: number | Date;
  deleteAt?: number | Date;
}
