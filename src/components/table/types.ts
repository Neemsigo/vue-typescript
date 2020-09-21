export class Column {
  name: string;
  prop: string;
  sortable?: boolean;
  sortFnc?: Function | null;
  width?: number;

  constructor(args: Column) {
    this.name = args.name;
    this.prop = args.prop;
    this.sortable = args.sortable !== undefined ? args.sortable : true;
    this.sortFnc = args.sortFnc || null;
    this.width = args.width;
  }
}
export class Filter {
  label: string;
  fnc: Function;

  constructor(args: Filter) {
    this.label = args.label;
    this.fnc = args.fnc;
  }
}
