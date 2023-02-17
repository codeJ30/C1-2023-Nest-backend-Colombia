import { PaginationModel } from 'src/data/models/pagination.model';

export class PaginationEntity implements PaginationModel {
  dimension: number;
  page: number;
  size: number;
}
