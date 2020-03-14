import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { UserInterface } from './user-interface';

export class Movie {
    public idMovie: number;
    public static title: string;
    public year: number;
    public animationState: string = 'initial';
    public numberUsersLiking: number;
    public usersLiking: Array<UserInterface>;


    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }

}
