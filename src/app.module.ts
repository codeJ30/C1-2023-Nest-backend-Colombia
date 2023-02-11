import { Module } from '@nestjs/common';
import { AccountService, CustomerService } from './business/services';
import { AccountTypeRepository, CustomerRepository } from './data';
import { AccountController } from './presentation/controllers/account/account.controller';
import { UserController } from './presentation/controllers/user/user.controller';
import { AccountRepository } from './data/persistence/repositories/account.repository';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { DepositService } from './business/services/deposit/deposit.service';
import { DepositRepository } from './data/persistence/repositories/deposit.repository';
import { SecurityController } from './presentation/controllers/security/security.controller';
import { SecurityService } from './business/services/security/security.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { DocumentTypeRepository } from './data/persistence/repositories/document-type-repository';
import { TransferRepository } from './data/persistence/repositories/transfer.repository';
import { TransferService } from './business/services/transfer/transfer.service';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'My key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    UserController,
    AccountController,
    DepositController,
    SecurityController,
    TransferController,
  ],
  providers: [
    DepositService,
    CustomerService,
    CustomerRepository,
    AccountService,
    AccountRepository,
    AccountTypeRepository,
    DepositRepository,
    SecurityService,
    DocumentTypeRepository,
    TransferRepository,
    TransferService,
  ],
})
export class AppModule {}
