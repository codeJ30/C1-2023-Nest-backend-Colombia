import { PaginationModel } from 'src/data/models/pagination.model';

export class PaginationEntity implements PaginationModel {
  dimension: number;
  page: number;
  numberPages: number ;
  actualPage: number;
  size: number;
}
