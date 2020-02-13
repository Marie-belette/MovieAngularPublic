import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';

import { take } from 'rxjs/operators';
import { Movie } from './../../core/models/movie'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title: string = 'movies';
  public year: number = 0;
  public movies: Observable<Movie[]>
  public years: number[] = [];
  private yearSubscription: Subscription;

public constructor(private movieService: MovieService) { }

ngOnInit() {
  this.movies = this.movieService.all();

  this.yearSubscription = this.movieService.years$
    .subscribe((_years) => {
      console.log('Years was updated : ' + JSON.stringify(_years));
      this.years = _years;
    })
  
}

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }
}
