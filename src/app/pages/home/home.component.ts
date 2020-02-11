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

  public defaultCountry: string = "all";

  public movies: Movie[] = [];

  public toggleCountry(): void {
    this.defaultCountry = 
      (this.defaultCountry == 'US') ? this.defaultCountry = 'it'
                                    : this.defaultCountry = 'US'
    this.movies.forEach((movie: any) => {
     movie.shown = movie.country == this.defaultCountry ? true : false;
    })
  };

  public countries: Set<string> = new Set();

  public constructor(private movieService: MovieService) {
    this.movieService.all().pipe(take(1)) // Take the only one response of the observable
    .subscribe((response: any[]) => {
      console.log(`Response : ${JSON.stringify(response)}`);
      this.movies = response.map((movie: Movie) => {return new Movie().deserialize(movie)});
      console.log(`Response : ${JSON.stringify(this.movies)}`);
    });

    this.movieService.allMovies();
      this.movies.forEach((movie: any) => {
          this.countries.add(movie.country);
        });

  }
}
