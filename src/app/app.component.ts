import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'movies';

  public defaultCountry: string = "US";

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'US'
    },
    {
      title: 'Avengers',
      year: 2016,
      country: 'US'
    },
    {
      title: 'Il était une fois dans l\'ouest',
      year: 1975,
      country: "it"
    }
  ];

  public toggleCountry(): void {
    if (this.defaultCountry == 'US') {
      this.defaultCountry = 'it';
    } else {
      this.defaultCountry = 'US';
    }
  }
}
