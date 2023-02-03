import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put , } from '@nestjs/common';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';
import { CustomerEntity } from 'src/data/persistence/entities/customer.entity';
import { CustomerService } from 'src/business/services';

@Controller('user')
export class UserController {

    constructor(private readonly customerService: CustomerService){}

    @Get()
    findAllUser(): CustomerEntity[] {
        return this.customerService.findAll();
    }

    @Post()
    registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
      return this.customerService.newCustomer(customer);
    }
     
    @Get(':id')
    userInformation(@Param('id' , ParseUUIDPipe) customerId: string): CustomerEntity{
        return this.customerService.getCustomerData(customerId);
    }


    @Post(':id')
    unsubcribeUser(@Param('id' , ParseUUIDPipe) customerId: string): boolean {
        return this.customerService.unsubscribe(customerId);
    }

    @Patch(':id')
    userUpdate(
        @Param('id' , ParseUUIDPipe)id: string,
        @Body()customer: NewCustomerDTO,
    ): CustomerEntity{
    return this.customerService.updatedCustomerData(id, customer);
    }
}







