import { Module } from '@nestjs/common';
import { CustomerService } from './business/services';
import { CustomerRepository } from './data';
import { UserController } from './presentation/controllers/user/user.controller';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [CustomerService, CustomerRepository],
})
export class AppModule {}
