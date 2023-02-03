import { Controller } from '@nestjs/common';
import { TransferService } from 'src/business/services';


@Controller('transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService){}

    //Crear una transferencia entre cuentas del banco
    
}
