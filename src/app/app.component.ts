import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';

  public defaultCountry: string = "all";

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'United States',
      shown: true
    },
    {
      title: 'Avengers',
      year: 2016,
      country: 'United States',
      shown: true
    },
    {
      title: 'Il était une fois dans l\'ouest',
      year: 1975,
      country: "Italia",
      shown: true
    },
    {
    title: 'Parasite',
    year: 2019,
    country: "Korea",
    shown: true
    }
  ];

  public toggleCountry(): void {
    this.defaultCountry = 
      (this.defaultCountry == 'US') ? this.defaultCountry = 'it'
                                    : this.defaultCountry = 'US'
    this.movies.forEach((movie: any) => {
     movie.shown = movie.country == this.defaultCountry ? true : false;
    })
  };

  public countries: Set<string> = new Set();

  public constructor() {
    this.movies.forEach(movie => {
        this.countries.add(movie.country);
      });
  }
}
