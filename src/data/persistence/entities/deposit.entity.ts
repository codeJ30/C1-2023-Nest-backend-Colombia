import { AccountModel, DepositModel } from 'src/data';
import { v4 as uuid } from 'uuid';


export class DepositEntity implements DepositModel {
  id = uuid();
  account: AccountModel;
  amount: number;
  dateTime: number | Date;
  deleteAt: number | Date;
}
