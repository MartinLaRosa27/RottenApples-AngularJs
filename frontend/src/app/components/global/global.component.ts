import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  // ------------------------------------------------------------------------------------------ //
  public reviews: any = null;
  public usuario: any = null;

  // ------------------------------------------------------------------------------------------ //
  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------------------------------------ //
  private getUsuario = async () => {
    this.http.get(environment.baseUrl + 'privado').subscribe({
      next: (res) => {
        this.usuario = res;
        this.getGlobalConParametros(this.usuario[0]);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  };

  // ------------------------------------------------------------------------------------------ //
  private getGlobalConParametros = async (id: any) => {
    await axios
      .get(environment.baseUrl + 'global/' + id)
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
