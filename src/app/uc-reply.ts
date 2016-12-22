export class UcReply {
  data: Array<{
    textCoverage: number,
    classification: Array<{
      className: string,
      p: number;
    }>
  }>;
  constructor(){
    this.data = [];
  }
}
