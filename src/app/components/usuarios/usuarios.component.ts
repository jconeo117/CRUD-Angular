import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios:any
  showModal: boolean = false;
  elementId!: string;
  usuarioForm:FormGroup
  form: FormGroup;
  isLogged: boolean;

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.usuarios = [],
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.usuarioForm = this.form;
    this.isLogged = localStorage.getItem('token') ? true : false
  }

  ngOnInit() {
    this.http.get('https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios').subscribe(
      (response:any) => {
        this.usuarios = response.usuarios; // asigna el resultado a la variable elementos
        console.log(this.usuarios)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(elementId: string) {
    this.showModal = true;
    this.elementId = elementId
    console.log(elementId)
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit(form: FormGroup, id:string) {
    if (form.invalid) {
      return;
    }

    const datos = {
      nombre: form.controls['nombre'].value,
      correo: form.value.correo,
      password: form.value.password,
      rol: 'ADMIN_ROLE'
    }


    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)
      this.http.put(`https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios/${id}`, datos, { headers }).subscribe(
        (response) => {
          console.log(response);
          window.location.reload()
        },
        (error) => {
          console.error(error);
        }
      );

  }

  deleteUsuario(id: number) {

    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)

    this.http.delete(`https://prueba-tecnica-idecide.azurewebsites.net/api/usuarios/${id}`, { headers }).subscribe(
      (response) => {
        console.log(response);
        window.location.reload()
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
