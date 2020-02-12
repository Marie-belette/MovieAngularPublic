import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MovieService } from 'src/app/core/services/movie.service';
import { take } from 'rxjs/internal/operators/take';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  public search: string;

  @Output() movies : EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  public onClick() : void {
    if (this.search.trim().length > 0) {
      let movies : Movie[] = [];
      this.movieService.byTitle(this.search.trim())
      .pipe(take(1)) 
      .subscribe((response: Movie[]) => {
        movies = response.map((movie: Movie) => {
          return new Movie().deserialize(movie);
        });
        console.log(`Emit : ${JSON.stringify(movies)}`)
        this.movies.emit(movies);
      });
    }
  }
}
