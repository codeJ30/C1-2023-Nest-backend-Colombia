import { CustomerEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/base-repository.interface';


export interface CustomerInterface
  extends BaseRepositoryInterface<CustomerEntity>{}
  
