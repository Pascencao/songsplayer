export class Versicles{
    public id: string = null;
    public text: string = null;
    public book: string = null;
    public chapter: number = null;
    public verse: number = null;
    public key?: string = null;
    public checked?: boolean = null;

    constructor(defaults = {id: null, text: null, book: null, chapter: null, verse: null} ){
        Object.assign(this, defaults)
    }
}