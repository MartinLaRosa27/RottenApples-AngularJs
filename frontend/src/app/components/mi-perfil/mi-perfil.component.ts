import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent implements OnInit {
  // ------------------------------------------------------------------------------------------ //
  public siguiendo: any = null;
  public seguidores: any = null;
  public usuario: any = null;
  public miFormulario: FormGroup;
  public usuariosEncontrados: any = null;

  // ------------------------------------------------------------------------------------------ //
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.miFormulario = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // ------------------------------------------------------------------------------------------ //
  private resetFormulario = () => {
    this.miFormulario.setValue({
      username: '',
    });
    this.miFormulario.markAsUntouched();
  };

  // ------------------------------------------------------------------------------------------ //
  private getUsuario = async () => {
    this.http.get(environment.baseUrl + 'privado').subscribe({
      next: (res) => {
        this.usuario = res;
        this.getSiguiendoConParametros();
        this.getSeguidoresConParametros();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  };

  // ------------------------------------------------------------------------------------------ //
  private getSiguiendoConParametros = async () => {
    await axios
      .get(environment.baseUrl + 'siguiendo/' + this.usuario[0])
      .then((res) => {
        this.siguiendo = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  private getSeguidoresConParametros = async () => {
    await axios
      .get(environment.baseUrl + 'seguidores/' + this.usuario[0])
      .then((res) => {
        this.seguidores = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  public getBuscarUsuarioConParametros = async () => {
    await axios
      .get(
        environment.baseUrl +
          'buscarusuario/' +
          this.miFormulario.value.username +
          '/' +
          this.usuario[0]
      )
      .then((res) => {
        this.usuariosEncontrados = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    this.resetFormulario();
  };

  // ------------------------------------------------------------------------------------------ //
  public postSeguimiento = async (usuarioId: any) => {
    await axios
      .post(environment.baseUrl + 'seguimiento', {
        usuarioId: usuarioId,
        seguidorId: this.usuario[0],
      })
      .then((res: any) => {
        this.getSiguiendoConParametros();
        this.usuariosEncontrados = null;
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  public deleteSeguimiento = async (id: any) => {
    await axios
      .delete(environment.baseUrl + 'seguimiento/' + id)
      .then((res: any) => {
        this.getSiguiendoConParametros();
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  public patchSeguimientoBloquear = async (id: any) => {
    await axios
      .patch(environment.baseUrl + 'seguimientobloquear/' + id)
      .then((res: any) => {
        this.getSeguidoresConParametros();
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  public patchSeguimientoDesbloquear = async (id: any) => {
    await axios
      .patch(environment.baseUrl + 'seguimientodesbloquear/' + id)
      .then((res: any) => {
        this.getSeguidoresConParametros();
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // ------------------------------------------------------------------------------------------ //
  ngOnInit(): void {
    this.getUsuario();
  }
}
