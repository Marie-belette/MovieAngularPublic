import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public user: UserInterface;

public constructor(
  private movieService: MovieService, 
  public userService: UserService, 
  public snackBar: MatSnackBar,
  private router: Router) { }

ngOnInit() {
  this.movies = this.movieService.all();

  this.yearSubscription = this.movieService.years$
    .subscribe((_years) => {
      console.log('Years was updated : ' + JSON.stringify(_years));
      this.years = _years;
    })
  
  this.userService.userSubject$.subscribe((user: UserInterface) => {
    this.user = user;
  })

} 

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  };

  public snackbarToLogin() {
    this.snackBar.open('You are not yet connected','',{duration: 1500, verticalPosition: 'top'})
    .afterDismissed().subscribe((a) => {
      this.router.navigate(['login'])}
    )}

}
