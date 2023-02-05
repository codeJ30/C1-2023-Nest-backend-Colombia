import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AccountDTO } from 'src/business/dtos/account.dto';
import { AccountService } from 'src/business/services';
import { AccountEntity, AccountTypeEntity } from 'src/data';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Crear un usuario
  @Post('new')
  createAccount(@Body() account: AccountDTO): AccountEntity {
    return this.accountService.createAccount(account);
  }

  // Obtener el balance de una cuenta
  @Get('balance/:accountId')
  getAccountBalance(@Param('accountId') accountId: string): number {
    return this.accountService.getBalance(accountId);
  }

  // Agregar balance a la cuenta
  @Put('add/: accountId')
  addAccountBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountService.addAccountBalance(accountId, amount);
  }

  // Remover balance de una cuenta
  @Put('remove/:accountId')
  removeAccountBalance(
    @Param('accounId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountService.removeAccountBalance(accountId, amount);
  }

  // Verificar balance de una cuenta
  @Get('verify/:accountId')
  verifyAccountBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): boolean {
    return this.accountService.verifyAccountBalance(accountId, amount);
  }

  // Obtener estado de la cuenta
  @Get('state/:accountId')
  getAccountStatus(
    @Param('accountId', ParseUUIDPipe) accountId: string,
  ): boolean {
    return this.accountService.getAccountStatus(accountId);
  }

  // Cambiar el estado de una cuenta

  @Put('state/:accountId')
  changeAccountState(
    @Param('AccountId', ParseUUIDPipe) accountId: string,
    @Param('state') state: boolean,
  ): void {
    this.accountService.changeAccountState(accountId, state);
  }

  //Obtener el tipo de cuenta
  @Get('type/:accountId')
  getTypeAccount(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountService.getTypeAccount(accountId);
  }

  //Cambiar el tipo de cuenta a una cuenta
  @Put('type/:accountId')
  changeTypeAccount(
    @Param('accountId') accountId: string,
    @Param('accountTypeId') accountTypeId: string,
  ): AccountTypeEntity {
    return this.accountService.changeTypeAccount(accountId, accountTypeId);
  }

  //Borrar una cuenta
  @Delete('delete/: accountId')
  deleteAccount(@Param('accountId') accountId: string): void {
    this.accountService.deleteAccount(accountId);
  }
}
