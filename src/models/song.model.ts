import { Verse } from './verse.model';

export class Song{
    public id: string;
    public name: string;
    public order: number;
    public defaultBackground: {
        url: string
    };
    public verse: Verse[];
    public key: string;

    constructor(defaults = {id: null, name: null, verse: [], defaultBackground: null, order: null} ){
        Object.assign(this, defaults);
    }
}