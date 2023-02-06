import { Module } from '@nestjs/common';
import { AccountService, CustomerService } from './business/services';
import { AccountTypeRepository, CustomerRepository } from './data';
import { AccountController } from './presentation/controllers/account/account.controller';
import { UserController } from './presentation/controllers/user/user.controller';
import { AccountRepository } from './data/persistence/repositories/account.repository';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { DepositService } from './business/services/deposit/deposit.service';
import { DepositRepository } from './data/persistence/repositories/deposit.repository';

@Module({
  imports: [],
  controllers: [UserController, AccountController, DepositController],
  providers: [
    DepositService,
    CustomerService,
    CustomerRepository,
    AccountService,
    AccountRepository,
    AccountTypeRepository,
    DepositRepository
  ],
})
export class AppModule {}
