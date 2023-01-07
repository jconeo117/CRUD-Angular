import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})

export class ListaProductosComponent implements OnInit {

  listProductos: any;
  showModal: boolean = false;
  elementId!: string;
  categorias: any;
  productoForm: FormGroup;
  form: any;
  isLogged: boolean;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.listProductos = [];
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.productoForm = this.form;
    this.isLogged = localStorage.getItem('token') ? true : false
  }

  ngOnInit() {
    this.http.get('https://prueba-tecnica-idecide.azurewebsites.net/api/productos').subscribe(
      (response: any) => {
        this.listProductos = response.productos; // asigna el resultado a la variable elementos
        console.log(this.listProductos)
      },
      (error) => {
        console.error(error);
      }
    );

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

  openModal(elementId: string) {
    this.showModal = true;
    this.elementId = elementId
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
      categoria: form.controls['categoria'].value
    }


    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)
      this.http.put(`https://prueba-tecnica-idecide.azurewebsites.net/api/productos/${id}`, datos, { headers }).subscribe(
        (response) => {
          console.log(response);
          window.location.reload()
        },
        (error) => {
          console.error(error);
        }
      );

  }

  deleteProduct(id: number) {

    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)

    this.http.delete(`https://prueba-tecnica-idecide.azurewebsites.net/api/productos/${id}`, { headers }).subscribe(
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