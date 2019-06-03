import { Versicles } from './versicles.model';

export class Scriptures{
    public quote: string = null;
    public verse: Versicles[] = null;
    public key?: string = null;

    constructor(defaults = {quote: null, verse: null}){
        Object.assign(this, defaults)
    }
}