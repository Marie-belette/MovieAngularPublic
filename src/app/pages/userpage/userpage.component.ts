import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  
  public user: UserInterface;
  public movies: Observable<Movie[]>;
  public moviesLiked: Observable<Movie[]>;
  public movie = Movie

  constructor(
    public userService : UserService,
    private movieService: MovieService,
  ) { }

  ngOnInit() {
   this.userService.userSubject$.subscribe((user: UserInterface) => {
     this.user = user;
    this.movieService.byUserLiking()
   });

   this.movies = this.movieService.all();

   this.moviesLiked = this.movieService.moviesLiked(this.user);

   }
}

