import { v4 as uuid } from 'uuid';
import { AccountModel, AccountTypeModel, CustomerModel } from 'src/data';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state = true;
  deleteAt?: number | Date;
  customerId: string;
}
