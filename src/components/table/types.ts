export interface Column {
  name: string;
  prop: string;
  resolver?: string;
  sortable?: boolean;
  width?: number | string;
}
