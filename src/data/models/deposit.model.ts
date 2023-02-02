import { AccountModel } from './account.model';
export interface DepositModel {
  id: string;
  account: AccountModel;
  amount: number;
  dateTime: Date | number;
  deleteAt: Date | number;
}