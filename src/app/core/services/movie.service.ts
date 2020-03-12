import { Injectable, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { UserInterface } from '../models/user-interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>(Array.from(this._years).sort());
  public moviesCount: number = 0;
  public user: UserInterface;
  public numberLiked: any;

  constructor(private httpClient: HttpClient) { }

  public get years(): Observable<Array<number>> {
    return of(Array.from(this._years).sort());
    }

  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<any[]>(
      apiRoute)
      .pipe(
        take(1),
        map((response) => {
          this.moviesCount = response.length;
          return response.map((item) => {
            this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          });
        })
      );
  }

  public byTitle(search: string): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie/byTitle?t=${search}`;
    return this.httpClient.get<any[]>(
      apiRoute)
      .pipe(
        take(1),
        map((response) => {
          this.moviesCount = response.length;
            return response.map((item) => {
              this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
        });
      })
      )
  }

  public byId(id: number): Observable<any> {
    const apiRoot: string = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(apiRoot, {observe: 'response'})
    .pipe(
      take(1),
      map((response) => {
        return response.body;
        }),
        catchError((error: any) => {
          console.log(`Something went wrong : ${JSON.stringify(error)}`);
          return throwError(error.status)
        })
    );
  }

  public update(movie: any): Observable<HttpResponse<any>> {
    const apiRoot: string = `${environment.apiRoot}movie/modify`;

    return this.httpClient.post(apiRoot, movie,{observe: 'response'})
    .pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    )
  }

  // public like(movie: Movie): Observable<HttpResponse<any>> {
  //   const apiRoot: string = `${environment.apiRoot}movie/setLike?id=${movie.idMovie}&like=${movie.timesLiked}`;
  //   return this.httpClient.put(apiRoot, movie, {observe: 'response'})
  //   .pipe(
  //     take(1),
  //     map((response: HttpResponse<any>) => {
  //       return response;
  //     })
  //   )
  // }
  

  public like(movie: Movie, user: UserInterface): Observable<HttpResponse<any>> {
    const apiRoot: string = `${environment.apiRoot}likedMovie/addMovieToLikedMovies?un=${user.login}&idM=${movie.idMovie}`;
    return this.httpClient.put(apiRoot, movie, {observe: 'response'})
       .pipe(
         take(1),
         map((response: HttpResponse<any>) => {
           return response;
         })
       )
     }

  public delete(movie: Movie): Observable<any> {
    const apiRoot: string = `${environment.apiRoot}movie/${movie.idMovie}`;

    return this.httpClient.delete(apiRoot)
    .pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    )
  }
}



