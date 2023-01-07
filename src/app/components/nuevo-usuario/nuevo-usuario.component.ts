import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {
  opciones: any;
  form: FormGroup;
  newUserForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) {
    this.opciones = [],

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.newUserForm = this.form;
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const datos = {
      nombre: form.controls['nombre'].value,
      correo: form.value.correo,
      password: form.value.password,
      rol: 'ADMIN_ROLE'
    }
    console.log(datos)
    this.http.post('https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios', datos).subscribe(
      (response) => {
        console.log(response);
        window.location.reload()
      },
      (error) => {
        console.error(error);
      }
    );

    this.router.navigate(['/usuarios']);  // Redirige a la página '/main'
  }
}
