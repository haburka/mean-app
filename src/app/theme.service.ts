import {Injectable} from '@angular/core';

@Injectable()
export class ThemeService {

    public pink = {
        50: '#fce4ec',
        100: '#f8bbd0',
        200: '#f48fb1',
        300: '#f06292',
        400: '#ec407a',
        500: '#e91e63',
        600: '#d81b60',
        700: '#c2185b',
        800: '#ad1457',
        900: '#880e4f',
    };
    public blueGrey = {
        50: '#eceff1',
        100: '#cfd8dc',
        200: '#b0bec5',
        300: '#90a4ae',
        400: '#78909c',
        500: '#607d8b',
        600: '#546e7a',
        700: '#455a64',
        800: '#37474f',
        900: '#263238',
    };

    constructor() {
    }

    mdColor(type: string, hue?: number): string {
        if (type === "primary") {
            return this.getColor('pink',hue);
        }
        if (type === "accent") {
            return this.getColor('blueGrey',hue);
        }
    }

    getColor(palette: string, hue?){
        if(!hue){
            return this[palette]['500'];
        }
        if(hue < 50 || hue >= 1000){
            console.log("invalid hue "+hue);
            return this[palette]['500'];
        }
        if(hue >= 50 && hue < 100){
            return this[palette]['50'];
        }
        return this[palette][Math.floor(hue / 100) * 100];
    }

}
