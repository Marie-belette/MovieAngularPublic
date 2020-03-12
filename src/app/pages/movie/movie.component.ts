import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;

  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {movie: any}) => {
      this.movie = data.movie;
      });
  }

  public deleteMovie(): void {
    console.log(`Will delete : ${JSON.stringify(this.movie)}`);
    this.movieService.delete(this.movie)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        console.log(`Update was done with : ${response.status}`);
      })
      this.snackBar.open('Movie deleted','',{duration: 2000, verticalPosition: 'top'});
  }

}
