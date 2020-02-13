import { Injectable, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>(Array.from(this._years).sort());

  constructor(private httpClient: HttpClient) { }

  public get years(): Observable<Array<number>> {
    return of(Array.from(this._years).sort());
    }

  public async allMovies() {
    const apiRoute: string = `${environment.apiRoot}movie`;
    let movies = null;
    try {
      movies = await fetch(apiRoute);
    } catch(error) {
       // If something went wrong
    }
    console.log(`Movies : ${JSON.stringify(movies)}`);
  }

  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<any[]>(
      apiRoute)
      .pipe(
        take(1),
        map((response) => {
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
            return response.map((item) => {
              this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
        });
      })
      )
  }
}



