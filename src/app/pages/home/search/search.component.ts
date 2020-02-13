import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModel, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MovieService } from 'src/app/core/services/movie.service';
import { take } from 'rxjs/internal/operators/take';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  @Output() movies : EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  public searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder) {}

  public get search(): AbstractControl {
    return this.searchForm.controls.search;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [
        '', // Default value for the control "search"
        Validators.compose([
          Validators.required,
          Validators.minLength(2)])
      ]
    });
  }

  public onClick() : void {
    if (this.search.value.trim().length > 0) {
      let movies : Movie[] = [];
      this.movieService.byTitle(this.search.value.trim())
      .pipe(take(1)) 
      .subscribe((response: Movie[]) => {
        console.log(`Emit : ${JSON.stringify(response)}`)
        this.movies.emit(response);
      });
    }
  }

  public reload(): void {
    if (this.search.value.trim().length == 0) {
      let movies : Movie[] = [];
      this.movieService.all()
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
