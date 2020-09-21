import Operation, { Assessment, OperationType } from "@/models/Operation";
import dateToString from "@/utils/dateToString";
import lang from "@/lang";

export enum ColorType {
  green, yellow, red,
}

export default class MappedOperation extends Operation{
  stringType: string;              // Тип операции
  stringDate: string;              // Дата проведения операции в виде строки
  crop: string;                    // Тип note: отсутствует в исходных данных
  stringAssessment?: string;       // Оценка качества проведенной операции

  constructor(operation: Operation) {
    super(operation);
    this.stringDate = dateToString(operation.date);
    this.crop = 'Пшеница озимая';
    this.stringType = lang(OperationType[operation.type]);
    this.stringAssessment = typeof operation.assessment === 'number'
      ? lang(Assessment[operation.assessment])
      : 'Нет оценки';
  }
}
