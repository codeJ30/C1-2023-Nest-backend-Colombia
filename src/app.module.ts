import { Module } from '@nestjs/common';
import { AccountService, CustomerService } from './business/services';
import { AccountTypeRepository, CustomerRepository } from './data';
import { AccountController } from './presentation/controllers/account/account.controller';
import { UserController } from './presentation/controllers/user/user.controller';
import { AccountRepository } from './data/persistence/repositories/account.repository';


@Module({
  imports: [],
  controllers: [UserController, AccountController],
  providers: [CustomerService, CustomerRepository, AccountService, AccountRepository, AccountTypeRepository],
})
export class AppModule {}
