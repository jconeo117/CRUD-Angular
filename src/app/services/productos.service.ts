import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // url = 'https://prueba-tecnica-idecide.azurewebsites.net/api/productos';

  // constructor(private http: HttpClient) { }

  // getProductos(): Observable<any> {
  //   return this.http.get(this.url);
  // }

  // eliminarProducto(id: string): Observable<any> {
  //   return this.http.delete(this.url + id);
  // }

  // guardarProducto(producto: Product): Observable<any> {
  //   return this.http.post(this.url, producto);
  // }

  // obtenerProducto(id: string): Observable<any> {
  //   return this.http.get(this.url + id);
  // }
}
