import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/core/services/movie.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-liked-movies',
  templateUrl: './search-liked-movies.component.html',
  styleUrls: ['./search-liked-movies.component.scss']
})
export class SearchLikedMoviesComponent implements OnInit {

  @Output() movies : EventEmitter<Observable<Movie[]>> = new EventEmitter<Observable<Movie[]>>();

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
    this.search.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map(() => {
          console.log('Value of search : ' + this.search)
          this.onClick();
        })
      ).subscribe();
  }

  private onClick() : void {
    if (this.search.value.trim().length > 0) {
        this.movies.emit(
          this.movieService.byTitle(this.search.value.trim())
        );
    }
  }

  public reload(): void {
    if (this.search.value.trim().length == 0) {
        this.movies.emit(
          this.movieService.all());
    }
  }
}
