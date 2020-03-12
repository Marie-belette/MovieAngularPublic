import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take, map } from 'rxjs/operators';
import { Movie } from './../../core/models/movie'
import { Observable, Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../../environments/environment';
import { transition, animate, trigger, state, style } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('heartGrowing', [
      state('initial', style({
        transform: 'scale(1)',
        color: 'midnightblue'
      })),
      state('final', style({
        transform: 'scale(2.0)',
        color: 'pink'
      })),
      transition('initial=>final', animate('900ms')),
      transition('final=>initial', animate('900ms'))
    ]),
    trigger('heartSmalling', [
      state('initial', style({
        transform: 'scale(2.0)',
        color: 'pink'
      })),
      state('final', style({
        transform: 'scale(1.0)',
        color: 'midnightblue'
      })),
      transition('initial=>final', animate('900ms')),
      transition('final=>initial', animate('900ms'))
    ]),
  ]
})

export class HomeComponent implements OnInit {

  public title: string = 'movies';
  public year: number = 0;
  public movies: Observable<Movie[]>
  public years: number[] = [];
  private yearSubscription: Subscription;
  public user: UserInterface;
  private socket$: WebSocketSubject<any>;
  public movie = Movie;
  public translationChange$: any;

  public constructor(
    public movieService: MovieService, 
    public userService: UserService, 
    public snackBar: MatSnackBar,
    private router: Router,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    this.socket$ = new WebSocketSubject<any>(environment.wssAddress);
    this.socket$.subscribe((socketMessage: any) => {

      console.log(JSON.stringify(socketMessage));
      if(socketMessage._data === 'timesLiked') {
        // Update interface for this movie
        let movie: Movie = new Movie().deserialize(socketMessage._message);
        console.log(`Update comes from wsServer : ${JSON.stringify(movie)}`);

        // Update movie in observable
        this.movies = this.movies.pipe(
          map((movies: Movie[]): Movie[] => {
            let movieIndex: number = movies.findIndex(
              (obj: Movie, index: number) => obj.idMovie == movie.idMovie);
            console.log(`Replace movie at rom ${movieIndex}`);
            movies[movieIndex] = movie;
            return movies;
          })
        );
      } else {
        console.log(socketMessage);
      }
    },
    (err) => console.error('Erreur levée : ' + JSON.stringify(err)),
    () => console.warn('Completed!')
    );
    this.socket$.next('Ping');
  
    this.movies = this.movieService.all();

    this.translationChange$ = this.translateService.onLangChange;
    this.translationChange$.subscribe((event: any) => {
      console.log('Language was changed');
      this.movies = this.movies.pipe(
        map((movies: Movie[]): Movie[] => {
          return movies;
        })
      );
    });

    this.yearSubscription = this.movieService.years$
      .subscribe((_years) => {
        this.years = _years;
      })
  
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    })
    

  }; 

  public receiveMovies($event): void {
  this.movies = $event;
  console.log(`Received ${JSON.stringify(this.movies)}`);
  };

  public snackbarToLogin(idMovie: number) {
    this.snackBar.open('You are not yet connected','',{duration: 1500, verticalPosition: 'top'})
    .afterDismissed().subscribe((a) => {
    this.router.navigate(['login'], {state: {movie: idMovie}})
    }
  )};

  public likeIt(movie: Movie): void {
    movie.animationState = 'final';
   
      // Emit a new update to ws
      if (this.user) {
         //setTimeOut(() => {}, delay), donc on indique le délai après les accolades, et dans les accolades tout ce qui doit se passer après ce délai
        setTimeout(() => {
        movie.timesLiked += 1;
          console.log(`Will like : ${JSON.stringify(this.movie)}`);
          this.movieService.like(movie, this.user)
            .pipe(
              take(1)
            ).subscribe((response: HttpResponse<any>) => {
              console.log(`Update was done with : ${response.status}`);
            })
            this.snackBar.open('Movie liked','',{duration: 2000, verticalPosition: 'top'});
    
        // Emit a new update to ws...
        const message: any = {
          message: 'timesLiked',
          data: movie,
        };
        this.socket$.next(message);
    
        // Update the observable (retains values)
        this.movies = this.movies.pipe(
          map((movies: Movie[]): Movie[] => {
            let movieIndex: number = movies.findIndex(
              (obj: Movie, index: number) => obj.idMovie == movie.idMovie);
            movies[movieIndex] = movie;
            return movies;
          })
        );
        movie.animationState = 'initial';
        setTimeout(() => movie.animationState = 'final', 900);
        }, 1000);
      } else {
        setTimeout(() => {
        this.snackBar.open('You are not yet connected','',{duration: 1500, verticalPosition: 'top'});
        movie.animationState = 'initial';
        setTimeout(() => movie.animationState = 'initial', 900);
        }, 1000);
      };
      
  }

  // ngOnDestroy() {
  // this.yearSubscription.unsubscribe();
  //  this.translationChange$.unsubscribe();
  //}
}
