import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  opciones: any;
  form: FormGroup;
  productoForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) {
    this.opciones = [],

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.productoForm = this.form;
  }
  
  ngOnInit() {
    this.http.get('https://prueba-tecnica-idecide.azurewebsites.net/api/categorias').subscribe(
      (response: any) => {
        this.opciones = response.categorias; // asigna el resultado a la variable elementos
        console.log(this.opciones)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    const datos = {
      nombre: form.controls['nombre'].value,
      categoria: form.controls['categoria'].value[1],
      precio: form.value.precio
    }
    console.log(datos)

    const headers = new HttpHeaders().append('Content-Type', 'application/json').append('x-token', localStorage.getItem('token')!!)

    this.http.post('https://prueba-tecnica-idecide.azurewebsites.net/api/productos', datos, {headers}).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']);  // Redirige a la página '/main'
      },
      (error) => {
        console.error(error);
      }
    );

  }
}