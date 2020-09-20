import MappedOperation from "@/models/MappedOperation";

export interface OperationsState {
  operations: Array<MappedOperation>;
  sortKey: string;
}
