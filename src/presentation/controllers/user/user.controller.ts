import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';
import { CustomerEntity } from 'src/data/persistence/entities/customer.entity';
import { CustomerService } from 'src/business/services';
import { Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  // Obtener usuarios
  @Get()
  findAllUser(): CustomerEntity[] {
    return this.customerService.findAll();
   
  }

  // Registrar o crear una cuenta
  @Post()
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }
  // Actualizar una cuenta
  @Patch(':id')
  userUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() customer: NewCustomerDTO,
  ): CustomerEntity {
    return this.customerService.updatedCustomerData(id, customer);
  }

  // Obtener informacion de una cuenta
  @Get(':id')
  userInformation(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): CustomerEntity {
    return this.customerService.getCustomerData(customerId);
  }

  // Desactivar una cuenta
  @Put(':id')
  unsubcribeUser(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
