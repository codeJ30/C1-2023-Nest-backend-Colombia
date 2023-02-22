// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Models

// Repositories
import {
  AccountTypeRepository,
  CustomerRepository,
  DocumentTypeRepository,
} from 'src/data/persistence/repositories';

// Services
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { AccountDTO } from '../../dtos/account.dto';
import { SignDTO } from '../../dtos/sing.dto';
import { NewCustomerDTO } from '../../dtos/new-customer.dto';

// Entities
import { CustomerEntity } from 'src/data/persistence/entities';
import { DocumentTypeEntity } from '../../../data/persistence/entities/document-type.entity';
import { AccountTypeEntity } from '../../../data/persistence/entities/account-type.entity';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: SignDTO) {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) {
      const customer = this.customerRepository.findOneByEmail(user.email);
      const payload = { email: customer.email, sub: customer.id };
      return { access_token: this.jwtService.sign(payload), id: customer.id};
    } else throw new UnauthorizedException('Datos de identificación inválidos');
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: NewCustomerDTO) {
    const newCustomer = new CustomerEntity();
    const docType = this.documentTypeRepository.findOneById(
      user.documentTypeId,
    );
    newCustomer.documentType = docType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const newAccount = new AccountDTO();
      newAccount.customerId = customer.id;
      newAccount.accountType = '18a639a4-38fd-4feb-b5f4-cb000a158d77';
      newAccount.balance= 0;
      const account = this.accountService.createAccount(newAccount);

      if (account) {
        const payload = { email: customer.email, index: customer.id };
        return { access_token: this.jwtService.sign(payload), id: customer.id};
      } else 
          throw new UnauthorizedException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWT: string): boolean {
    if (this.jwtService.verify(JWT)) return true;
    return false;
  }
}
