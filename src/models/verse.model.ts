import { Song } from './song.model';

export class Verse{
    public id: string = null;
    public lirycs: string = null;
    public background?: string = null;
    public isChorus: boolean = null;
    public song?: Song = null;

    constructor(defaults = {id: null, lirycs: null, isChorus: null} ){
        Object.assign(this, defaults)
    }
}