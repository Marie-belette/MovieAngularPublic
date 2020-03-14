import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { map } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  public user: UserInterface;
  public movies: Observable<Movie[]>;
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

   

   }
  //   let movie: Movie = new Movie();
  //   this.movies = this.movies.pipe(
  //     map((movies: Movie[]): Movie[] => {
  //       let movieIndex: number = movies.findIndex(
  //         (obj: Movie, index: number) => obj.idMovie == movie.idMovie);
  //       console.log(`Replace movie at rom ${movieIndex}`);
  //       movies[movieIndex] = movie;
  //       return movies;
  //     })
  //   );
  // }

  // public receiveMovies($event): void {
  //   this.movies = $event;
  //   console.log(`Received ${JSON.stringify(this.movies)}`);
  //   };
}

