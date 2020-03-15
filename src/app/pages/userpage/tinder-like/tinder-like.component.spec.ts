import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderLikeComponent } from './tinder-like.component';

describe('TinderLikeComponent', () => {
  let component: TinderLikeComponent;
  let fixture: ComponentFixture<TinderLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinderLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
