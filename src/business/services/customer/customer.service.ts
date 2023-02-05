import { Injectable } from '@nestjs/common';
import { AccountDTO } from 'src/business/dtos/account.dto';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import {
  CustomerEntity,
  CustomerRepository,
  DocumentTypeEntity,
} from 'src/data';
import { AccountService } from '../account/account.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}

  transformData(customer: NewCustomerDTO): CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    return newCustomer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  newCustomer(customer: NewCustomerDTO): CustomerEntity {
    const customerMap = this.transformData(customer);
    const accountDto = new AccountDTO();
    const newCustomer = this.customerRepository.register(customerMap);
    accountDto.CustomerEntity = newCustomer.id;
    accountDto.accountType = '18a639a4-38fd-4feb-b5f4-cb000a158d77';
    accountDto.balance = 0;
    this.accountService.createAccount(accountDto);
    return newCustomer;
  }
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerData(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomerData(id: string, customer: NewCustomerDTO): CustomerEntity {
    return this.customerRepository.update(id, this.transformData(customer));
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    let unsubscribeUser = new CustomerEntity();
    unsubscribeUser = this.customerRepository.findOneById(id);
    if (unsubscribeUser.state) {
      unsubscribeUser.state = false;
    }
    return unsubscribeUser.state;
  }
}
