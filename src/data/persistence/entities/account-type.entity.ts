import { AccountTypeModel } from 'src/data';
import { v4 as uuid } from 'uuid';

export class AccountTypeEntity implements AccountTypeModel {
  id = uuid();
  name: string;
  state: boolean;
}