import Operation, { Assessment, OperationType } from "@/models/Operation";
import dateToString from "@/utils/dateToString";
import lang from "@/lang";

export default class MappedOperation {
  id?: string | null;              // ID Операции
  type: string;                    // Тип операции
  date: string;                    // Дата проведения операции
  crop: string;                    // Тип note: отсутствует в исходных данных
  assessment?: string | null;      // Оценка качества проведенной операции

  constructor(operation: Operation) {
    this.id = operation.id;
    this.date = dateToString(operation.date);
    this.crop = 'Пшеница озимая';
    this.type = lang(OperationType[operation.type]);
    this.assessment = operation.assessment ? lang(Assessment[operation.assessment]) : 'Нет оценки';
  }
}
