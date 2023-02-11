import { AccountModel } from './account.model';

export interface TransferModel {
  id: string;
  outcome: AccountModel;
  income: AccountModel;
  amount: number;
  reason: string;
  date_time: Date | number;
  deleteAt?: Date | number;
}
