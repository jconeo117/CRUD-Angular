import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias: any;
  showModal = false;
  postMode = true;
  isLogged: boolean;
  elementId: string;
  usuario = JSON.parse(localStorage.getItem('usuario')!!)
  form: FormGroup;
  categorieForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.categorias = []
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
    this.categorieForm = this.form;
    this.elementId = '';
    this.isLogged = localStorage.getItem('token') ? true : false

  }

  ngOnInit() {
    this.http.get('https://prueba-tecnica-idecide.azurewebsites.net/api/categorias').subscribe(
      (response: any) => {
        this.categorias = response.categorias; // asigna el resultado a la variable elementos
        console.log(this.categorias)
      },
      (error) => {
        console.error(error);
      }
    );
  }


  openModal(mode: boolean, elementId:string) {
    this.showModal = true;
    this.postMode = mode;
    this.elementId = elementId
    console.log(elementId)
  }

  closeModal() {
    this.showModal = false;
    this.postMode = true
  }

  onSubmit(form: FormGroup, id:string) {
    if (form.invalid) {
      return;
    }

    const datos = {
      nombre: form.controls['nombre'].value,
      usuario: {
        _id: this.usuario.uid,
        nombre: this.usuario.nombre
      }
    }


    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)

    if(this.postMode){
      this.http.post('https://prueba-tecnica-idecide.azurewebsites.net/api/categorias', datos, { headers }).subscribe(
        (response) => {
          console.log(response);
          window.location.reload()
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.http.put(`https://prueba-tecnica-idecide.azurewebsites.net/api/categorias/${id}`, datos, { headers }).subscribe(
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

  deleteCategorie(id: number) {

    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)
    console.log(headers)

    this.http.delete(`https://prueba-tecnica-idecide.azurewebsites.net/api/categorias/${id}`, { headers }).subscribe(
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
