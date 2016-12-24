export class Tile {
    color: string;
    text: string;
    colspan?: number;
    rowspan?: number;
    textColor?: string;

    constructor(){
        this.color = "white";
        this.text = "";
        this.colspan = 1;
        this.rowspan = 1;
        this.textColor = "black";
    }
}
