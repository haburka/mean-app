export class UcReply {
    textCoverage: number;
    classification: Array<{
        className: string,
        p: number,
        keyword?: string,
    }>;
}
