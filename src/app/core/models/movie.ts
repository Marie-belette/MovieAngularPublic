export class Movie {
    public idMovie: number;
    public title: string;
    public year: number;
    public timesLiked: number = 0;

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }

}
