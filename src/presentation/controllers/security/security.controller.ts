// Libraries
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SecurityService } from '../../../business/services/security/security.service';
import { NewCustomerDTO } from '../../../business/dtos/new-customer.dto';
import { SignDTO } from '../../../business/dtos/sing.dto';


@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}


  @Post('/singUp')
  singUp(@Body() customer: NewCustomerDTO) {
    return this.securityService.signUp(customer);
  }

  @Get('logout')
  logout(@Body()body: { JWT: string }): boolean {
    return this.securityService.signOut(body.JWT);
  }

  @Post('singIn')
  singIn(@Body() customer: SignDTO) {
    return this.securityService.signIn(customer);
  }
}
