import { Injectable, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

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
    const apiRoute: string = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

  public byTitle(search: string): Observable<Movie[]> {
    const apiRoute: string = `${environment.apiRoot}movie/byTitle?t=${search}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }
}



