import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLikedMoviesComponent } from './search-liked-movies.component';

describe('SearchLikedMoviesComponent', () => {
  let component: SearchLikedMoviesComponent;
  let fixture: ComponentFixture<SearchLikedMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLikedMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLikedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
