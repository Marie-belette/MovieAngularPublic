import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserInterface } from 'src/app/core/models/user-interface';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-tinder-like',
  templateUrl: './tinder-like.component.html',
  styleUrls: ['./tinder-like.component.scss']
})
export class TinderLikeComponent implements OnInit {
  public user: UserInterface;
  public userChosen: UserInterface;

  constructor(
    public userService : UserService,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

}
