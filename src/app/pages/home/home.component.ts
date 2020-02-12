import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title: string = 'movies';
  public year: number = 0;
  public movies: Movie[] = [];
  public years: number[] = [];


public constructor(private movieService: MovieService) {

  const years: Set<number> = new Set<number>();

    this.movieService.all()
    .pipe(
      take(1) // Take the only one response of the observable
      ) 
    .subscribe((response: any[]) => {
      this.movies = response.map((movie: Movie) => {
        years.add(movie.year);
        return new Movie().deserialize(movie)
      });
      this.years = Array.from(years).sort();
    });
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }
}
