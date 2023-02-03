import { Injectable } from '@nestjs/common';
import { NewCustomerDTO } from 'src/business/dtos/new-customer.dto';
import { CustomerEntity, CustomerRepository, DocumentTypeEntity } from 'src/data';

@Injectable()
export class CustomerService {
 
  constructor(private readonly customerRepository: CustomerRepository) {}

   transformData(customer: NewCustomerDTO):CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentTypeId;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    return newCustomer
    
   }

  findAll():CustomerEntity[]{
    return this.customerRepository.findAll();
  }
  newCustomer(customer: NewCustomerDTO): CustomerEntity {
    const customerMap = this.transformData(customer);
    return this.customerRepository.register(customerMap);
  }
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerData(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId)
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
    return this.customerRepository.update(id , this.transformData(customer));
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
   if(unsubscribeUser.state) {
    unsubscribeUser.state = false;
   }
    return unsubscribeUser.state;
  }
}
