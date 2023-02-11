export interface PaginationModel {
  dimension: number;
  page: number;
  size?: number;
  numberPages?: number;
  actualPage?: number | undefined;
}
