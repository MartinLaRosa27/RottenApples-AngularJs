import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  // ------------------------------------------------------------------------------------------ //
  public usuario: any = null;
  public reviews: any = null;

  // ------------------------------------------------------------------------------------------ //
  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------------------------------------ //
  private getUsuario = async () => {
    this.http.get(environment.baseUrl + 'privado').subscribe({
      next: (res) => {
        this.usuario = res;
        this.getReviewSeguidoresConParametros();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  };

  // ------------------------------------------------------------------------------------------ //
  private getReviewSeguidoresConParametros = async () => {
    await axios
      .get(environment.baseUrl + 'reviewseguidores/' + this.usuario[0])
      .then((res) => {
        this.reviews = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  ngOnInit() {
    this.getUsuario();
  }
}
