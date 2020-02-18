import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public movieForm: FormGroup;
  public movie: any;

  constructor(
    private movieService: MovieService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar) { }

  public get synopsis(): AbstractControl {
    return this.movieForm.controls.synopsis;
  }

  public get title(): AbstractControl {
    return this.movieForm.controls.title;
  }

  public get year(): AbstractControl {
    return this.movieForm.controls.year;
  }

  ngOnInit(): void {
    // Build the form...
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      synopsis: ['', Validators.required]
    });

    this.route.paramMap.subscribe((paramMap: any) => {
      console.log(`Params : ${paramMap.params.id}`);
      this.movieService.byId(paramMap.params.id).subscribe((movie: any) => {
        this.movie = movie;
        this.title.setValue(this.movie.title);
        this.synopsis.setValue(this.movie.synopsis);
        this.year.setValue(this.movie.year);
      }) 
    });
  }

  public doUpdate(): void {
    this.movie.synopsis = this.synopsis.value;

    console.log(`Will update : ${JSON.stringify(this.movie)}`);
    this.movieService.update(this.movie)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        console.log(`Update was done with : ${response.status}`);
      })
      this.snackBar.open('Movie updated','',{duration: 2000, verticalPosition: 'top'});
  }

}
