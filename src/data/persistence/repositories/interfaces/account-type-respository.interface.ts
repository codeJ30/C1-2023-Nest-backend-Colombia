import { BaseRepositoryInterface } from './base/base-repository.interface';
import { AccountTypeEntity } from '../../entities/account-type.entity';

export interface AccountTypeRepositoryInterface
  extends BaseRepositoryInterface<AccountTypeEntity> {}
